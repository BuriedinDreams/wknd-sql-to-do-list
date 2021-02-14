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
  console.log(req.body.newTask.task);
  console.log(req.body.newTask.complete);
  console.log(req.body.newTask.date);

  let queryText = `INSERT INTO "todo_list" ("task", "complete", "date") 
  VALUES ($1, $2, $3 );`;

  let queryArgs = [
    req.body.newTask.task,
    req.body.newTask.complete,
    req.body.newTask.date,
  ];

  pool
    .query(queryText, queryArgs)
    .then(function (dbRes) {
      console.log('dbResults', dbRes); // this should be an object from the database
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log('Server side POST:', error);
      res.sendStatus(500);
    });
  //
  // res.sendStatus(200);
});

//
//
//
module.exports = ToDoListRouter;
