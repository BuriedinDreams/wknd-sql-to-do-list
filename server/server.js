const express = require('express');
const app = express();

app.use(express.static('server/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route will go here
let toDoList = require('./routes/toDoListRouter.js');
app.use('/toDoList', toDoList); // toDoList is the base routes going forward.

const port = 5002;
app.listen(port, function () {
  console.log('TODO-list server listening on port ', port);
});
