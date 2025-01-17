<template>
  <v-app id="lex-web" class="main-container">
    <tab-container />
    <!-- <chat /> -->
  </v-app>
</template>

<script>
/*
Copyright 2017-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

import TabContainer from "@/components/TabContainer";
import Chat from "@/components/Chat";

export default {
  name: "LexWeb",
  components: {
    TabContainer,
    Chat,
  },
  data() {
    return {};
  },
};
</script>

<style>
/*
The Vuetify toolbar height is based on screen width breakpoints
The toolbar can be 48px, 56px and 64px.
It is fixed to 48px when using 'dense'

The message list is placed between the toolbar at the top and input
container on the bottom. Both the toolbar and the input-container
dynamically change height based on width breakpoints.
So we duplicate the height and substract it from the total height
of the message list to make it fit between the toolbar and input container

NOTE: not using var() for different heights due to IE11 compatibility
*/
.main-container {
  background-color: transparent !important;
  border: none !important;
}

.v-application__wrap {
  min-height: 100vh !important;
}

.lex-web-ui-iframe iframe {
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.4) !important;
  border-radius: 0px !important;
}
</style>
