/** Start server for spotify app. */

// app will be using client credentials to authorize
const app = require('./client_credentials/app');
const { PORT } = require('./config');

app.listen(PORT, function() {
  console.log(`Server starting on port ${PORT}!`);
});
