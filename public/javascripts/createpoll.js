var opNum = 4;
var actual = 3;

$(document).ready(function() {
  $(".add").click(function() {
    var txt1 =
      "<input class='form-control no-border create-poll-box' name='option" +
      opNum +
      "' id='option" +
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

function addNewOptionBox() {
  var txt1 =
    "<input class='form-control no-border create-poll-box' name='option" +
    opNum +
    "' id='option" +
    opNum +
    "'type='text' placeholder='option' required>"; // Create element with HTML
  var txt2 = $("<p></p>").text("Text."); // Create with jQuery
  var txt3 = document.createElement("p"); // Create with DOM
  txt3.innerHTML = "Text.";
  $(".more").append(txt1);
  opNum += 1;
  actual += 1;
}

function isEmpty(e) {
  console.log(e.name);
  console.log(e);
  if (e.value === "") {
    deleteLastOptionBox(e.name);
  } else {
    document.getElementById(e.name).removeAttribute("onfocus");
    document.getElementById(e.name).removeAttribute("onfocusout");
  }
}

function deleteLastOptionBox(name) {
  let clickedOptionNum = Number(name[name.length - 1]);
  let nextOption = "option" + (clickedOptionNum + 1);
  console.log(nextOption);
  opNum -= 1;
  actual -= 1;
  document.getElementById(nextOption).remove();
}
