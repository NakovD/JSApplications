(function () {
    const htmlElements = {                          //html elements that I use
        // firstNameField: document.querySelector("body > form > input[type=text]:nth-child(3)"),
        // lastNameField: document.querySelector("body > form > input[type=text]:nth-child(6)"),
        // facNumField: document.querySelector("body > form > input[type=text]:nth-child(9)"),
        // gradeField: document.querySelector("body > form > input[type=text]:nth-child(12)"),
        $tbody: document.querySelector("#results > tbody"),
        $trowExample: document.querySelector("#results > thead > tr"),
        $form: document.querySelector("body > form")
    }
    const buttons = {                                       //buttons that are always on display
        createButton: document.querySelector("body > form > button"),
        extractButton: document.querySelector("body > form > button:nth-child(15)")
    }
    buttons.extractButton.addEventListener('click',async (e) => {               //extract functionality(show all current students in the database)
        try {
            let response = await fetch('https://softunicourses.firebaseio.com/students.json');
            if (response.status < 400) {
                let data = await response.json();
                htmlElements.$tbody.innerHTML = '';
                Object.values(data).forEach((el,i) => {
                    let $newTr = htmlElements.$trowExample.cloneNode(true);
                    $newTr.children[0].textContent = i + 1;
                    $newTr.children[1].textContent = el.firstName;
                    $newTr.children[2].textContent = el.lastName;
                    $newTr.children[3].textContent = el.facultyNumber;
                    $newTr.children[4].textContent = el.grade;
                    htmlElements.$tbody.appendChild($newTr);
                });
            }else {
                throw(response);
            }
        } catch (error) {
            console.error(error.statusText);
        }
    });
    buttons.createButton.addEventListener('click',async (e) => {            //adding new student to the database
        let allInputFields = Array.from(htmlElements.$form.children).filter(el => el.tagName === 'INPUT');
        let checkIfFieldsArentEmpty = allInputFields.every(el => el.value !== '');
        if (checkIfFieldsArentEmpty) {
            let studentInfo = allInputFields.reduce((acc,el) => {
                acc[el.name] = el.value;
                el.value = '';
                return acc;
            },{});
            try {
                let response = await fetch('https://softunicourses.firebaseio.com/students.json', {
                    method: 'POST',
                    headers: {"Content-type":"application/json"},
                    body: JSON.stringify(studentInfo)
                });
                if (response.status < 400) {
                    alert('You added new student to the database!');
                    buttons.extractButton.click();
                    return;
                }else {
                    throw(response);
                }
            } catch (error) {
                console.error(error.statusText);
            }
        }else {
            alert('You haven\' fullfilled all fields!');
            return;
        }
    });
})();