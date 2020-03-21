#!/usr/bin/env python

##########################################################################
# Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Amazon Software License (the "License"). You may not use this file
# except in compliance with the License. A copy of the License is located at
#
# http://aws.amazon.com/asl/
#
# or in the "license" file accompanying this file. This file is distributed on an "AS IS"
# BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
# License for the specific language governing permissions and limitations under the License.
##########################################################################
"""Lex Model Building Service helper script

Used to import/export/delete Lex bots and associated resources
(i.e. intents, slot types).

Can be run as a shell script or used as a Lambda Function for CloudFormation
Custom Resources.
"""

import logging
import json

from lexutils import LexBotImporter, LexBotExporter, LexBotDeleter

DEFAULT_LOGGING_LEVEL = logging.INFO
logging.basicConfig(
    format='[%(levelname)s] %(message)s',
    level=DEFAULT_LOGGING_LEVEL
)
logger = logging.getLogger(__name__)
logger.setLevel(DEFAULT_LOGGING_LEVEL)

BOT_DEFINITION_FILENAME = 'bot-definition.json'
BOT_EXPORT_FILENAME = 'bot-definition-export.json'

def read_bot_definition_file(file_name=BOT_DEFINITION_FILENAME):
    with open(file_name) as bot_json_file:
        bot_definition = json.load(bot_json_file)
    logger.info(
        'sucessfully read bot definition from file: {}'.format(file_name)
    )
    return bot_definition

def write_bot_definition_file(bot_definition, file_name=BOT_EXPORT_FILENAME):
    with open(file_name, 'w') as bot_json_file:
        json.dump(bot_definition, bot_json_file,
            indent=2,
            sort_keys=True,
            default=str
        )
    logger.info(
        'sucessfully wrote bot definition to file: {}'.format(file_name)
    )

def import_bot(bot_definition=None, definition_filename=BOT_DEFINITION_FILENAME):
    if (bot_definition is None):
        bot_definition = read_bot_definition_file(definition_filename)

    bot_importer = LexBotImporter(
        bot_definition=bot_definition,
        logging_level=DEFAULT_LOGGING_LEVEL,
    )
    bot_importer.import_bot()

    return bot_definition

def export_bot(bot_name=None, file_name=None):
    if (bot_name is None):
        bot_definition = read_bot_definition_file()
        bot_name = bot_definition['bot']['name']

    bot_exporter = LexBotExporter(
        bot_name=bot_name,
        logging_level=DEFAULT_LOGGING_LEVEL,
    )

    bot_definition = bot_exporter.export()
    if (file_name is None):
        print(
            json.dumps(bot_definition, indent=2, sort_keys=True, default=str)
        )
    else:
        write_bot_definition_file(bot_definition, file_name)

    return bot_definition

def delete_bot(bot_name=None):
    if (bot_name is None):
        bot_definition = read_bot_definition_file()
        bot_name = bot_definition['bot']['name']

    bot_deleter = LexBotDeleter(
        bot_name=bot_name,
        logging_level=DEFAULT_LOGGING_LEVEL,
    )
    bot_definition = bot_deleter.bot_definition
    bot_deleter.delete()

    return bot_definition

def get_parsed_args():
    """ Parse arguments passed when running as a shell script
    """
    parser = argparse.ArgumentParser(
        description='Lex bot manager. Import, export or delete a Lex bot.'
            ' Used to import/export/delete Lex bots and associated resources'
            ' (i.e. intents, slot types).'
    )
    format_group = parser.add_mutually_exclusive_group()
    format_group.add_argument('-i', '--import',
        nargs='?',
        default=argparse.SUPPRESS,
        const=BOT_DEFINITION_FILENAME,
        metavar='file',
        help='Import bot definition from file into account. Defaults to: {}'
            .format(BOT_DEFINITION_FILENAME),
    )
    format_group.add_argument('-e', '--export',
        nargs='?',
        default=argparse.SUPPRESS,
        metavar='botname',
        help='Export bot definition as JSON to stdout'
            ' Defaults to reading the botname from the definition file: {}'
            .format(BOT_DEFINITION_FILENAME),
    )
    format_group.add_argument('-d', '--delete',
        nargs=1,
        default=argparse.SUPPRESS,
        metavar='botname',
        help='Deletes the bot passed as argument and its associated resources.'
    )

    args = parser.parse_args()
    if not bool(vars(args)):
        parser.print_help()
        sys.exit(1)

    return args

