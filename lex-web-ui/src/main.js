import './init'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { Loader as LexWebUi, Plugin } from './lex-web-ui.js';


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})

import { Buffer } from 'buffer'
global.Buffer = Buffer

const lexWebUi = new LexWebUi();

app.use(vuetify)
app.use(router)
app.use(lexWebUi.store)
app.use(Plugin, {
  config: mergedConfig,
  awsConfig,
  lexRuntimeClient,
  lexRuntimeV2Client,
  pollyClient
})
app.mount('#app')
