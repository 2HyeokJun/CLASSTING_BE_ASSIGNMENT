// server.js
const App = require('./app');
const app = App.app;
require('dotenv').config();
let port = 3000;


app.listen(port, function () {
  console.log("Express listening on port", port);
});