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
  'CONNECT_END_LIVE_CHAT_ICON' ,
  'APP_DOMAIN_NAME',
  'UI_TOOLBAR_TITLE',
  'UI_TOOLBAR_LOGO',
  'NEGATIVE_INTENT',
  'POSITIVE_INTENT',
  'HELP_INTENT',
  'MIN_BUTTON_TOOLTIP_CONTENT',
].forEach(function (envVar) {
  console.log('[INFO] Env var - %s: [%s]', envVar, process.env[envVar]);
});
Object.keys(config)
.map(function (confKey) { return config[confKey]; })
.forEach(function (item) {
  fs.writeFile(item.file, JSON.stringify(item.conf, null, 2), function (err) {
    if (err) {
      console.error('[ERROR] could not write file: ', err);
      process.exit(1);
    }
    console.log('[INFO] Updated file: ', item.file);
    console.log('[INFO] Config contents: ', JSON.stringify(item.conf));
    revisedConfig = item.conf;
    if (revisedConfig.lex && revisedConfig.lex.initialSpeechInstruction && revisedConfig.lex.initialSpeechInstruction.length > 0) {
      const {exec} = require("child_process");
      const path = require('path');
      const configDir = path.parse(item.file).dir;
      console.log('[INFO] Config dir is: ', configDir);
      // always generate an en_US mp3 if initial speech is defined
      const cmd = `aws polly synthesize-speech --text "${revisedConfig.lex.initialSpeechInstruction.replace(/['"]+/g, '')}" --language-code "en-US" --voice-id "${revisedConfig.polly.voiceId}"  --output-format mp3 --text-type text "${configDir}/initial_speech_en_US.mp3"`
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
      });
      // Iterate through the map of the configured v2BotLocaleIds and generate mp3 files with initial speech.
      // This is only supported for LexV2 bots.
      revisedConfig.lex.v2BotLocaleId.split(",").map((origLocaleId) => {
        let targetPollyVoiceConfig = lexV2BotLocaleVoices[origLocaleId];
        if (targetPollyVoiceConfig && origLocaleId !== 'en_US') {
          // translate the english text defined in CF template to the target language.
          const targetTranslateLang = origLocaleId.split("_")[0];
          const translateCmd = `aws translate translate-text --text "${revisedConfig.lex.initialSpeechInstruction}" --source-language-code auto --target-language-code ${targetTranslateLang} --output json --query 'TranslatedText'`
          exec(translateCmd, (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout.trim()}`);
            // if a language code for the target locale exists, specify this for the polly command
            let lcDefinition = (targetPollyVoiceConfig.languageCode.length > 0) ? `--language-code ${targetPollyVoiceConfig.languageCode}` : '';
            const pollyCmd = `aws polly synthesize-speech --text ${stdout.trim()} ${lcDefinition} --voice-id "${targetPollyVoiceConfig.voiceId}"  --engine "${targetPollyVoiceConfig.engine}" --output-format mp3 --text-type text "${configDir}/initial_speech_${origLocaleId}.mp3"`
            exec(pollyCmd, (error, stdout, stderr) => {
              if (error) {
                console.log(`error: ${error.message}`);
              }
              if (stderr) {
                console.log(`stderr: ${stderr}`);
              }
              console.log(`stdout: ${stdout}`);
            });
          });
        } else { // the specified local can't be translated as it is not in the map. Generate an english version for this locale.
          const defaultPollyCmd = `aws polly synthesize-speech --text "${revisedConfig.lex.initialSpeechInstruction.replace(/['"]+/g, '')}" --language-code "en-US" --voice-id "${revisedConfig.polly.voiceId}"  --output-format mp3 --text-type text "${configDir}/initial_speech_${origLocaleId}.mp3"`
          exec(defaultPollyCmd, (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
          });
        }
      });
    }
  });
});