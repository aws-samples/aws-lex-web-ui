<template>
  <div
    v-if="message.text && (message.type === 'human' || message.type === 'feedback')"
    class="message-text"
  >
   {{ message.text }}
  </div>
  <div
    v-else-if="altHtmlMessage && AllowSuperDangerousHTMLInMessage"
    v-html="altHtmlMessage"
    class="message-text"
  ></div>
  <div
    v-else-if="message.text && shouldRenderAsHtml"
    v-html="botMessageAsHtml"
    class="message-text"
  ></div>
  <div
    v-else-if="message.text && message.type === 'bot'"
    class="message-text"
  >
    {{ (shouldStripTags) ? stripTagsFromMessage(message.text) : message.text }}
  </div>
</template>

<script>
/*
Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/
const marked = require('marked');

const renderer = new marked.Renderer();

renderer.link = function link(href, title, text) {
  return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
};

export default {
  name: 'message-text',
  props: ['message'],
  computed: {
    shouldConvertUrlToLinks() {
      return this.$store.state.config.ui.convertUrlToLinksInBotMessages;
    },
    shouldStripTags() {
      return this.$store.state.config.ui.stripTagsFromBotMessages;
    },
    AllowSuperDangerousHTMLInMessage() {
      return this.$store.state.config.ui.AllowSuperDangerousHTMLInMessage;
    },
    altHtmlMessage() {
      let out = false;
      if (this.message.alts) {
        if (this.message.alts.html) {
          out = this.message.alts.html;
        } else if (this.message.alts.markdown) {
          out = marked(this.message.alts.markdown, { renderer });
        }
      }
      return out;
    },
    shouldRenderAsHtml() {
      return (this.message.type === 'bot' && this.shouldConvertUrlToLinks);
    },
    botMessageAsHtml() {
      // Security Note: Make sure that the content is escaped according
      // to context (e.g. URL, HTML). This is rendered as HTML
      const messageText = this.stripTagsFromMessage(this.message.text);
      const messageWithLinks = this.botMessageWithLinks(messageText);
      return messageWithLinks;
    },
  },
  methods: {
    encodeAsHtml(value) {
      return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    },
    botMessageWithLinks(messageText) {
      const linkReplacers = [
        // The regex in the objects of linkReplacers should return a single
        // reference (from parenthesis) with the whole address
        // The replace function takes a matched url and returns the
        // hyperlink that will be replaced in the message
        {
          type: 'web',
          regex: new RegExp(
            '\\b((?:https?://\\w{1}|www\\.)(?:[\\w-.]){2,256}' +
            '(?:[\\w._~:/?#@!$&()*+,;=[\'\\]-]){0,256})',
            'im',
          ),
          replace: (item) => {
            const url = (!/^https?:\/\//.test(item)) ? `http://${item}` : item;
            return '<a target="_blank" ' +
              `href="${encodeURI(url)}">${this.encodeAsHtml(item)}</a>`;
          },
        },
      ];
      // TODO avoid double HTML encoding when there's more than 1 linkReplacer
      return linkReplacers
        .reduce(
          (message, replacer) =>
            // splits the message into an array containing content chunks
            // and links. Content chunks will be the even indexed items in the
            // array (or empty string when applicable).
            // Links (if any) will be the odd members of the array since the
            // regex keeps references.
            message.split(replacer.regex)
              .reduce(
                (messageAccum, item, index, array) => {
                  let messageResult = '';
                  if ((index % 2) === 0) {
                    const urlItem = ((index + 1) === array.length) ?
                      '' : replacer.replace(array[index + 1]);
                    messageResult = `${this.encodeAsHtml(item)}${urlItem}`;
                  }
                  return messageAccum + messageResult;
                },
                '',
              ),
          messageText,
        );
    },
    // used for stripping SSML (and other) tags from bot responses
    stripTagsFromMessage(messageText) {
      const doc = document.implementation.createHTMLDocument('').body;
      doc.innerHTML = messageText;
      return doc.textContent || doc.innerText || '';
    },
  },
};
</script>

<style scoped>
.message-text {
  hyphens: auto;
  overflow-wrap: break-word;
  padding: 0.8em;
  white-space: normal;
  word-break: break-word;
  width: 100%;
}
</style>
