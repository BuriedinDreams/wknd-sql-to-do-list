const express = require('express');

const ToDoListRouter = express.Router();

// This is the DB connection
const pool = require('../modules/pool.js');

//

// need to make router.get | this second

// need to make router.put |aka update

// need to make router.post | work on this first
ToDoListRouter.post('/', function (req, res) {
  console.log('ServerSide-Post - Inside ToDoList Post');
  console.log('results of req.body:', req.body);
  let addedItem = req.body; // not sure if I need this right now.

  console.log('adding new item', req.body);
  // need to add C.L's for below.
  console.log(req.body.task);
  console.log(req.body.complete);
  console.log(req.body.date);

  let queryText = `INSERT INTO "todo_list" ("task", "complete", "date") 
  VALUES ($1, $2, $3 );`;

  let queryArgs = [req.body.task, req.body.complete, req.body.date];

  pool.query(queryText, queryArgs); // this is going to send the data to our DataBase.
});
//
//
//
module.exports = router;
