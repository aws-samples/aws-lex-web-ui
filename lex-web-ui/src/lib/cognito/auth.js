/* eslint-disable */
import qs from 'qs';
import axios from 'axios';

var auth = {
  getTokens() {
    // Pull url from window
    const parsedUrl = new URL(window.location.href);
    
    // If loggedIn exists and equals true then continue with auth
    const loggedIn = parsedUrl.searchParams.get('loggedIn');
    if (loggedIn) {
      // Change the value of isLoggedIn in the store to true
      // $store.state.config.ui.isLoggedIn = loggedIn;
  
      // Pull client id from store
      // const client_id = $store.state.config.cognito.clientId;

      // Parse out the "code" portion of the URL
      const code = parsedUrl.searchParams.get('code');
  
      // Send the code to the token endpoint and get tokens back
      const HTTP = axios.create({
        baseURL: 'https://devdomain.auth.us-east-1.amazoncognito.com',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      HTTP.post('/oauth2/token', qs.stringify({
        'grant_type': 'authorization_code',
        'client_id': '1hahktbgun8cr14qsul3cshjt8',
        'redirect_uri': 'https://61c36c3e11d347748bfd7560cb34a67e.vfs.cloud9.us-east-1.amazonaws.com/',
        'code': code,
      }))
        .then(response => {
          console.log('Response: ' + response);
        })
        .catch(e => {
          console.log('Error: ' + e);
        })
        //console.log("The post data is: " + qs.stringify(httpData));
    } else {
      // eslint-disable-next-line no-console
      console.log('No one is logged in....');
      // change the store to false to handle logouts
    }
  }
}

// Put tokens in store

// Redirect back to main page

export default auth;
