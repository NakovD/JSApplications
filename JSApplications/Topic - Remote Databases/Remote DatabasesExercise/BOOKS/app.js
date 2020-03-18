(function () {
    let htmlElements = {
        $tbody: document.querySelector("body > table > tbody"),
        $trExample: document.querySelector("body > table > tbody > tr:nth-child(1)"),
        $form: document.querySelector("body > form")
    };
    htmlElements.$tbody.innerHTML = '';
    let editRequest = false;
    let uniqueKey = '';
    let buttons = {
        submit: document.querySelector("body > form > button"),
        load: document.querySelector("#loadBooks")
    }
    let loadBooks = async function (e) {
        try {
            let response = await fetch('https://softunicourses.firebaseio.com/books.json');
            if (response.status < 400) {
                let data = await response.json();
                htmlElements.$tbody.innerHTML = '';
                if (!data) {
                    alert('No books! Add one now.');
                    return;
                }
                let keys = Object.keys(data);
                keys.forEach(key => {
                    let $newTr = htmlElements.$trExample.cloneNode(true);
                    $newTr.setAttribute('key', `${key}`);
                    $newTr.children[0].textContent = data[key].title;
                    $newTr.children[1].textContent = data[key].author;
                    $newTr.children[2].textContent = data[key].isbn;
                    htmlElements.$tbody.appendChild($newTr);
                });
            } else {
                throw (response);
            }
        } catch (error) {
            console.error;
        }

    }
    let addNewBook = async function (e) {
        try {
            e.preventDefault();
            let allInputs = Array.from(htmlElements.$form.children).filter(el => el.tagName === 'INPUT');
            let checkEmptyFields = allInputs.every(el => el.value !== '');
            if (checkEmptyFields) {
                let bookInfo = allInputs.reduce((acc, el) => {
                    acc[el.id] = el.value;
                    el.value = '';
                    return acc;
                }, {});
                if (editRequest) {
                    editRequest = false;
                    let response = await fetch(`https://softunicourses.firebaseio.com/books/${uniqueKey}.json`, {
                        method: 'PUT',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(bookInfo)
                    });
                    if (response.status < 400) {
                        buttons.load.click();
                        return;
                    } else {
                        throw (response);
                    }
                } else {
                    let response = await fetch('https://softunicourses.firebaseio.com/books.json', {
                        method: 'POST',
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(bookInfo)
                    });
                    if (response.status < 400) {
                        buttons.load.click()
                        return;
                    }else {
                        throw(response);
                    }
                }
            } else {
                alert('You must fill all fields!');
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }
    let updateDelete = async function (e) {
        if (e.target.textContent === 'Delete') {
            try {
                let neededKey = e.target.parentNode.parentNode.getAttribute('key');
                let response = await fetch(`https://softunicourses.firebaseio.com/books/${neededKey}.json`, {
                    method: 'DELETE'
                });
                if (response.status < 400) {
                    loadBooks();
                    return;
                }else {
                    throw(response);
                }
            } catch (error) {
                console.error(error);
            }
        } else if (e.target.textContent === 'Edit') {
            let currentBookInfo = e.target.parentNode.parentNode;
            let $formToFullFill = document.querySelector("body > form");
            let onlyInputs = Array.from($formToFullFill.children).filter(el => el.tagName === 'INPUT');
            let neededEls = Array.from(currentBookInfo.children).slice(0, 3);
            onlyInputs.forEach((el, i) => {
                el.value = neededEls[i].textContent;
            });
            editRequest = true;
            uniqueKey = currentBookInfo.getAttribute('key');
        }
    }
    htmlElements.$tbody.addEventListener('click', updateDelete);
    buttons.load.addEventListener('click', loadBooks);
    buttons.submit.addEventListener('click', addNewBook);
})();

