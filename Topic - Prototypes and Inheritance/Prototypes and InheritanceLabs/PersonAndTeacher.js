function personAndTearcher() {
    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }
        toString() {
            let stringArr = []
            Object.keys(this).forEach(key => {
                stringArr.push(`${key}: ${this[key]}`);
            });
            if (this.hasOwnProperty('course')) {
                return `Student (${stringArr.join(', ')})`;
            } else if (this.hasOwnProperty('subject')) {
                return `Teacher (${stringArr.join(', ')})`;
            } else {
                return `Person (${stringArr.join(', ')})`;
            }
        }
    }
    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email)
            this.subject = subject;
        }
    }
    class Student extends Person {
        constructor(name, email, course) {
            super(name, email)
            this.course = course;
        }
    }
    // let student = new Student('gosho', 'gosho@abv.bg', 'IT');
    // let person = new Person('goshko', 'avc.vbg');
    // console.log(student.toString());
    // // console.log(student.toString());
    // return {
    //     Person,
    //     Teacher,
    //     Student
    // }
}
personAndTearcher();