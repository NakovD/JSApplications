export function formDataExtractor(_form) {
    let form = _form;
    let allInputFields = [];
    Array.from(form.children).forEach(el => {
        Array.from(el.children).forEach(el => {
            if (el.tagName === 'INPUT') {
                allInputFields.push(el);
            }
        });
    });
    let objToReturn = allInputFields.reduce((acc,inputField) => {
        acc[inputField.name] = inputField.value;
        return acc;
    },{});
    return objToReturn;
}