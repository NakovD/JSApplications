class Hex {
    constructor(value) {
        this.value = value;
    }
    valueOf(){
        return this.value;
    }
    toString() {
        return '0x' + this.value.toString(16).toUpperCase();
    }
    plus(val) { 
        if (val instanceof Hex) {
            this.value += val.valueOf();
            return new Hex(this.value);
        }
        this.value += Number(val);
        return new Hex(this.value);
    }
    minus(val) {
        if (val instanceof Hex) {
            this.value -= val.valueOf();
            return new Hex(this.value);
        }
        this.value += Number(value);
        return new Hex(this.value);

    }
    parse(hexaNum) {
        return parseInt(hexaNum,10);
    }
}
let FF = new Hex(255);