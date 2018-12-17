var opNum = 4;
var actualOpNum = 3;

$(document).ready(function() {
  $(".add-option-btn").click(function() {
    addNewOptionBox();
  });

  $("input[name='option" + actualOpNum + "']").on("propertychange input", function(
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

  $(".add-img-btn").click(function() {
    addImg();
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
  actualOpNum += 1;
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
  actualOpNum -= 1;
  document.getElementById(nextOption).remove();
}

function addImg() {
  var imgHtml = '<img src="https://i.kym-cdn.com/photos/images/original/001/385/566/974.png" alt="example-image" class="img-rounded img-responsive poll-image" onload="alert("finished!");">';
  $(".poll-image-container").append(imgHtml);
  console.log("add imng");
}
