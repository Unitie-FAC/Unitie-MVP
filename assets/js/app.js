  function hideNShow(){
        		$('#successMessage').addClass('hide');
        	    $('form')[0].reset();
        	    $('form').addClass('show');
  }



function successMessage(inputId, outputId) {

    document.getElementById(inputId).addEventListener("click", function(e) {

        var submitBtn = document.getElementById('submit').addEventlistenr;
        var output = document.getElementById(outputId);
        output.innerHTML = "";
        
          
   	    var inputs = $("form").find(':input');
     	var ArrInputs = Object.keys(inputs).slice(0, -4);
      	var requiredArr = [];
       	 
       	 ArrInputs.forEach(function(ele){
       	 	if (inputs[ele].className === 'form-control required'){
       	 		requiredArr.push(inputs[ele]); 
       	 	}
       	 });

       var  requiredEmpty = false;
       requiredArr.forEach(function(ele) {
            if (ele.value === '') {
        	   requiredEmpty = true;
        	   console.log('error');
       		}
        }); 
       	if (requiredEmpty === false){
        var message = "Thank you for registering your details, we'll be in contact shortly";
        var newEl = output.innerHTML += "<div id='successMessage' class='text-center'><h2>" + message + "</h2><button onclick='hideNShow()'>Register</butotn></a>";
        $('form').addClass('hide');
        }

      


    });



}

successMessage('submit', 'messageOut');
