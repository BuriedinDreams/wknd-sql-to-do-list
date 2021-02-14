console.log('Hello from js');

$(document).ready(onReady);

function onReady() {
  console.log('jQuery is running and ready');

  // Event handlers
  $('#submitTaskBtn').on('click', addAToDoListItem);
  $('#appendListToDOM').on('.completedBtn', completedItem);
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
      $('#appendToDOM').append(`
        <tr>
          <td>${response[i].newTask.task}</td>
          <td>
            <button class="completedBtn" data-id="${response[i].id}">Task Completed!</button>
          </td>
        </tr>
      `);
    }
  });
}

function completedItem() {
  deleteItem($(this).data('id'));
}

function deleteItem() {
  // call AJAX to DELETE song;
  $.ajax({
    method: 'DELETE',
    url: `/toDoList/songs/${songId}`,
  })
    .then(function (response) {
      // refresh the music list
      getMusicData();
    })
    .catch(function (banana) {
      alert('Error on Deleting song.', banana);
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
      //
      // refreshfunction | have a function here to refresh.
    })
    .catch(function (error) {
      console.log('Error in POST', error);
      alert(
        'Woah, something bad happened to the ToDo List. Please try again later.'
      );
    });
}
