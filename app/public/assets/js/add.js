// The code in add.js handles what happens when the user clicks the "Add a user" button.

// When user clicks add-btn
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // Make a newBook object
  var newUser = {
    username: $("#username").val().trim(),
    model: $("#model").val().trim(),
    make: $("#make").val().trim(),
    color: $("#color").val().trim(),
    price: $("#price").val().trim(),
    swap: $("#swap").val().trim(),
    photo: $("#photo").val().trim(),
  };

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newUser)
    // On success, run the following code
    .done(function(data) {
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#username").val("");
  $("#model").val("");
  $("#make").val("");
  $("#color").val("");
  $("#price").val("");
  $("#swap").val("");
  $("#photo").val("");
});
