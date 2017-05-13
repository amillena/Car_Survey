// When user hits the car-search-btn
$("#car-search-btn").on("click", function(event) {
  event.preventDefault();

  // Save the book they typed into the car-search input
  var carSearched = $("#car-search").val().trim();

  // Make an AJAX get request to our api
  $.get("/api/" + carSearched, function(data) {

    console.log(data);
    // Call our renderCars function to add cars to the page
    renderCars(data);

  });

});

// When user hits the user-search-btn
$("#user-search-btn").on("click", function() {

  // Save the user they typed into the user-search input
  var userSearched = $("#user-search").val().trim();

  // Make an AJAX get request to our api
  $.get("/api/user/" + userSearched, function(data) {

    // Log the data to the console
    console.log(data);
    // Call our renderCars function to add cars to the page
    renderCars(data);

  });

});

// When user hits the make-search-btn
$("#make-search-btn").on("click", function() {

  // Save the book they typed into the make-search input
  var makeSearched = $("#make-search").val().trim();

  // Make an AJAX get request to our api
  $.get("/api/make/" + makeSearched, function(data) {

    console.log(data);
    // Call our renderCars function to add cars to the page
    renderCars(data);

  });

});

function renderCars(data) {
  if (data.length !== 0) {

    $("#stats").empty();
    $("#stats").show();

    for (var i = 0; i < data.length; i++) {

      var div = $("<div>");

      div.append("<h2>" + data[i].model + "</h2>");
      div.append("<p>User: " + data[i].username + "</p>");
      div.append("<p>Make: " + data[i].make + "</p>");
      div.append("<p>Color: " + data[i].color + "</p>");
      div.append("<p>Price: " + data[i].price + "</p>");
      div.append("<img id='carPhoto' src="+data[i].photo+">");
      div.append("<br>");
      div.append("<button class='delete' data-id='" + data[i].id + "'>DELETE CAR</button>");

      $("#stats").append(div);

    }

    $(".delete").click(function() {

      var info = {
        id: $(this).attr("data-id")
      };

      $.post("/api/delete", info)
        // On success, run the following code
        .done(function(deldata) {
          // Log the data 
          console.log(deldata);
          console.log("Deleted Successfully!");
        });

      $(this).closest("div").remove();

    });

  }
}
