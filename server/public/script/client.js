console.log('Hello from js');

$(document).ready(onReady);

function onReady() {
  console.log('jQuery is running and ready');

  // Event handlers
  $('#completeBtn').on('click', addAToDoListItem);
  //
}

function getTasks() {
  console.log('inside of getTasks');
  $('#viewKoalas').empty();

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
          <td>${response[i].newTask.complete}</td>
          <td>${response[i].newTask.date}</td>
          <td>
            <button class="completedBtn" data-id="${response[i].id}">Completed!</button>
          </td>
        </tr>
      `);
    }
  });
}

function addAToDoListItem(event) {
  event.preventDefault();
  // this is going to grab values from the DOM
  let grabOffDOM = {
    task: $('#taskInputBox').val(),
    complete: $('#completeBtn').val(),
    date: $('#dateInput').val(),
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
      $('#taskInputBox').val(''),
        $('#completeBtn').val(''),
        $('#dateInput').val('');
      // refreshfunction | have a function here to refresh.
    })
    .catch(function (error) {
      console.log('Error in POST', error);
      alert(
        'Woah, something bad happened to the ToDo List. Please try again later.'
      );
    });
}
