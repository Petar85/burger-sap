// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".create-form").on("submit", function(event) {
      event.preventDefault();
      
  
      var newBurger= {
        burger_name: $("#newburger")
          .val()
          .trim(),
          devoured: 0
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: devouredState
      }).then(
        function() {
          console.log("burger devoured");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".eatburger").on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var id = $(this).data("id");
      var devouredState = {
        devoured: 1
      };
    });
  
      // Send the POST request.
      $.ajax("/api/cats", {
        type: "POST",
        data: newCat
      }).then(
        function() {
          console.log("created new cat");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    
  
    $(".trashburger").on("click", function(event) {
      event.preventDefault();

      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax({
        type: "DELETE"
        url: "/api/burgers/" + id
      }).then(location.reload());
        
      
    });
});
  