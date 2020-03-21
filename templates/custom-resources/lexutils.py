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
""" Lex Model Building Service Helper Classes
"""
# TODO need to DRY codebase
import logging
import json
import copy
import time

import boto3

DEFAULT_LOGGING_LEVEL = logging.WARNING
logging.basicConfig(format='[%(levelname)s] %(message)s', level=DEFAULT_LOGGING_LEVEL)
logger = logging.getLogger(__name__)

class LexClient():
    def __init__(self, profile_name=''):
        self._profile_name = profile_name

        if self._profile_name:
            try:
                self._lex_client = (
                    boto3.session
                    .Session(profile_name=self._profile_name).client('lex-models')
                )
            except Exception as e:
                logger.error(
                    'Failed to create boto3 client using profile: {}'.format(
                        profile_name
                    )
                )
                logger.error(e)
                raise
        else:
            try:
                self._lex_client = boto3.client('lex-models')
            except Exception as e:
                logger.error('Failed to create boto3 client')
                logger.error(e)
                raise

    @property
    def client(self):
        return self._lex_client


class LexBotExporter():
    """Class to export a Lex bot definition from an AWS account

    :param bot_name: Lex bot name to import
    :type botn_name: str

    :param bot_version: Lex bot version to import
    :type bot_version: str

    :param lex_iam_role_arn: IAM role ARN to substitute as the bot role
        if empty, the arn will not be substituted
    :type lex_iam_role_arn: str

    :param lambda_arn: Lambda ARN to substitute in *all* code hooks
        if empty, the arn will not be substituted
    :type lambda_arn: str

    :param profile_name: AWS cli/SDK profile credentials to use.
        If empty, the standard credential resolver will be used.
    :type profile_name: str
    """
    def __init__(
            self,
            bot_name,
            bot_version='$LATEST',
            lambda_arn=None,
            profile_name='',
            logging_level=DEFAULT_LOGGING_LEVEL
        ):
        self._bot_name = bot_name
        self._bot_version = bot_version
        self._lambda_arn = lambda_arn

        self._get_bot_response = {}
        self._get_intent_responses = {}
        self._get_slot_type_responses = {}

        logger.setLevel(logging_level)
        logging.getLogger('botocore').setLevel(logging_level)

        self._lex_client = LexClient(profile_name=profile_name).client

    def _get_bot(self):
        try:
            self._get_bot_response = self._lex_client.get_bot(
                name=self._bot_name, versionOrAlias=self._bot_version
            )
        except Exception as e:
            logger.error('Lex get_bot call failed')
            logger.error(e)
            raise

        return self._get_bot_response

    def _get_bot_intents(self):
        for intent in self._get_bot_response['intents']:
            intent_name = intent['intentName']
            try:
                intent_response = self._lex_client.get_intent(
                    name=intent_name, version=intent['intentVersion']
                )
            except Exception as e:
                logger.error('Lex get_intent call failed')
                logger.error(e)
                raise

            self._get_intent_responses[intent_name] = intent_response

        return self._get_intent_responses

    def _get_bot_slot_types(self):
        # grab associated slot types from source intents
        for intent_name in self._get_intent_responses:
            for slot in self._get_intent_responses[intent_name]['slots']:
                slot_type = slot['slotType']
                # ignore AMAZON and types seen before
                if (not slot_type.startswith('AMAZON.') and
                    not self._get_slot_type_responses.get(slot_type)
                ):
                    try:
                        slot_type_response = self._lex_client.get_slot_type(
                            name=slot_type, version=slot['slotTypeVersion']
                        )
                    except Exception as e:
                        logger.error('Lex get_slot_type call failed')
                        logger.error(e)
                        raise
                    self._get_slot_type_responses[slot_type] = (
                        slot_type_response
                    )

        return self._get_slot_type_responses

    def _export_bot(self):
        bot_export = copy.deepcopy(self._get_bot())
        bot_export = self.filter_unneeded_keys(bot_export)
        bot_export = self.change_intent_versions(bot_export)

        return bot_export

    def _export_bot_intents(self):
        intents_export = copy.deepcopy(self._get_bot_intents())
        for intent_name in intents_export:
            intent = intents_export[intent_name]
            intent = self.filter_unneeded_keys(intent)
            if self._lambda_arn:
                intent = self.change_intent_code_hooks(intent, self._lambda_arn)
            intent = self.change_intent_slot_versions(intent)
            intents_export[intent_name] = intent

        return intents_export

    def _export_bot_slot_types(self):
        slot_types_export = copy.deepcopy(self._get_bot_slot_types())
        for slot_type_name in slot_types_export:
            slot_type = slot_types_export[slot_type_name]
            slot_type = self.filter_unneeded_keys(slot_type)
            slot_types_export[slot_type_name] = slot_type

        return slot_types_export

    def export(self):
        """ Performs a Lex get_bot API call

        :returns: the response of Lex get_bot with immutable/unneeded fields
            filtered out so that it can be fed to create/update calls
            returned object contains the exported resources in this structure:
            {bot:  {}, intents: [], slot-types: []}
        :rtype: dict
        """

        logger.info('exporting definition of bot: {}'.format(self._bot_name))
        self._get_bot = self._export_bot()
        self._bot_intents = self._export_bot_intents()
        self._slot_types = self._export_bot_slot_types()
        logger.info('successfully exported bot definition')

        return dict(
            bot=self._get_bot,
            intents=self._bot_intents.values(),
            slot_types=self._slot_types.values(),
        )

    @staticmethod
    def filter_unneeded_keys(get_response):
        """ Filter unneeded keys from Lex API responses

        This is a shallow filter used to remove uneeded/immutable keys that
        should not be used on subsequet Lex create/update API calls made after
        exporting

        :param get_response: a response dictionary from a boto3 lex API
            get* call
        :type get_response: dict

        :returns: response dictionary without the filtered keys
        :rtype: dict
        """
        KEYS_TO_FILTER = [
            'ResponseMetadata',
            'checksum',
            'createdDate',
            'lastUpdatedDate',
            'status',
            'version',
        ]
        return {key: get_response[key]
                for key in get_response if key not in KEYS_TO_FILTER}

    @staticmethod
    def change_intent_versions(response, version='$LATEST'):
        response_copy = copy.deepcopy(response)

        if not response_copy.get('intents'):
            logger.warn('response does not contain intents')
            return response_copy

        for intent in response_copy['intents']:
            intent.update(intentVersion=version)

        return response_copy

    @staticmethod
    def change_intent_slot_versions(response, version='$LATEST'):
        response_copy = copy.deepcopy(response)
        if not response_copy.get('slots'):
            logger.debug('response does not contain slots')
            return response_copy

        for slot in response_copy['slots']:
            if (not slot['slotType'].startswith('AMAZON.')):
                slot.update(slotTypeVersion=version)

        return response_copy

    @staticmethod
    def change_intent_code_hooks(response, lambda_arn):
        response_copy = copy.deepcopy(response)

        if (response_copy.get('dialogCodeHook') and
            response_copy['dialogCodeHook'].get('uri')
        ):
            response_copy['dialogCodeHook']['uri'] = lambda_arn

        if (response_copy.get('fulfillmentActivity') and
            response_copy['fulfillmentActivity'].get('codeHook') and
            response_copy['fulfillmentActivity']['codeHook'].get('uri')
        ):
            response_copy['fulfillmentActivity']['codeHook']['uri'] = (
                lambda_arn
            )

        return response_copy

    @property
    def bot_name(self):
        return self._bot_name

    @property
    def bot_version(self):
        return self._bot_version

