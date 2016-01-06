function getAutocomplete(userInputId, acOutputId) {

    document.getElementById(userInputId).addEventListener("keyup", function(e) {
        var userInput = document.getElementById(userInputId).value;
         console.log('Test',userInput);
         sendInputToRequestWords(userInput, acOutputId);


    });

    function sendInputToRequestWords(userInput, acOutputId) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                var universitiesArray = request.responseText;
                console.log(universitiesArray);
                var universitiesDiv = document.getElementById(acOutputId);
                universitiesDiv.innerHTML = '';

               /* universitiesArray.forEach(function(word) {
                    universitiesDiv.innerHTML += '<p class="" onclick="fillInput(\'' + word + '\',\''+userInputId+'\',\''+acOutputId+'\')">' + word + '</p>';

                });
*/
            }
        };
        request.open("GET", "/autocomplete/" + userInput, true);
        request.send();

    }
}

function fillInput(word, userInputId, acOutputId) {
    document.getElementById(acOutputId).innerHTML ='';
    document.getElementById(userInputId).value = word;
}


getAutocomplete('university','universityAcList');
