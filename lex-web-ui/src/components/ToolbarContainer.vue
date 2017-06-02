<template>
  <v-toolbar v-bind:class="toolbarColor">
    <img v-bind:src="toolbarLogo">
    <v-toolbar-title class="hidden-xs-and-down white--text">
      {{ toolbarTitle }}
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      v-tooltip:left="toggleExpandToolTip"
      v-on:click.native="toggleExpand"
      v-if="$store.state.isRunningEmbedded"
      icon
      light
    >
      <v-icon>
        {{ expandUi ? 'arrow_drop_down' : 'arrow_drop_up' }}
      </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'toolbar-container',
  props: ['toolbarTitle', 'toolbarColor', 'toolbarLogo', 'expandUi'],
  computed: {
    toggleExpandToolTip() {
      return {
        html: (this.expandUi) ? 'minimize' : 'maximize',
      };
    },
  },
  methods: {
    toggleExpand() {
      this.$emit('toggleExpandUi');
    },
  },
};
</script>

<style scoped>
/* overriding xs to 360px */
@media only screen and (max-width: 360px) {
  .hidden-xs-and-down {
    display: none!important;
  }
}

.toolbar {
  min-height: 48px;
}
</style>
