(function () {
    let htmlElements = {            //html Elements that I work with
        $tbody: document.querySelector("body > table > tbody"),
        $trExample: document.querySelector("body > table > tbody > tr:nth-child(1)"),
        $form: document.querySelector("body > form")
    };
    htmlElements.$tbody.innerHTML = '';
    let editRequest = false;
    let uniqueKey = '';
    let buttons = {
        submit: document.querySelector("body > form > button"),         //buttons that are always on the page
        load: document.querySelector("#loadBooks")
    }
    let loadBooks = async function (e) {                //load books func
        try {
            let response = await fetch('https://softunicourses.firebaseio.com/books.json');
            if (response.status < 400) {
                let data = await response.json();
                htmlElements.$tbody.innerHTML = '';
                if (!data) {
                    alert('No books! Add one now.');        //alert if no books are in the database
                    return;
                }
                let keys = Object.keys(data);
                keys.forEach(key => {                       // adding each books from the database to the page
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
    let addNewBook = async function (e) {               //adding new book functionality
        try {                                           //this func also handles updating books
            e.preventDefault();
            let allInputs = Array.from(htmlElements.$form.children).filter(el => el.tagName === 'INPUT');//getting only input fields
            let checkEmptyFields = allInputs.every(el => el.value !== '');      //checking if any of the input fields are empty so the program wont add for example book without a title
            if (checkEmptyFields) {
                let bookInfo = allInputs.reduce((acc, el) => {      //transforming info
                    acc[el.id] = el.value;
                    el.value = '';
                    return acc;
                }, {});
                if (editRequest) {          //with this variable I differentiate if the user adds new book, or he updates new book cause they use the same form
                    editRequest = false;    //part of the logic here comes from the next func which is to update and delete
                    let response = await fetch(`https://softunicourses.firebaseio.com/books/${uniqueKey}.json`, {           //updating book request
                        method: 'PUT',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(bookInfo)
                    });
                    if (response.status < 400) {
                        buttons.load.click();           //reload list, so it shows the updated book info
                        return;
                    } else {
                        throw (response);
                    }
                } else {
                    let response = await fetch('https://softunicourses.firebaseio.com/books.json', {    //adding new book request
                        method: 'POST',
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(bookInfo)
                    });
                    if (response.status < 400) {
                        buttons.load.click()            //reload the field so it will show the book list with the new added item
                        return;
                    }else {
                        throw(response);
                    }
                }
            } else {
                alert('You must fill all fields!');             //alert is shown if not all fields are fullfilled, so it wont add invalid info to the database
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }
    let updateDelete = async function (e) {                 //updating and deleting books functionality
        if (e.target.textContent === 'Delete') {
            try {                   //delete
                let neededKey = e.target.parentNode.parentNode.getAttribute('key');
                let response = await fetch(`https://softunicourses.firebaseio.com/books/${neededKey}.json`, {
                    method: 'DELETE'
                });
                if (response.status < 400) {
                    loadBooks();        // reload so it will show that the user actually deleted the book
                    return;
                }else {
                    throw(response);
                }
            } catch (error) {
                console.error(error);
            }
        } else if (e.target.textContent === 'Edit') {           //part of the edin book functionality is here, the other part is in the add book func
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

