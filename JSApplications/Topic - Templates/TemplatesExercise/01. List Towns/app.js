let $inputField = document.querySelector("#towns");
let $loadButton = document.querySelector("#btnLoadTowns");
let loadFunc = function (e) {
    e.preventDefault();
    if ($inputField.value !== '') {
        let arrayToWorkWith = $inputField.value.split(', ').reduce((acc,el) => {
            let obj = {name:el}
            acc.push(obj);
            return acc;
        },[]);
        fetch('./template.hbs')
            .then(r => r.text())
            .then(templateHbs => {
                const template = Handlebars.compile(templateHbs);
                const resultHTML = template({towns:arrayToWorkWith});
                document.querySelector("#root").innerHTML = resultHTML;
            })    
        }
}


$loadButton.addEventListener('click',loadFunc);