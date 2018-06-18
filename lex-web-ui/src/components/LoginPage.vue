<template>
    <v-layout row justify-center>

      <v-dialog v-model="showLoginForm" fullscreen transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark class="primary">
            <v-btn icon @click.native="hideLoginForm" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="hideLoginForm">Login</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-form>
            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              required
            ></v-text-field>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
</template>
    


<script>
export default {
  name: 'login-container',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  props: ['showLoginForm'],
  methods: {
    hideLoginForm() {
      this.$store.state.config.ui.showLoginForm = false;
    },
  },
};
</script>
<style type="text/css">
  .input-group {
    width: 80%;
    margin-left: 10%;
  }
</style>