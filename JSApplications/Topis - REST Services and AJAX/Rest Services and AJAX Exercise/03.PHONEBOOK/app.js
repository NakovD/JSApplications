function attachEvents() {
    let $loadBttn = document.querySelector("#btnLoad");                 //firstPart - loading and deleting code 
    let $ulPhoneBook = document.querySelector("#phonebook");            //getting LoadBttn and actuall PhoneBook
    let loadFunc = function (e) {
        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json')
            .then(response => response.json())
            .then(data => {
                if (!data) {                                            //checking if no contacts to return message
                    Array.from($ulPhoneBook.children).forEach(child => child.remove());     //clearing the PhoneBookField
                    alert('Sorry! You have no contacts in your phone book.');               //Alert
                    return;
                }
                if ($ulPhoneBook.childElementCount > 0) {
                    Array.from($ulPhoneBook.children).forEach(child => $ulPhoneBook.removeChild(child));    //for Every Load click I decided to refresh the phoneBook field, so it add info, that is already there
                }
                let allPhones = Object.keys(data);
                allPhones.forEach(key => {                                              //Adding every contact
                    let $newLiEl = document.createElement('li');
                    $newLiEl.textContent = `${data[key].person}: ${data[key].phone}`;
                    $newLiEl.setAttribute('keyForHTTP', `${key}`);                      //I wanted to have access to the key of the contact at any time, so I put it in the html element as attribute, so later when I delete it, to have access to it easier
                    let $deleteBttn = document.createElement('button');
                    $deleteBttn.textContent = 'Delete';
                    $newLiEl.appendChild($deleteBttn);
                    $ulPhoneBook.appendChild($newLiEl);
                });
            });
    }                                                                   
    $loadBttn.addEventListener('click', loadFunc);                      
    $ulPhoneBook.addEventListener('click', function (e) {
        if (e.target.textContent === 'Delete') {
            let keyOfCurrentEl = e.target.parentNode.getAttribute('keyforhttp');        //accessing the key from the html attribute
            fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${keyOfCurrentEl}.json`, {
                method: 'delete'
            });
        }
    });
    let $createBttn = document.querySelector("#btnCreate");            // SecondPart - here starts my logic for creating contacts
    let $personField = document.querySelector("#person");
    let $phoneField = document.querySelector("#phone");
    let createFunc = function (e) {
        let phoneFieldNumbersCheck = false;                         //here I do something which is not in the condition, but I really wanted to do: checking the info from the input fields
        let arrayWithSymbols = $phoneField.value.split('');         // I take the number input and I make sure there arent unallowed symbols in it except:( space, +, numbers) using ASCI codes
        arrayWithSymbols.forEach(sym => {                           // and if there are any unallowed symbols the phone number is invalid
            let availableCharCodes = [32, 43, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,]
            if (!availableCharCodes.includes(sym.charCodeAt())) {
                phoneFieldNumbersCheck = true;
            }
        });
        if ($personField.value === '' || $phoneField.value === '' || phoneFieldNumbersCheck) {
            $personField.value = '';
            $phoneField.value = '';
            return;
        }
        let newContact = {
            person: $personField.value,
            phone: $phoneField.value
        }
        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json', {                //sending post request to add new contact after the info is verified
            method: 'post',
            body: JSON.stringify(newContact)
        })
        loadFunc();
        $personField.value = '';                                            //clearing the fields
        $phoneField.value = '';
    }
    $createBttn.addEventListener('click', createFunc);
}
attachEvents();