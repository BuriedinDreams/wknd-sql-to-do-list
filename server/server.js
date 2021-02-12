const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('sever/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log('TODO-list server listening on port ', port);
});
