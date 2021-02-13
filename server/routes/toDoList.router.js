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
  let addedItem = req.body;

  console.log('adding new item', req.body);
  // need to add C.L's for below.
  // need to add req.body.task
  // need to add req.body.complete
  // need to add req.body.date
});
//
//
//
module.exports = router;
