console.log('Hello from js');

$(document).ready(onReady);

function onReady() {
  console.log('jQuery is running and ready');

  // Event handlers
  $('#submitTaskBtn').on('click', addAToDoListItem);
  $('#appendListToDOM').on('click', '.deleteBtn', deleteItem);
  $('appendListToDOM').on('click', '.taskComplete', updateItems);
  //
}

function getTasks() {
  console.log('inside of getTasks');
  $('#appendListToDOM').empty();

  $.ajax({
    type: 'GET',
    url: '/toDoList',
  }).then(function (response) {
    console.log('check response', response);
    //append to DOM
    /*
    rename add_koala button 
    rename delete_koala button
    */
    for (let i = 0; i < response.length; i++) {
      $('#appendListToDOM').append(`
        <tr>
          <td>${response[i].task}</td>
          <td>
            <button class="taskComplete" data-id="${response[i].id}">Task Complete!</button>
          </td>
          <td>
            <button class="deleteBtn" data-id="${response[i].id}">Delete Task!</button>
          </td>
        </tr>
      `);
    }
  });
}

function deleteItem() {
  const deleteTask = $(this).data('id');
  console.log('GET-SIDE deleteTask', deleteTask);

  // call AJAX to DELETE task "with id";
  $.ajax({
    method: 'DELETE',
    url: `/toDoList/delete/${deleteTask}`,
  })
    .then(function (response) {
      // refresh the task list.
      console.log('client-side response', response);
      getTasks();
    })
    .catch(function (error) {
      alert('Error on Deleting song.', error);
    });
}

function updateItems() {
  const completeTaskID = $(this).data(`id`);
  $.ajax({
    type: 'PUT',
    url: `/toDoList/put/${completeTaskID}`,
  })
    .then(function (response) {
      getTasks();
    })
    .catch(function (error) {
      console.log('CLIENT - an error occurred ', error);
    });
}

function addAToDoListItem(event) {
  event.preventDefault();
  // this is going to grab values from the DOM
  let grabOffDOM = {
    task: $('#taskInputBox').val(),
  };

  $.ajax({
    type: 'POST',
    url: '/toDoList',
    data: {
      newTask: grabOffDOM,
    },
  })
    .then(function (response) {
      console.log('Response from server.', response);
      $('#taskInputBox').val('');
      // have getTasks func here to refresh the screen.
      getTasks();
    })
    .catch(function (error) {
      console.log('Error in POST', error);
      alert(
        'Woah, something bad happened to the ToDo List. Please try again later.'
      );
    });
}
