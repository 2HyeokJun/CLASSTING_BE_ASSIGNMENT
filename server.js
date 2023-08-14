// server.js
const app = require('./app');
require('dotenv').config();
let port = 3000;

app.listen(port, function () {
  console.log("Express listening on port", port);
});