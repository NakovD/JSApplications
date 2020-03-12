function attachEvents() {
    let $authorNameField = document.querySelector("#author");           
    let $messageField = document.querySelector("#content");
    let $sendButton = document.querySelector("#submit");
    let $refreshButton = document.querySelector("#refresh");
    let $textArea = document.querySelector("#messages");                // getting buttons and fields that I'm going to use
    let sendFunc = function(e) {                                //send mssg Func
        if ($authorNameField.value === '' || $messageField.value === '') {      //verifying that there is a message and also an author name
            return;
        }
        let infoToAddToDataBase = {
            author: $authorNameField.value,
            content: $messageField.value
        }
        fetch('https://rest-messanger.firebaseio.com/messanger.json',{                  //post request
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(infoToAddToDataBase)
        })
        $authorNameField.value = '';                                                //clearing fields
        $messageField.value = '';
    }
    $sendButton.addEventListener('click',sendFunc);
    $refreshButton.addEventListener('click',function() {                        //refresh button Func
        fetch('https://rest-messanger.firebaseio.com/messanger.json')
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (!data) {                                //!!!this is not in the condition. If there is not any messages in the database, Alert is shown
                    alert('No log to show!');
                    return;
                }
                if($textArea.textContent.length > 0) {              //Clearing the textArea, so if you click more than once on refresh it wont add the same messagess again
                    $textArea.textContent = '';
                }
                let allUniqueKeys = Object.keys(data)
                allUniqueKeys.forEach(key => {
                    $textArea.textContent += `${data[key].author}: ${data[key].content}\n`;
                });
            })
    });
}
attachEvents();