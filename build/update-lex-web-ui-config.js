/**
 * Updates config files used by the build environment
 * It merges the values from the environment with the
 * existing values in the config files.
 * Values from the environment take precendence.
 *
 * This is called during the build process by
 * the Makefile in the root dir which is run by CodeBuild
 */
const fs = require('fs');
const config = require('../config');
const {exec} = require("child_process");
const path = require("path");
let revisedConfig;

/**
 * lexV2BotLocaleVoices maps lex v2 locale IDs to support voices to be used when creating initial speech mp3 files.
 * The mapping identifies a voiceId, an engine, and a languageCode to use when executing aws polly CLI. Over time
 * the set of supported localeId to Voices may be expanded. An empty string for a languageCode indicates that polly
 * does not support a language code for this locale.
 */
const lexV2BotLocaleVoices = {
  "de_AT": {
    "voiceId": "Vicki",
    "engine": "neural",
    "languageCode": "de-AT"
  },
  "de_DE": {
    "voiceId": "Vicki",
    "engine": "neural",
    "languageCode": "de-DE"
  },
  "en_AU": {
    "voiceId": "Olivia",
    "engine": "neural",
    "languageCode": "en-AU"
  },
  "en_GB": {
    "voiceId": "Amy",
    "engine": "neural",
    "languageCode": "en-GB"
  },
  "en_IN": {
    "voiceId": "Aditi",
    "engine": "standard",
    "languageCode": "en-IN"
  },
  "en_US": {
    "voiceId": "Joanna",
    "engine": "neural",
    "languageCode": "en-US"
  },
  "en_ZA": {
    "voiceId": "Ayanda",
    "engine": "neural",
    "languageCode": "en-ZA"
  },
  "es_419": {
    "voiceId": "Mia",
    "engine": "standard",
    "languageCode": ""
  },
  "es_ES": {
    "voiceId": "Lucia",
    "engine": "neural",
    "languageCode": "es-ES"
  },
  "es_US": {
    "voiceId": "Lupe",
    "engine": "neural",
    "languageCode": "es-US"
  },
  "fr_CA": {
    "voiceId": "Gabrielle",
    "engine": "neural",
    "languageCode": "fr-CA"
  },
  "fr_FR": {
    "voiceId": "Lea",
    "engine": "neural",
    "languageCode": "fr-FR"
  },
  "it_IT": {
    "voiceId": "Bianca",
    "engine": "neural",
    "languageCode": "it-IT"
  },
  "ja_JP": {
    "voiceId": "Takumi",
    "engine": "neural",
    "languageCode": "ja-JP"
  },
  "ko_KR": {
    "voiceId": "Seoyeon",
    "engine": "neural",
    "languageCode": "ko-KR"
  },
  "pt_BR": {
    "voiceId": "Camila",
    "engine": "neural",
    "languageCode": ""
  },
  "pt_PT": {
    "voiceId": "Cristiano",
    "engine": "standard",
    "languageCode": "pt-PT"
  },
  "zh_CN": {
    "voiceId": "Zhiyu",
    "engine": "standard",
    "languageCode": ""
  }
};

// dump relevant env vars
[
  'AWS_DEFAULT_REGION',
  'V2_BOT_ID',
  'V2_BOT_ALIAS_ID',
  'V2_BOT_LOCALE_ID',
  'BOT_NAME',
  'BOT_ALIAS',
  'BOT_INITIAL_TEXT',
  'BOT_INITIAL_SPEECH',
  'BOT_INITIAL_UTTERANCE',
  'BOT_RETRY_ON_LEX_POST_TEXT_TIMEOUT',
  'BOT_RETRY_COUNT_POST_TEXT_TIMEOUT',
  'IFRAME_ORIGIN',
  'PARENT_ORIGIN',
  'ENABLE_LOGIN',
  'ENABLE_LIVE_CHAT',
  'FORCE_LOGIN',
  'POOL_ID',
  'APP_USER_POOL_CLIENT_ID',
  'CONNECT_CONTACT_FLOW_ID',
  'CONNECT_INSTANCE_ID',
  'CONNECT_API_GATEWAY_ENDPOINT',
  'CONNECT_PROMPT_FOR_NAME_MESSAGE',
  'CONNECT_WAIT_FOR_AGENT_MESSAGE',
  'CONNECT_WAIT_FOR_AGENT_MESSAGE_INTERVAL_IN_SECONDS',
  'CONNECT_AGENT_JOINED_MESSAGE',
  'CONNECT_AGENT_LEFT_MESSAGE',
  'CONNECT_CHAT_ENDED_MESSAGE',
  'CONNECT_ATTACH_CHAT_TRANSCRIPT',
  'CONNECT_LIVE_CHAT_TERMS',
  'CONNECT_START_LIVE_CHAT_LABEL',
  'CONNECT_START_LIVE_CHAT_ICON',
  'CONNECT_END_LIVE_CHAT_LABEL',
  'CONNECT_END_LIVE_CHAT_ICON',
  'CONNECT_TRANSCRIPT_MESSAGE_DELAY_IN_MSEC',
  'APP_DOMAIN_NAME',
  'UI_TOOLBAR_TITLE',
  'UI_TOOLBAR_LOGO',
  'BOT_AVATAR_IMG_URL',
  'NEGATIVE_INTENT',
  'POSITIVE_INTENT',
  'HELP_INTENT',
  'MIN_BUTTON_TOOLTIP_CONTENT',
  'ENABLE_UPLOAD',
  'UPLOAD_BUCKET_NAME'
].forEach(function (envVar) {
  console.info('[INFO] Env var - %s: [%s]', envVar, process.env[envVar]);
});

