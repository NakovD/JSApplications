$(async () => {
    Handlebars.registerPartial('monkey',await fetch('./singleMonkey.hbs').then(r => r.text()));

    const template = Handlebars.compile(await fetch('./allMonkeys.hbs').then(r => r.text()));

    const HTMLResult = template({monkeys});
    let section = document.querySelector("body > section");
    section.innerHTML += HTMLResult;
    section.addEventListener('click', (e) => {
        if (e.target.textContent === 'Info') {
            let pToShow = e.target.parentNode.children[3];
            if (pToShow.style.display === 'none') {
                pToShow.style.display = 'block';
            }else {
                pToShow.style.display = 'none';
            }
        }
    });
});