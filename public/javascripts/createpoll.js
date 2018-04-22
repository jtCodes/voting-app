$(document).ready(function() {
  var opNum = 4;
  var actual = 3;
  $(".add").click(function() {
    var txt1 =
      "<input class='form-control no-border' name='option" +
      opNum +
      "'type='text' placeholder='option' required>"; // Create element with HTML
    var txt2 = $("<p></p>").text("Text."); // Create with jQuery
    var txt3 = document.createElement("p"); // Create with DOM
    txt3.innerHTML = "Text.";
    $(".more").append(txt1);
    opNum += 1;
    actual += 1;
  });

  $("input[name='option" + actual + "']").on("propertychange input", function(
    e
  ) {
    var valueChanged = false;

    if (e.type == "propertychange") {
      valueChanged = e.originalEvent.propertyName == "value";
    } else {
      valueChanged = true;
    }
    if (valueChanged) {
      console.log("changes");
    }
  });
});
