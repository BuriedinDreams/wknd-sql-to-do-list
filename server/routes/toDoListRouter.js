const express = require('express');

const ToDoListRouter = express.Router();

// This is the DB connection
const pool = require('../modules/pool.js');

//

// need to make router.get | this second
ToDoListRouter.get('/', function (req, res) {
  pool
    .query('SELECT * FROM "todo_list" ')
    .then(function (dbRes) {
      // dbResults | this is going to return an object.
      console.log('response from dbRes', dbRes);
      console.log('response from req.body', req.body);
      // res.sendStatus(200);

      res.send(dbRes.rows); // this is going to send to client side the table rows from the database.
      //
    })
    .catch(function (error) {
      console.log('GET SERVER-Side error', error);
      res.sendStatus(500);
    });
});
// need to make router.put |aka update

// need to make router.post | work on this first
ToDoListRouter.post('/', function (req, res) {
  console.log('ServerSide-Post - Inside ToDoList Post');
  console.log('results of req.body:', req.body);
  let addedItem = req.body; // not sure if I need this right now.

  console.log('adding new item', req.body);
  // need to add C.L's for below.
  console.log(req.body.newTask.task);
  // console.log(req.body.newTask.complete);

  let queryText = `INSERT INTO "todo_list" ("task") 
  VALUES ($1);`;

  let queryArgs = [req.body.newTask.task];

  pool
    .query(queryText, queryArgs)
    .then(function (dbRes) {
      console.log('dbResults', dbRes); // this should be an object from the database
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log('POST SERVER SIDE ERROR ', error);
      res.sendStatus(500);
    });
  //
  //
});

//
//
//
module.exports = ToDoListRouter;
