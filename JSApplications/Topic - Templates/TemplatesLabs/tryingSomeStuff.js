let templateEngine = (function () {
    let startNotation = '{{';
    let endNotation = '}}';
    let searchStr = `${startNotation}([A-Za-z]+)${endNotation}`
    let compile = function (template) {
        let regex = new RegExp(searchStr);
        let match;
        return function(obj) {
            while (match = regex.exec(template)) {
                template = template.replace(match[0],obj[match[1]]);
            }
            return template;
        }
    }
    return {
        compile: compile
    }
}());
let stringToReplace = templateEngine.compile('{{title}} is book from {{author}}, writen {{dateWritten}}. Its genre is {{genre}}.')
console.log(stringToReplace({title:'Book for coding',author:'David Nakov',genre:'Borring stuff',dateWritten:'15.06.2013'}));