def main(argv):
    """ Main function used when running as a shell script
    """
    parsed_args = get_parsed_args()

    if 'import' in parsed_args:
        try:
            # using the keyword import is problematic
            # turning to dict as workaround
            import_bot(definition_filename=vars(parsed_args)['import'])
        except Exception as e:
            error = 'failed to import bot {}'.format(e)
            logging.error(error);
            sys.exit(1)

    if 'export' in parsed_args:
        try:
            export_bot(bot_name=parsed_args.export)
        except Exception as e:
            error = 'failed to export bot {}'.format(e)
            logging.error(error);
            sys.exit(1)

    if 'delete' in parsed_args:
        try:
            delete_bot(parsed_args.delete.pop())
        except Exception as e:
            error = 'failed to delete bot {}'.format(e)
            logging.error(error);
            sys.exit(1)

def add_prefix(bot_definition, prefix='WebUi'):
    """ Adds a prefix to resource names in a bot definition

    Used to differentiate bots from the same definition file in CloudFormation
    when running multiple stacks in the same region and to make policy easier
    """
    bot = bot_definition['bot']
    bot['name'] = prefix + bot['name']

    bot['intents'] = map(
        lambda intent: dict(
            intentName=(prefix + intent.pop('intentName')),
            **intent
        ),
        bot_definition['bot']['intents']
    )

    slot_types = map(
        lambda slot_type: dict(
            name=(prefix + slot_type.pop('name')),
            **slot_type
        ),
        bot_definition['slot_types']
    )

    intents = map(
        lambda intent: dict(
            name=(prefix + intent.pop('name')),
            slots=map(
                lambda slot: dict(
                    slotType=(prefix + slot.pop('slotType')),
                    **slot
                ) if (prefix + slot['slotType']) in [s['name'] for s in slot_types]
                else slot,
                intent.pop('slots')
            ),
            **intent
        ),
        bot_definition['intents']
    )

    return dict(
        bot=bot,
        intents=intents,
        slot_types=slot_types
    )

def test_handler():
    import time
    handler(
        event=dict(
            RequestType='Create',
            ResourceProperties=dict(
                NamePrefix='WebUiTest',
            )
        ),
        context={},
    )
    sleep_time = 30
    logger.info('sleeping for {} seconds before deleting.'.format(sleep_time))
    time.sleep(sleep_time)
    handler(
        event=dict(
            RequestType='Delete',
            ResourceProperties=dict(
                NamePrefix='WebUiTest',
            )
        ),
        context={},
    )

def handler(event, context):
    """ CloudFormation Custom Resource Lambda Handler
    """
    import cfnresponse

    logger.info('event: {}'.format(cfnresponse.json_dump_format(event)))
    request_type = event.get('RequestType')
    resource_properties = event.get('ResourceProperties')

    response_status = cfnresponse.SUCCESS
    response = {}
    response_id = event.get('RequestId')
    reason = request_type
    error = ''

    name_prefix = resource_properties.get('NamePrefix')
    should_delete = resource_properties.get('ShouldDelete', True)

    bot_definition = read_bot_definition_file(BOT_DEFINITION_FILENAME)
    bot_definition_prefix =  add_prefix(bot_definition, name_prefix)

    if (request_type in ['Create', 'Update']):
        try:
            response_import = import_bot(bot_definition=bot_definition_prefix)
            response['BotName'] = response_import['bot']['name']
        except Exception as e:
            error = 'failed to {} bot: {}'.format(request_type, e)
            pass

    if (request_type == 'Delete' and should_delete != 'false'):
        try:
            bot_definition = read_bot_definition_file()
            bot_name = name_prefix + bot_definition['bot']['name']
            delete_bot(bot_name)
        except Exception as e:
            error = 'failed to delete bot: {}'.format(e)
            pass

    if error:
        logger.error(error)
        response_status = cfnresponse.FAILED
        reason = error

    if bool(context):
        cfnresponse.send(
            event,
            context,
            response_status,
            response,
            response_id,
            reason
        )

if __name__ == '__main__':
    #from IPython.core.debugger import Pdb ; Pdb().set_trace() # XXX
    import sys
    import argparse
    # test lambda handler from shell with -t
    if len(sys.argv) > 1 and sys.argv[1] == '-t':
        test_handler()
    # otherwise call main and parse arguments
    else:
        main(sys.argv)
