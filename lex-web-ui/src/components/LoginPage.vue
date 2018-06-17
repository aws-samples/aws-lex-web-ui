<template>
    <v-layout row justify-center>

      <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark class="primary">
            <v-btn icon @click.native="dialog = false" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="dialog = false">Login</v-btn>
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
            dialog: false,
            email: '',
            password: ''
        }
    }
}
</script>