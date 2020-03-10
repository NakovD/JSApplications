function solve() {
    class Periphery {
        constructor(manufacturer) {
            if (this.constructor === Periphery) {
                throw new Error('Abstract classes cant be instantiated.');
            }
            this.manufacturer = manufacturer;
        }
    }
    class Keyboard extends Periphery {
        constructor(manufacturer, responseTime) {
            super(manufacturer);
            this.responseTime = responseTime;
        }
    }
    class Monitor extends Periphery {
        constructor(manufacturer, width, height) {
            super(manufacturer);
            this.width = width;
            this.height = height;
        }
    }
    class Battery extends Periphery {
        constructor(manufacturer, expectedLife) {
            super(manufacturer);
            this.expectedLife = expectedLife;
        }
    }
    class Computer extends Periphery {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            super(manufacturer);
            if (this.constructor === Computer) {
                throw new Error('Abstract class');
            }
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }
    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
            // if (battery instanceof Battery) {
            //     this._battery = battery;
            // } else {
            //     throw TypeError();
            // }
        }
        get battery() {
            if (!this._battery instanceof Battery) {
                throw TypeError();
            }
            return this._battery
        };
        set battery(val) {
            if (val instanceof Battery) {
                this._battery = val;
            } else {
                throw TypeError();
            }
        }
    }
    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            if (keyboard instanceof Keyboard) {
                this._keyboard = keyboard;
            } else {
                throw TypeError();
            }
            if (monitor instanceof Monitor) {
                this._monitor = monitor;
            } else {
                throw TypeError();
            }
        }
        get keyboard() {
            if (!this._keyboard instanceof Keyboard) {
                throw TypeError()
            }
            return this._keyboard;
        }
        set keyboard(val) {
            if (val instanceof Keyboard) {
                this.keyboard = val;
            } else {
                throw TypeError();
            }
        }
        get monitor() {
            if (!this._monitor instanceof Monitor) {
                throw TypeError();
            }
            return this._monitor
        };
        set monitor(val) {
            if (val instanceof Monitor) {
                this.monitor = val;
            } else {
                throw TypeError();
            }
        }
    }
    let keyboard = new Keyboard('davidComp',0.3);
    let monitor = new Monitor('DavidComp',15,16);
    let battery = new Battery('someth',15);
    let laptop = new Laptop('davidCompanies',2.9,1000,150,15,'black','gosho');
    console.log(laptop.battery);
    return {
        Keyboard,
        Battery,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }
}
solve();