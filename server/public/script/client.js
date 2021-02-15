console.log('Hello from js');

$(document).ready(onReady);

function onReady() {
  console.log('jQuery is running and ready');
  getTasks(); // this is going to show the append everything on start.
  // Event handlers
  $('#submitTaskBtn').on('click', addAToDoListItem);
  $('#appendListToDOM').on('click', '.deleteBtn', deleteItem);
  $('#appendListToDOM').on('click', '.taskComplete', updateItems);
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

    // let taskToComplete = $('.taskComplete');
    // console.log('GET taskComplete', taskToComplete);

    for (let i = 0; i < response.length; i++) {
      let addColorGreen = ''; // this is to reset after I've clicked a Task Complete

      // completeTaskGreen style css

      if (response[i].complete === true) {
        // this will change to true once user clicks task complete
        addColorGreen = 'completeTaskGreen';
      }

      $('#appendListToDOM').append(`
        <tr class="${addColorGreen}">
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
  console.log('Delete-SIDE deleteTask', deleteTask);

  // call AJAX to DELETE task "with id";
  $.ajax({
    method: 'DELETE',
    url: `/toDoList/delete/${deleteTask}`,
  })
    .then(function (response) {
      // refresh the task list.
      console.log('client-side-delete response', response);
      getTasks();
    })
    .catch(function (error) {
      alert('Error on Deleting items.', error);
    });
}

function updateItems() {
  console.log('Inside updateItems func clientSIDE');
  const completeTaskID = $(this).data('id');
  $.ajax({
    type: 'PUT',
    url: `/toDoList/put/${completeTaskID}`,
  })
    .then(function (response) {
      getTasks();
    })
    .catch(function (error) {
      console.log('CLIENT-Put-Update-Items - an error occurred ', error);
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
