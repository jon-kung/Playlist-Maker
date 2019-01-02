/** Start server for spotify app. */

const app = require('./authorization_code/app');
const { PORT } = require('./config');

app.listen(PORT, function() {
  console.log(`Server starting on port ${PORT}!`);
});
