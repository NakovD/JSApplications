function solve() {
    class Employee {
        constructor(name,age) {
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = [];
            this.dividend = 0;
        }
        work() {
            let currentEl = this.tasks[0];
            this.tasks.shift();
            this.tasks.push(currentEl);
            console.log(currentEl);
        }
        collectSalary() {
            if (!this.dividend) {
                console.log(`${this.name} received ${this.salary} this month.`);
            }else {
                console.log(`${this.name} received ${this.salary + this.dividend} this month.`);
            }
        }
    }
    class Junior extends Employee {
        constructor(name,age) {
            super(name,age);
            this.tasks = [`${this.name} is working on a simple task.`];
        }
    }
    class Senior extends Employee {
        constructor(name,age) {
            super(name,age);
            this.tasks = [`${this.name} is working on a complicated task.`,`${this.name} is taking time off work.`,`${this.name} is supervising junior workers.`];
        }
    }
    class Manager extends Employee {
        constructor(name,age) {
            super(name,age);
            this.tasks = [`${this.name} scheduled a meeting.`,`${this.name} is preparing a quarterly report.`];
        }
    }
    return {
        Employee,
        Junior,
        Senior,
        Manager
    }
}
solve();