class Company {
    constructor() {
        this.departments = [];
        this.realDepartments = {};
    }
    addEmployee(_employee, _salary, _position, _department) {
        let [employee, salary, position, department] = arguments;
        if (!employee || (!salary && salary !== 0) || !position || !department) {
            throw new Error('Invalid input!');
        }
        if (salary < 0) {
            throw new Error(' Invalid input!');
        }
        if (!this.realDepartments[department]) {
            this.realDepartments[department] = [{
                employee, salary, position
            }];
        } else {
            this.realDepartments[department].push({
                employee, salary, position
            });
        }
        return `New employee is hired. Name: ${employee}. Position: ${position}`
    }
    getHighestAvgSalary(departments) {
        let highestAvgSalaryDepartment = Object.keys(this.realDepartments)
            .sort((a, b) => {
                let avgADepart = this.realDepartments[a].reduce((acc, e) => acc + Number(e.salary), 0) / this.realDepartments[a].length;
                let avgBDepart = this.realDepartments[b].reduce((acc, e) => acc + Number(e.salary), 0) / this.realDepartments[b].length;
                return avgBDepart - avgADepart;
            })[0];
            let highestAvg = this.realDepartments[highestAvgSalaryDepartment].reduce((acc, e) => acc + Number(e.salary), 0) / this.realDepartments[highestAvgSalaryDepartment].length;
        return {
            highestAvgSalaryDepartment,
            highestAvg
        };
    }
    bestDepartment() {
        let highestAvgSalary = this.getHighestAvgSalary(this.realDepartments);
        let output = `Best Department is: ${highestAvgSalary.highestAvgSalaryDepartment}\nAverage salary: ${highestAvgSalary.highestAvg.toFixed(2)}\n` 
        let someth = this.realDepartments[highestAvgSalary.highestAvgSalaryDepartment].sort((a,b)=>{
            return b.salary - a.salary || a.employee.localeCompare(b.employee);
        }).map(el => {
            return `${el.employee} ${el.salary} ${el.position}`;
        }).join('\n');
        return output + someth;
    }
}
let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
