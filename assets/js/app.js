  function hideNShow(hideEl, showEl) {

      var inputs = $("form").find(':input');
      var ArrInputs = Object.keys(inputs).slice(0, -4);
      var requiredArr = [];

      ArrInputs.forEach(function(ele) {
          if (inputs[ele].className === 'form-control required') {
              requiredArr.push(inputs[ele]);
          }
      });

      var requiredEmpty = false;
      requiredArr.forEach(function(ele) {
          if (ele.value === '') {
              requiredEmpty = true;
              console.log('error');
          }
      });
      if (requiredEmpty === false) {
          $(hideEl).removeClass('show');
          $(hideEl).addClass('hide');
          $(showEl).removeClass('hide');
          $(showEl).addClass('show');

      }
 }



      /*function successMessage(inputId, outputId) {

          document.getElementById(inputId).addEventListener("click", function(e) {

              var submitBtn = document.getElementById('submit').addEventlistenr;
              var output = document.getElementById(outputId);
              output.innerHTML = "";
              
                
         	  
             	$('form').addClass('hide');
             	$('#successMessage').addClass('hide');
              var message = "Thank you for registering your details, we'll be in contact shortly";
              var newEl = output.innerHTML += "
           
              }

            


          });



      }

      //successMessage('submit', 'messageOut');
      */
