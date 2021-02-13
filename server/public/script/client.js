console.log('Hello from js');

$(document).ready(onReady);

function onReady() {
  console.log('jQuery is running and ready');

  // Event handlers

  $(document).on('click', addToDoItem);
  $('#completeBtn').on('click', postToDoListItems);
  //
}

function addAToDoListItem(event) {
  event.preventDefault();
  // this is going to grab values from the DOM
  let grabOffDOM = {
    task: $('#taskInputBox').val(),
    complete: $('#completeBtn').val(),
    date: $('#dateInput').val(),
  };
  //

  $.ajax({
    type: 'POST',
    url: '/toDoList',
    data: grabOffDOM,
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
