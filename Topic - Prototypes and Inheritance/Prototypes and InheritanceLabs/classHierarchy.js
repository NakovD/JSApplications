function solve() {
    let objPossibilities = {
        'cm': ,
        'mm',
        'm'
    }
    class Figure {
        constructor() {
            this.units = 'cm';
        }
        changeUnits(str) {
            if (str === 'm') {
                this.units = 'm';
            } else if (str === 'mm') {
                this.units = 'mm';
            } else {
                this.units = 'cm';
            }
        }
    }
    class Circle extends Figure {
        constructor(r) {
            super()
            this.radius = r;
        }
        get area() {
            if (this.unit === 'm') {
                return (this.radius / 100) * (this.radius / 100) * Math.PI;
            }else if (this.units === 'mm') {
                return (this.radius * 10) * (this.radius * 10) * Math.PI;
            }else {
                return this.radius * this.radius * Math.PI;
            }
        };
        toString() {
            if (this.units === 'm') {
                return `Figures units: ${this.units} Area: ${this.area} - radius: ${this.radius / 100}`;
            } else if (this.units === 'mm') {
                return `Figures units: ${this.units} Area: ${this.area} - radius: ${this.radius * 10}`;
            } else {
                return `Figures units: ${this.units} Area: ${this.area} - radius: ${this.radius}`;
            }
        }
    }
    class Rectangle extends Figure {
        constructor(width, height, units) {
            super()
            this.width = width;
            this.height = height;
            this.units = units;
        }
        get area() {
            if (this.units === 'm') {
                return (this.width / 100) * (this.height / 100);
            } else if (this.units === 'mm') {
                return (this.width * 10) * (this.height * 10);
            } else {
                return this.width * this.height;
            }
        };
        toString() {
            if (this.units === 'm') {
                return `Figures units: ${this.units} Area: ${this.area} - width: ${this.width / 100}, height: ${this.height / 100}`
            } else if (this.units === 'mm') {
                return `Figures units: ${this.units} Area: ${this.area} - width: ${this.width * 10}, height: ${this.height * 10}`
            } else {
                return `Figures units: ${this.units} Area: ${this.area} - width: ${this.width}, height: ${this.height}`;
            }
        }
    }
    return {
        Figure,
        Circle,
        Rectangle
    }
}
solve();