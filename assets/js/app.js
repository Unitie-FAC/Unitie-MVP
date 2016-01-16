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


