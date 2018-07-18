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
          <v-alert
            :value="updateSuccess"
            type="success"
          >
            Your profile has been successfully updated! Please log out and log back in to see updates.
          </v-alert>
          <v-alert
            :value="updateFail"
            type="error"
          >
            There was an error with your request. Please try again later.
          </v-alert>
          <v-form>
            <div v-for="(value, key) in userAttributes">
              <v-text-field
                v-model="userAttributes[key]"
                :label="key"
                box
              ></v-text-field>
            </div>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
</template>
<script>
import AWS from 'aws-sdk';

const cisp = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' });

export default {
  name: 'profile-container',
  data() {
    return {
      firstName: 'Test',
      lastName: '',
      email: '',
      payload: JSON.parse(localStorage.getItem('payload')),
      tokens: '',
      forgotPasswordUrl: this.$store.state.config.cognito.forgotPasswordUrl,
      userAttributes: {},
      updateSuccess: false,
      updateFail: false,
    };
  },
  props: ['showProfilePage'],
  methods: {
    getUserProfile() {
      if (this.payload !== null) {
        this.tokens = JSON.parse(localStorage.getItem('tokens'));
        const params = {
          AccessToken: this.tokens.access_token,
        };
        // eslint-disable-next-line no-console
        // console.log(params);
        cisp.getUser(params, (err, data) => {
          if (err) {
            return err.stack;
          }
          // eslint-disable-next-line no-console
          // console.log('Inside Method: ', data.UserAttributes[0]);
          for (let i = 0; i < data.UserAttributes.length; i += 1) {
            if (data.UserAttributes[i].Name !== 'sub' && data.UserAttributes[i].Name !== 'email_verified') {
              const key = data.UserAttributes[i].Name;
              const value = data.UserAttributes[i].Value;
              this.userAttributes[key] = value;
            }
          }
          // eslint-disable-next-line no-console
          console.log('User info: ', this.userAttributes);
          return 'Done';
        });
      }
      // eslint-disable-next-line no-console
      console.log('Payload: ', this.payload['cognito:username']);
    },
    hideProfilePage() {
      this.$store.commit('showProfilePage', false);
    },
    updateProfile() {
      const names = Object.keys(this.userAttributes);
      const values = Object.values(this.userAttributes);
      for (let i = 0; i < names.length; i += 1) {
        const params = {
          AccessToken: this.tokens.access_token,
          UserAttributes: [
            {
              Name: names[i],
              Value: values[i],
            },
            /* more items */
          ],
        };
        // eslint-disable-next-line no-console
        console.log('Params: ', params);
        cisp.updateUserAttributes(params, (err, data) => {
          if (err) {
            // eslint-disable-next-line no-console
            console.log(err, err.stack);
            this.updateFail = true;
          } else {
            // eslint-disable-next-line no-console
            console.log('Data: ', data);
            this.updateSuccess = true;
          }
        });
      }
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