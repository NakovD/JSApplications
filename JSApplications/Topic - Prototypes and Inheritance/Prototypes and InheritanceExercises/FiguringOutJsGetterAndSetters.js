class Person {
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }
    get name() {
        if (typeof this._name !== 'string') {
            throw TypeError();
        }
        return this._name;
    }
    set name(val) {
        if (typeof val !== 'string') {
            console.log();
        }else {
            console.log('ok');
        }
    }
}
let newPerson = new Person(15,21);
// console.log(newPerson.name);