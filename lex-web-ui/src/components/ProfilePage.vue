<template>
    <v-layout row justify-center>
      <v-dialog v-model="showProfilePage" fullscreen transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar app dark dense fixed class="primary">
            <v-btn icon @click.native="hideProfilePage" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
              <v-btn 
                small
                @click="changePassword">
                Change Password
              </v-btn>
              <v-btn 
                small
                @click="updateProfile">
                Update Profile
              </v-btn>
          </v-toolbar>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Profile</h3>
            </div>
          </v-card-title>
          <v-form>
            <v-text-field
              v-model="firstName"
              label="First Name"
              box
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              label="Last Name"
              box
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email Address"
              box
            ></v-text-field>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
</template>
<script>
export default {
  name: 'profile-container',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      payload: '',
      forgotPasswordUrl: this.$store.state.config.cognito.forgotPasswordUrl,
    };
  },
  props: ['showProfilePage'],
  methods: {
    getUserProfile() {
      this.payload = JSON.parse(localStorage.getItem('payload'));
      this.firstName = this.payload.given_name;
      this.lastName = this.payload.family_name;
      this.email = this.payload.email;
    },
    hideProfilePage() {
      this.$store.commit('showProfilePage', false);
    },
    updateProfile() {
      // eslint-disable-next-line no-console
      console.log('Need update functionality built here.');
    },
    changePassword() {
      window.location.replace(this.forgotPasswordUrl);
    },
  },
  created() {
    this.getUserProfile();
  },
};
</script>
<style type="text/css">
  .input-group {
    width: 80%;
    margin-left: 10%;
  }
</style>