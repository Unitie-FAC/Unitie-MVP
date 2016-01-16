
function successMessage(inputId, outputId){

  document.getElementById(inputId).addEventListener("click", function(e) {

	var message ="Thank you for registering your details, we'll be in contact shortly";
    var submitBtn = document.getElementById('submit').addEventlistenr;
    var output = document.getElementById(outputId);
        output.innerHTML="";
    var newEl   = output.innerHTML += "<h2>"+message+"</h2>";
    $('form').addClass('hide');
    });



}

successMessage('submit','messageOut');