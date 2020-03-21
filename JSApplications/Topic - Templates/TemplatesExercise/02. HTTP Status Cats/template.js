(async () => {

    Handlebars.registerPartial('cat', await fetch('./singleCatTemplate.hbs').then(r => r.text()));
    const template = Handlebars.compile(await fetch('./allCats.hbs').then(r => r.text()));
    const resultHTML = template({cats});
    document.getElementById('allCats').innerHTML += resultHTML;
    document.getElementById('allCats').addEventListener('click',(e) => {
        if (e.target.className === 'showBtn') {
            let elementToAppear = e.target.parentNode.children[1];
            if (elementToAppear.style.display === 'none') {
                elementToAppear.style.display = 'block';
                e.target.textContent = 'Hide status code';
            }else {
                elementToAppear.style.display = 'none';
                e.target.textContent = 'Show status code';
            }
        }
    })
})();