class LexBotImporter():
    def __init__(
            self,
            bot_definition,
            profile_name='',
            logging_level=DEFAULT_LOGGING_LEVEL,
        ):

        if (not bot_definition.get('bot') or
            not bot_definition.get('intents') or
            not bot_definition.get('slot_types')
        ):
            raise ValueError('invalid bot_definition argument')

        self._bot_definition = bot_definition

        logger.setLevel(logging_level)
        logging.getLogger('botocore').setLevel(logging_level)

        self._lex_client = LexClient(profile_name=profile_name).client

        self._slot_types = {}
        self._intents = {}
        self._bots = {}

    def _get_slot_types(self):
        ''' get existing slots in target to know when to update/create
        '''
        # XXX it seems like the Lex SDK doesn't have can_paginate() support
        nextToken = ''
        count=20
        while True:
            try:
                get_slot_types_response = (
                    self._lex_client.get_slot_types(
                        maxResults=50, nextToken=nextToken
                    )
                )
            except Exception as e:
                logger.error('Lex get_slot_types call failed')
                logger.error(e)
                raise
            for slot_type in get_slot_types_response['slotTypes']:
                name = slot_type['name']
                self._slot_types[name] = slot_type

            nextToken = get_slot_types_response.get('nextToken')
            count-=1
            if count and not nextToken:
                break

        return self._slot_types

    def _get_intents(self):
        ''' get existing intents in target to know when to update/create
        '''
        # XXX it seems like the Lex SDK doesn't have can_paginate() support
        nextToken = ''
        count=20
        while True:
            try:
                get_intents_response = self._lex_client.get_intents(
                    maxResults=50, nextToken=nextToken
                )
            except Exception as e:
                logger.error('Lex get_intents call failed')
                logger.error(e)
                raise
            for intent in get_intents_response['intents']:
                name = intent['name']
                self._intents[name] = intent

            nextToken = get_intents_response.get('nextToken')
            count-=1
            if count and not nextToken:
                break

        return self._intents

    def _get_bots(self):
        ''' get existing bots in target to know when to update/create
        '''
        # XXX it seems like the Lex SDK doesn't have can_paginate() support
        nextToken = ''
        count=20
        while True:
            try:
                get_bots_response = self._lex_client.get_bots(
                    maxResults=50, nextToken=nextToken
                )
            except Exception as e:
                logger.error('Lex get_intents call failed')
                logger.error(e)
                raise
            for bot in get_bots_response['bots']:
                name = bot['name']
                self._bots[name] = bot

            nextToken = get_bots_response.get('nextToken')
            count-=1
            if count and not nextToken:
                break

        return self._bots

    def _import_slot_types(self):
        ''' create/update slot types
        '''
        for slot_type in self._bot_definition['slot_types']:
            name = slot_type['name']
            version = '$LATEST'
            if self._slot_types.get(name):
                logger.info('updating slot type: {}'.format(name))

                try:
                    get_slot_type_response = self._lex_client.get_slot_type(
                        name=name, version=version
                    )
                except Exception as e:
                    logger.error('Lex get_slot_type call failed')
                    logger.error(e)
                    raise
                checksum = get_slot_type_response['checksum']
                try:
                    self._lex_client.put_slot_type(
                        checksum=checksum, **slot_type
                    )
                    logger.info('successfully updated slot type: {}'.format(name))
                except Exception as e:
                    logger.error('Lex put_slot_type call failed')
                    logger.error(e)
                    raise
            else:
                logger.info('creating slot type: {}'.format(name))
                try:
                    self._lex_client.put_slot_type(**slot_type)
                    logger.info('sucessfully created slot type: {}'.format(name))
                except Exception as e:
                    logger.error('Lex put_slot_type call failed')
                    logger.error(e)
                    raise

    def _import_intents(self):
        ''' create/update intents
        '''
        for intent in self._bot_definition['intents']:
            name = intent['name']
            version = '$LATEST'
            if self._intents.get(name):
                logger.info('updating intent: {}'.format(name))

                try:
                    get_intent_response = self._lex_client.get_intent(
                        name=name, version=version
                    )
                except Exception as e:
                    logger.error('Lex get_intent call failed')
                    logger.error(e)
                    raise
                checksum = get_intent_response['checksum']
                try:
                    self._lex_client.put_intent(checksum=checksum, **intent)
                    logger.info('sucessfully updated intent: {}'.format(name))
                except Exception as e:
                    logger.error('Lex put_intent call failed')
                    logger.error(e)
                    raise
            else:
                logger.info('creating intent: {}'.format(name))
                try:
                    self._lex_client.put_intent(**intent)
                    logger.info('successfully created intent: {}'.format(name))
                except Exception as e:
                    logger.error('Lex put_intent call failed')
                    logger.error(e)
                    raise

    def _import_bot(self):
        ''' create/update bot
        '''
        bot = self._bot_definition['bot']
        bot_name = bot['name']
        version = '$LATEST'

        if self._bots.get(bot_name):
            try:
                get_bot_response = self._lex_client.get_bot(
                    name=bot_name, versionOrAlias=version
                )
            except Exception as e:
                logger.error('Lex get_bot call failed')
                logger.error(e)
                raise
            checksum = get_bot_response['checksum']
            logger.info('updating bot: {}'.format(bot_name))
            try:
                self._lex_client.put_bot(checksum=checksum, **bot)
                logger.info('successfully updated bot: {}'.format(bot_name))
            except Exception as e:
                logger.error('Lex put_bot call failed')
                logger.error(e)
                raise
        else:
            logger.info('creating bot: {}'.format(bot_name))
            try:
                self._lex_client.put_bot(**bot)
                logger.info('successfully created bot: {}'.format(bot_name))
            except Exception as e:
                logger.error('Lex put_bot call failed')
                logger.error(e)
                raise


    def import_bot(self):
        logger.info('importing bot definition for bot name {}'.format(
              self._bot_definition['bot']['name']
            )
        )
        self._get_slot_types()
        self._get_intents()
        self._get_bots()

        self._import_slot_types()
        self._import_intents()
        self._import_bot()
        logger.info('successfully imported bot and associated resources')

