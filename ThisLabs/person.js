class Person {
    constructor(first, last) {
        this.firstName = first;
        this.lastName = last;
        this.fullName = this.firstName + ' ' + this.lastName;
    }
    get fullName() {
        return this._fullName;
    }
    set fullName(val) {
        if (`${this.firstName} ${this.lastName}` !== val) {
            this._fullName = `${this.firstName} ${this.lastName}`;
        }else {
            this._fullName === val;
        }
    }
}
let person = new Person("Peter", "Ivanov");
// console.log(person.fullName);
console.log(person.fullName);//Peter Ivanov
person.firstName = "George";
console.log(person);
console.log(person.fullName);
console.log(person.fullName);//George Ivanov
person.lastName = "Peterson";
console.log(person.fullName);//George Peterson
person.fullName = "Nikola Tesla";
console.log(person.firstName)//Nikola
console.log(person.lastName)//Tesla
// console.log(person.fullName);