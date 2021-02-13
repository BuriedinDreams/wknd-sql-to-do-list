console.log('Hello from js');

$(document).ready(onReady);

function onReady() {
  console.log('jQuery is running and ready');

  // Event handlers

  $(document).on('click', addToDoItem);
}

function addToDoItem() {
  //get user input and put it into an object.

  let taskCreated = {
    task: // $(nameofID).val()
    complete: 
    date: 
  };

  //
}






function addAToDoListItem(AddedTask) {
  $.ajax({
    type: 'POST',
    url: '/toDoList',
    data: AddedTask,
  })
    .then(function (response) {
      console.log('Response from server.', response);
      // refreshfunction | have a function here to refresh.
    })
    .catch(function (error) {
      console.log('Error in POST', error);
      alert(
        'Unable to add an item to the ToDo List. Please try again later.'
      );
    });
}