class LexBotDeleter(LexBotExporter):
    """Class to delete a Lex bot and associated resources
    """
    MAX_DELETE_TRIES = 5
    RETRY_SLEEP = 5

    def __init__(
            self,
            bot_name,
            bot_version='$LATEST',
            profile_name='',
            logging_level=DEFAULT_LOGGING_LEVEL
        ):
        LexBotExporter.__init__(
            self,
            bot_name=bot_name,
            bot_version=bot_version,
            profile_name=profile_name,
            logging_level=logging_level
        )
        logger.setLevel(logging_level)
        logging.getLogger('botocore').setLevel(logging_level)

        self._bot_definition = LexBotExporter.export(self)
        self._bot_aliases = {}

        self._lex_client = LexClient(profile_name=profile_name).client

    def _delete_slot_types(self):
        ''' delete slot types
        '''
        for slot_type in self._bot_definition['slot_types']:
            name = slot_type['name']
            logger.info('deleting slot type: {}'.format(name))
            count=self.MAX_DELETE_TRIES
            while True:
                try:
                    self._lex_client.delete_slot_type(name=name)
                    logger.info('successfully deleted slot type: {}'.format(name))
                    break
                except Exception as e:
                    logger.warning('Lex delete_slot_type call failed')
                    logger.warning(e)
                    count-=1
                    if count:
                        logger.warning(
                            'Lex delete_slot_type retry: {}. '
                            'Sleeping for {} seconds'.format(
                                self.MAX_DELETE_TRIES - count,
                                self.RETRY_SLEEP,
                            )
                        )
                        time.sleep(self.RETRY_SLEEP)
                        continue
                    else:
                        logger.error('Lex delete_slot_type call max retries')
                        raise

    def _delete_intents(self):
        ''' delete intents
        '''
        for intent in self._bot_definition['intents']:
            name = intent['name']
            logger.info('deleting intent: {}'.format(name))
            count=self.MAX_DELETE_TRIES
            while True:
                try:
                    self._lex_client.delete_intent(name=name)
                    logger.info('successfully deleted intent: {}'.format(name))
                    break
                except Exception as e:
                    logger.warning('Lex delete_intent call failed')
                    logger.warning(e)
                    count-=1
                    if count:
                        logger.warning(
                            'Lex delete_intent retry: {}. '
                            'Sleeping for {} seconds'.format(
                                self.MAX_DELETE_TRIES - count,
                                self.RETRY_SLEEP,
                            )
                        )
                        time.sleep(self.RETRY_SLEEP)
                        continue
                    else:
                        logger.error('Lex delete_intent call max retries')
                        raise

    def _get_bot_aliases(self):
        ''' get existing bot aliases
        '''
        # XXX it seems like the Lex SDK doesn't have can_paginate() support
        nextToken = ''
        count=20
        bot_name = self._bot_definition['bot']['name']
        while True:
            try:
                get_bot_aliases_response = (
                    self._lex_client.get_bot_aliases(
                        botName=bot_name, maxResults=50, nextToken=nextToken
                    )
                )
            except Exception as e:
                logger.error('Lex get_bot_aliases call failed')
                logger.error(e)
                raise
            for alias in get_bot_aliases_response['BotAliases']:
                name = alias['name']
                self._bot_aliases[name] = alias

            nextToken = get_bot_aliases_response.get('nextToken')
            count-=1
            if count and not nextToken:
                break

        return self._bot_aliases

    def _delete_bot_aliases(self):
        ''' delete bot aliases
        '''
        bot_name = self._bot_definition['bot']['name']
        for name in self._get_bot_aliases():
            logger.info('deleting alias: {}'.format(name))
            count=self.MAX_DELETE_TRIES
            while True:
                try:
                    self._lex_client.delete_bot_alias(name=name, botName=bot_name)
                    logger.info('successfully deleted bot alias: {}'.format(name))
                    break
                except Exception as e:
                    logger.warning('Lex delete_bot_alias call failed')
                    logger.warning(e)
                    count-=1
                    if count:
                        logger.warning(
                            'Lex delete_bot_alias retry: {}. '
                            'Sleeping for {} seconds'.format(
                                self.MAX_DELETE_TRIES - count,
                                self.RETRY_SLEEP,
                            )
                        )
                        time.sleep(self.RETRY_SLEEP)
                        continue
                    else:
                        logger.error('Lex delete_bot_aliases call max retries')
                        raise

    def _delete_bot(self):
        ''' delete bot
        '''
        name = self._bot_definition['bot']['name']
        logger.info('deleting bot: {}'.format(name))
        count=self.MAX_DELETE_TRIES
        while True:
            try:
                self._lex_client.delete_bot(name=name)
                logger.info('deleted bot: {}'.format(name))
                break
            except Exception as e:
                logger.warning('Lex delete_bot call failed')
                logger.warning(e)
                count-=1
                if count:
                    logger.warning(
                        'Lex delete_bot retry: {}. '
                        'Sleeping for {} seconds'.format(
                            self.MAX_DELETE_TRIES - count,
                            self.RETRY_SLEEP,
                        )
                    )
                    time.sleep(self.RETRY_SLEEP)
                    continue
                else:
                    logger.error('Lex delete_bot call max retries')
                    raise

    def delete(self):
        logger.info('deleting bot with definition: \n{}'.format(
                json.dumps(self._bot_definition,
                    indent=2,
                    sort_keys=True,
                    default=str
                )
            )
        )
        self._delete_bot_aliases()
        self._delete_bot()
        self._delete_intents()
        self._delete_slot_types()
        logger.info('successfully deleted bot and associated resources')

    @property
    def bot_definition(self):
        return self._bot_definition
