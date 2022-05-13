// Usage: npm start
// Used for local serving and quick dev/testing of the prebuilt files.
// For heavy development, you should instead use the `npm run dev` command
// under the lex-web-ui dir
const express = require('express');
const path = require('path');

const port = process.env.PORT || 8000;
const publicPath = '/';

const distDir = path.join(__dirname, 'dist');
const configDir = path.join(__dirname, 'src/config');
const app = express();

app.use(publicPath, express.static(configDir));
app.use(publicPath, express.static(distDir));

app.listen(port, function () {
  console.log(`App listening on: http://localhost:${port}`);
});
