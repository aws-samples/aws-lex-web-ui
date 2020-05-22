#!/usr/bin/env bash

# This script is used at build time to generate a page with
# config info and an HTML snippet showing how to load the
# chatbot UI as an iframe
# This is called from the main Makefile used by CodeBuild

if [ -z "${IFRAME_SNIPPET_FILE}" ]; then
  echo "[ERROR] IFRAME_SNIPPET_FILE environment variable not defined" >&2
  exit 1
fi

if [ -z "${CLOUDFRONT_DOMAIN}" ]; then
  echo "[WARN] CLOUDFRONT_DOMAIN environment variable not defined" >&2
  WEBAPP_URL=''
else
  WEBAPP_URL="https://${CLOUDFRONT_DOMAIN}"
fi

[ -z "${PARENT_ORIGIN}" ] && \
    echo "[WARN] PARENT_ORIGIN environment variable not defined" >&2

cat <<EOF > ${IFRAME_SNIPPET_FILE}
<html>
<head>
  <title>Lex Web UI Iframe Snippet</title>
  <style>
    body { margin: 2% 4%; }
    pre { padding: 10px ;background-color: EFEFEF; overflow: auto; }
  </style>
</head>

<body>
  <h2>Lex Web UI Iframe Snippet</h2>

  <p>
    Include the snippet listed below in your web page to embed the chatbot
    UI. The snippet loads the chatbot UI as an iframe using the config
    shown in the
    <a href="#json-file-config">JSON File Config</a> section below.
    The <a href="#origin-configuration">Origin Configuration</a>
    section below shows the values of the iframe URL and parent
    <a href="https://developer.mozilla.org/en-US/docs/Glossary/Origin">
    origin</a> set in the config.
  </p>

  <h3 id="snippet">Snippet</h3>
  <pre>
&lt;script src="${WEBAPP_URL}/lex-web-ui-loader.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
  var loaderOpts = {
    baseUrl: '${WEBAPP_URL}/',
    shouldLoadMinDeps: true
  };
  var loader = new ChatBotUiLoader.IframeLoader(loaderOpts);
  loader.load()
    .catch(function (error) { console.error(error); });
&lt;/script&gt;
  </pre>

  <h3 id="origin-configuration">Origin Configuration</h3>
  <p>
    The values of the <code>iframeOrigin</code> and
    <code>parentOrigin</code> config fields determine where the iframe
    is loaded from and the parent origin that is authorized to load
    the iframe. The JSON config file is set to use the iframe with the
    following values:
  </p>
  <ul>
    <li><label>Iframe URL: </label><code id="iframe-url"></code></li>
    <li><label>Parent Origin <small>(if config is empty set to same
      origin)</small>: </label><code id="parent-origin"></code></li>
  </ul>

  <h3 id="json-file-config">JSON File Config</h3>
  <p>
    The JSON config file is fetched from:
    <a href="${WEBAPP_URL}/lex-web-ui-loader-config.json">
      ${WEBAPP_URL}/lex-web-ui-loader-config.json
    </a>. Here is its content:
  </p>
  <pre id="loader-config"></pre>

  <script>
    fetch('lex-web-ui-loader-config.json')
      .then(response => response.json())
      .then((config) => {
        const iframeOrigin =
          (config && 'iframe' in config && config.iframe.iframeOrigin) || '';
        const iframeSrcPath =
          (config && 'iframe' in config && config.iframe.iframeSrcPath) || '';
        document.getElementById('iframe-url').textContent =
          iframeOrigin + iframeSrcPath;

        const parentOrigin =
          (config && 'ui' in config && config.ui.parentOrigin) || window.location.origin;
        document.getElementById('parent-origin').textContent =
          parentOrigin;

        document.getElementById('loader-config').textContent =
          JSON.stringify(config, null, 2);
      })
      .catch(error => console.error(error));
  </script>
</body>
</html>
EOF
