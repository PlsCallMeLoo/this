let  buttonstage = false;
$("#toggleButton").on("click", function() {
    // Toggle the class "active" and "inactive"
    $(this).toggleClass("active inactive");
  
    // Get the current text of the button
    const buttonText = $(this).text();
    buttonstage = buttonstage === "ON" ? false : true;  
    // Update the button text based on the current state
    if (buttonText === "ON") {
      $(this).text("OFF");
    } else {
      $(this).text("ON");
    }
  });
  