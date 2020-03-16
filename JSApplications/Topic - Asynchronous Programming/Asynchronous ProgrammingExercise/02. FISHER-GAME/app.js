function attachEvents() {
    let buttons = {                                                  //getting the two buttons that are always at the page
        load: document.querySelector("body > aside > button"),
        add: document.querySelector("#addForm > button")
    }
    let htmlElementsWorkshop = {                                //html elements that I work with
        $mainField: document.querySelector("#main"),
        $catchesField: document.querySelector("#catches"),
        $exampleCatch: document.querySelector("#catches > div"),
        $addForm: document.querySelector("#addForm")
    };
    let loadFunc = async function (e) {                             //load functionality
        try {
            let response = await fetch('https://fisher-game.firebaseio.com/catches.json');
            if (response.status < 400) {
                let data = await response.json();
                if (!data) {                                                //if there arent any catches in the database, then alert is shown
                    alert('No catches found!');
                    return;
                } else {
                    let arrayWithKeys = Object.keys(data);
                    htmlElementsWorkshop.$catchesField.innerHTML = '';        //clearing the field, so it wont add catches that are already there, in case of spamming the load button
                    arrayWithKeys.forEach(key => {
                        let $newEl = htmlElementsWorkshop.$exampleCatch.cloneNode(true);    //cloning the example catch element
                        $newEl.setAttribute('data-id', `${key}`);                   //setting id, so I can use it easy later
                        Array.from($newEl.children).find(el => el.className === 'angler').value = `${data[key].angler}`;        //setting the catch info for every catch in the database
                        Array.from($newEl.children).find(el => el.className === 'weight').value = `${data[key].weight}`;
                        Array.from($newEl.children).find(el => el.className === 'species').value = `${data[key].species}`;
                        Array.from($newEl.children).find(el => el.className === 'location').value = `${data[key].location}`;
                        Array.from($newEl.children).find(el => el.className === 'bait').value = `${data[key].bait}`;
                        Array.from($newEl.children).find(el => el.className === 'captureTime').value = `${data[key].captureTime}`;
                        htmlElementsWorkshop.$catchesField.appendChild($newEl);
                    });
                }
            } else {
                throw (response);
            }
        } catch (error) {
            console.log(error);
        }
    }
    let addFunc = async function (e) {              // addding functionality
        try {
            let allInputFields = Array.from(htmlElementsWorkshop.$addForm.children).filter(el => el.tagName === 'INPUT'); // getting only the input fields
            let fieldEmpty = allInputFields.every(el => el.value !== '');    //check for empty fields, if any - show alert
            if (fieldEmpty) {
                let catchInfoObj = allInputFields.reduce((acc, el) => {     //again with reduce turn the input field values into an object
                    acc[el.className] = el.value;
                    el.value = '';
                    return acc;
                }, {});
                let response = await fetch('https://fisher-game.firebaseio.com/catches.json', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(catchInfoObj)
                });
                if (response.status < 400) {
                    buttons.load.click();           // in case of succes show alert
                    alert('You created a new catch!');
                } else {
                    throw (response);
                }
            } else {
                alert('All fields should be fullfilled!');  //alert is shown if not all the fields are fullfilled
                return;
            }
        } catch (error) {
            console.error(error.statusText);
        }
    }
    buttons.load.addEventListener('click', loadFunc);
    buttons.add.addEventListener('click', addFunc);
    buttons.load.click();                           //when the page loads, it automatically refreshes the catshes;


    let deleteFunc = async function (e) {               //deleting functionality
        if (e.target.className === 'delete') {              //I set the event listener on the whole catches section and when is clicked on delete, then the function starts working
            let neededKey = e.target.parentNode.getAttribute('data-id');
            try {
                let response = await fetch(`https://fisher-game.firebaseio.com/catches/${neededKey}.json`, {
                    method: 'delete'
                });
                if (response.status < 400) {
                    buttons.load.click();                   //reloading the catches
                    alert('You successfully deleted a catch!');         //showing alert, so the user will now that he succeded in deleting a catch
                    return;
                } else {
                    throw (response);
                }
            } catch (error) {
                console.error(error.statusText);
            }
        }
    }
    let updateFunc = async function (e) {           //updating functionality
        if (e.target.className === 'update') {
            try {
                let neededKey = e.target.parentNode.getAttribute('data-id');  // again I set the event listener on the whole catches field and when clicked on update, then start working
                let allInputs = Array.from(e.target.parentNode.children).filter(el => el.tagName === 'INPUT'); // getting only the input fields
                let emptyFieldCheck = allInputs.every(el => el.value !== '');
                if (emptyFieldCheck) {
                    let updatedInfoCatchObj = allInputs.reduce((acc, el) => {   //reduce is awesome. I use it to turn the input values to object
                        acc[el.className] = el.value;
                        return acc;
                    }, {});
                    let response = await fetch(`https://fisher-game.firebaseio.com/catches/${neededKey}.json`, {
                        method: 'put',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(updatedInfoCatchObj)
                    });
                    if (response.status < 400) {
                        buttons.load.click();
                        alert('You successfully updated the catch!');   //showing alert so the user knows that he succeded updating the catch
                        return;
                    } else {
                        throw (response);
                    }
                } else {
                    alert('All fields should be fullfilled!');
                    return;
                }
            } catch (error) {
                console.error(error.statusText);
            }
        }
    }
    htmlElementsWorkshop.$mainField.addEventListener('click', deleteFunc);
    htmlElementsWorkshop.$mainField.addEventListener('click', updateFunc);
}

attachEvents();

