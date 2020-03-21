(async function () {
    const contacts = [
        {
            id: 1,
            name: "John",
            phoneNumber: "0847759632",
            email: "john@john.com"
        },
        {
            id: 2,
            name: "Merrie",
            phoneNumber: "0845996111",
            email: "merrie@merrie.com"
        },
        {
            id: 3,
            name: "Adam",
            phoneNumber: "0866592475",
            email: "adam@stamat.com"
        },
        {
            id: 4,
            name: "Peter",
            phoneNumber: "0866592475",
            email: "peter@peter.com"
        },
        {
            id: 5,
            name: "Max",
            phoneNumber: "0866592475",
            email: "max@max.com"
        },
        {
            id: 6,
            name: "David",
            phoneNumber: "0866592475",
            email: "david@david.com"
        }
    ];
    Handlebars.registerPartial('contactCard',await fetch('./singleContactTemplate.hbs').then(r => r.text()));

    const template = Handlebars.compile(await fetch('./allContacts.hbs').then(r => r.text()));

    const readyHTML = template({contacts});
    let $mainBody = document.querySelector("body");
    let placeHolder = `<div id="contacts">contactCard</div>`;
    let result = $mainBody.innerHTML;
    result = result.replace(placeHolder,readyHTML);
    $mainBody.innerHTML = result;
    // let divConctacts = document.querySelector("#contacts");

    // divConctacts.addEventListener('click',(e)=> {
    //     if (e.target.className === 'detailsBtn') {
    //         let $divToAppear = e.target.parentNode.children[2];
    //         if ($divToAppear.hasAttribute('style')) {
    //             if ($divToAppear.style.display === 'none') {
    //                 $divToAppear.style.display = 'block';
    //             }else {
    //                 $divToAppear.style.display = 'none';
    //             }
    //         }else {
    //             $divToAppear.style.display = 'block';
    //         }
            
    //         // console.log('clicked');
        // }
    // })
}())
