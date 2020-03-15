function attachEvents() {
    let buttons = {
        load: document.querySelector("body > aside > button"),
        add: document.querySelector("#addForm > button")
    }
    let htmlElementsWorkshop = {
        $mainField: document.querySelector("#main"),
        $catchesField: document.querySelector("#catches"),
        $exampleCatch: document.querySelector("#catches > div"),
        $addForm: document.querySelector("#addForm")
    };
    let loadFunc = async function (e) {
        try {
            let response = await fetch('https://fisher-game.firebaseio.com/catches.json');
            if (response.status < 400) {
                if (!response) {
                    alert('No catches found!');
                    return;
                }else {
                    let data = await response.json();
                    let arrayWithKeys = Object.keys(data);
                    htmlElementsWorkshop.$catchesField.innerHTML = '';
                    arrayWithKeys.forEach(key => {
                        let $newEl = htmlElementsWorkshop.$exampleCatch.cloneNode(true);
                        $newEl.setAttribute('data-id', `${key}`);
                        Array.from($newEl.children).find(el => el.className === 'angler').value = `${data[key].angler}`;
                        Array.from($newEl.children).find(el => el.className === 'weight').value = `${data[key].weight}`;
                        Array.from($newEl.children).find(el => el.className === 'species').value = `${data[key].species}`;
                        Array.from($newEl.children).find(el => el.className === 'location').value = `${data[key].location}`;
                        Array.from($newEl.children).find(el => el.className === 'bait').value = `${data[key].bait}`;
                        Array.from($newEl.children).find(el => el.className === 'captureTime').value = `${data[key].captureTime}`;
                        htmlElementsWorkshop.$catchesField.appendChild($newEl);
                    });
                }
            }else {
                throw(response);
            }
        } catch (error) {
            console.log(error);
        }
    }
    let deleteFunc = async function (e) {
        if (e.target.className === 'delete') {
            let neededKey = e.target.parentNode.getAttribute('data-id');
            try {
                let response = await fetch(`https://fisher-game.firebaseio.com/catches/${neededKey}.json`, {
                    method: 'delete'
                });
                if (response.status < 400) {
                    buttons.load.click();
                    alert('You successfully deleted a catch!');
                    return;
                } else {
                    throw (response);
                }
            } catch (error) {
                console.error(error.statusText);
            }
        }
    }
    let updateFunc = async function (e) {
        if (e.target.className === 'update') {
            try {
                let neededKey = e.target.parentNode.getAttribute('data-id');
                let allInputs = Array.from(e.target.parentNode.children).filter(el => el.tagName === 'INPUT');
                let updatedInfoCatchObj = allInputs.reduce((acc, el) => {
                    acc[el.className] = el.value;
                    return acc;
                }, {});
                let response = await fetch(`https://fisher-game.firebaseio.com/catches/${neededKey}.json`, {
                    method: 'put',
                    body: JSON.stringify(updatedInfoCatchObj)
                });
                if (response.status < 400) {
                    buttons.load.click();
                    alert('You successfully updated the catch!');
                    return;
                } else {
                    throw (response);
                }
            } catch (error) {
                console.error(error.statusText);
            }
        }
    }
    let addFunc = async function (e) {
        try {
            let allInputFields = Array.from(htmlElementsWorkshop.$addForm.children).filter(el => el.tagName === 'INPUT');
            let fieldEmpty = allInputFields.every(el => el.value !== '');
            if (fieldEmpty) {
                let catchInfoObj = allInputFields.reduce((acc, el) => {
                    acc[el.className] = el.value;
                    el.value = '';
                    return acc;
                }, {});
                let response = await fetch('https://fisher-game.firebaseio.com/catches.json', {
                    method: 'post',
                    body: JSON.stringify(catchInfoObj)
                });
                if (response.status < 400) {
                    buttons.load.click();
                    alert('You created a new catch!');
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
    htmlElementsWorkshop.$mainField.addEventListener('click', deleteFunc);
    htmlElementsWorkshop.$mainField.addEventListener('click', updateFunc);
    buttons.load.addEventListener('click', loadFunc);
    buttons.add.addEventListener('click', addFunc);
}

attachEvents();