/**
 * Create an Mp3 file in the specified output folder for the given text, languageCode, and voiceId
 * using AWS Polly.
 * @param text
 * @param languageCode
 * @param voiceId
 * @param output
 */
function createMp3(text, languageCode, voiceId, output) {
  let lcDefinition = (languageCode.length > 0) ? `--language-code ${languageCode}` : '';
  const cmd = `aws polly synthesize-speech --text "${text}" ${lcDefinition} --voice-id "${voiceId}"  --output-format mp3 --text-type text "${output}"`
  console.info(`createMp3 cmd is \n${cmd}`);
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`createMp3 error: ${error.message}`);
    }
    if (stderr) {
      console.error(`createMp3 stderr: ${stderr}`);
    }
    console.info(`createMp3 stdout: ${stdout}`);
  });
}

/**
 * Translate the specified text to the specified localeId and create an Mp3 in
 * the specified output folder.
 * @param localeId
 * @param text
 * @param output
 */
function translateAndCreateMp3(localeId, text, output) {
  console.info(`translate '${text}' to ${localeId.trim()} with output of ${output}`);
  lid = localeId.trim()
  if (lid === 'en_US') {
    return;
  }
  let targetPollyVoiceConfig = lexV2BotLocaleVoices[lid]
  let enUSPollyVoiceConfig = lexV2BotLocaleVoices["en_US"];
  console.info(`targetPollyVoiceConfig ${JSON.stringify(targetPollyVoiceConfig,null,4)}`);
  if (targetPollyVoiceConfig) {
    // translate the english text defined in CF template to the target language.
    const targetTranslateLang = lid.split("_")[0];
    const translateCmd = `aws translate translate-text --text "${text}" --source-language-code auto --target-language-code ${targetTranslateLang} --output json --query 'TranslatedText'`
    console.info(`translate cmd is \n${translateCmd}`);
    exec(translateCmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`translate error: ${error.message}`);
      }
      if (stderr) {
        console.error(`translate stderr: ${stderr}`);
      }
      console.info(`translate stdout: ${stdout.trim()}`);
      // if a language code for the target locale exists, specify this for the polly command
      createMp3(stdout.trim().replace(/['"]+/g, ''), targetPollyVoiceConfig.languageCode, targetPollyVoiceConfig.voiceId, output)
    });
  } else { // the specified locale can't be translated as it is not in the map. Generate an english version for this locale.
    console.info(`Could not find specified locale "${lid}"`)
    createMp3(text.trim().replace(/['"]+/g, ''), enUSPollyVoiceConfig.languageCode, enUSPollyVoiceConfig.voiceId, output)
  }
}

Object.keys(config)
.map(function (confKey) { return config[confKey]; })
.forEach(function (item) {
  fs.writeFile(item.file, JSON.stringify(item.conf, null, 2), function (err) {
    if (err) {
      console.error('[ERROR] could not write file: ', err);
      process.exit(1);
    }

    // This following code pre-creates mp3 files needed for voice interaction. These files need to be pre-created
    // and made available to the lex-web-ui for voice mode as the unauthenticated IAM role built for lex-web-ui no
    // longer has access to Polly dynamically. The build IAM role does have access to Polly and Translate. The files
    // are made available in the lex-web-ui web app bucket alongside of other UI assets. The files created are used
    // for initial voice, the "All done" verbal response, and the "There was an error" verbal response.

    console.info('[INFO] Updated file: ', item.file);
    console.info('[INFO] Config contents: ', JSON.stringify(item.conf));
    revisedConfig = item.conf;
    let enUSPollyVoiceConfig = lexV2BotLocaleVoices["en_US"];
    const {exec} = require("child_process");
    const path = require('path');
    const configDir = path.parse(item.file).dir;
    console.info('[INFO] Config dir is: ', configDir);

    // if an initial speach is set in the configuration, generate mp3 files for english and other configured locales
    if (revisedConfig.lex && revisedConfig.lex.initialSpeechInstruction && revisedConfig.lex.initialSpeechInstruction.length > 0) {
      // always generate an en_US mp3 if initial speech is defined
      createMp3(revisedConfig.lex.initialSpeechInstruction.replace(/['"]+/g, ''), "en-US", enUSPollyVoiceConfig.voiceId,`${configDir}/initial_speech_en_US.mp3`);

      // Iterate through the map of the configured v2BotLocaleIds and generate mp3 files with initial speech.
      // This is only supported for LexV2 bots.
      revisedConfig.lex.v2BotLocaleId.split(",").map((localeId) => {
        lid = localeId.trim();
        if (lid != "en_US") {
          translateAndCreateMp3(lid, revisedConfig.lex.initialSpeechInstruction.replace(/['"]+/g, ''), `${configDir}/initial_speech_${lid}.mp3`)
        }
      });
    }

    // create mp3 audio files for other prompts used by lex-web-ui in english and other locales
    if (revisedConfig && revisedConfig.lex) {
      // Create special case MP3s that lexwebui might utilize
      createMp3('All done', "en-US", enUSPollyVoiceConfig.voiceId, `${configDir}/all_done_en_US.mp3`);
      createMp3('There was an error', "en-US", enUSPollyVoiceConfig.voiceId, `${configDir}/there_was_an_error_en_US.mp3`);
      revisedConfig.lex.v2BotLocaleId.split(",").map((localeId) => {
        let lid = localeId.trim();
        translateAndCreateMp3(localeId, 'All done', `${configDir}/all_done_${lid}.mp3`)
        translateAndCreateMp3(localeId, 'There was an error', `${configDir}/there_was_an_error_${lid}.mp3`)
      });
    }
  });
});