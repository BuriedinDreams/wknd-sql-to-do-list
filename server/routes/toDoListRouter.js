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
      console.log('response from req.body GET-SIDE', req.body);
      // res.sendStatus(200);

      res.send(dbRes.rows); // this is going to send to client side the table rows from the database.
      //
    })
    .catch(function (error) {
      console.log('GET SERVER-Side error', error);
      res.sendStatus(500);
    });
});

// need to make router.delete
ToDoListRouter.delete('/delete/:id', function (req, res) {
  console.log('DELETE-SERVER-SIDE');

  let taskID = req.params.id;
  console.log('Delete request id', taskID);

  let queryText = 'DELETE FROM "todo_list" WHERE "id"=$1';

  pool
    // passes in taskID to server
    .query(queryText, [taskID])
    .then((result) => {
      console.log('Deleting a task with id:', taskID);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error deleting a task`, error);
      res.sendStatus(500);
    });
});

// need to make router.put |aka update
ToDoListRouter.put('/put/:id', (req, res) => {
  // PASS IN AN ID
  console.log('req.body ', req.body);
  console.log('req.params ', req.params);
  console.log('SERVER - PUT inside /toDoList/put');
  let taskUpdate = req.params.id;
  let queryText = `UPDATE ""todo_list"" SET "todo_list"=TRUE WHERE "id"=$1`;
  console.log('incoming task with id:', taskUpdate);

  pool
    // passes in taskUpdate to server
    .query(queryText, [taskUpdate])
    .then((result) => {
      console.log('Updating tasks with id:', taskUpdate);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error updating koala as ready to transfer`, error);
      res.sendStatus(500);
    });
});

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
