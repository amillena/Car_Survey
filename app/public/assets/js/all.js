
// Make a get request to our api route that will return every book
$.get("/api/all", function(data) {
  // For each user that our server sends back
  for (var i = 0; i < data.length; i++) {
    // Creates a parent div to hold book user
    var wellSection = $("<div>");
    // Adds a class to this div: 'well'
    wellSection.addClass("well");
    // Adds an id to the well to mark which well it is
    wellSection.attr("id", "user-well-" + i);
    // Appends the well to the well section
    $("#well-section").append(wellSection);

    // Adding user data to the well placed on the page
    $("#user-well-" + i).append("<h2>" + (i + 1) + ". " + data[i].username + "</h2>");
    $("#user-well-" + i).append("<h3>Model: " + data[i].model + "</h4>");
    $("#user-well-" + i).append("<h3>Make: " + data[i].make + "</h4>");
    $("#user-well-" + i).append("<h3>Color: " + data[i].color + "</h4>");
    $("#user-well-" + i).append("<h3>Price: " + data[i].price + "</h4>");
    $("#user-well-" + i).append("<img id='carPhoto'height='300' width='400' src="+data[i].photo+">");

  }
});
