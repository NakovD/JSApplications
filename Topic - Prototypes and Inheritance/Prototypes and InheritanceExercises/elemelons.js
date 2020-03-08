function solve() {
    class Melon {
        constructor(weight,melonSort) {
            if (this.constructor === Melon) {
                throw new Error('Abstract class cannot be instantiated directly');
            }
            this.weight = weight;
            this.melonSort = melonSort;
            this._elementIndex = this.weight * this.melonSort.length;
        }
        get elementIndex() {return this._elementIndex};
        toString() {
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;
        }
    }
    class Watermelon extends Melon {
        constructor(weight,melonSort) {
            super(weight,melonSort);
            this.element = 'Water';
        }
    }
    class Firemelon extends Melon {
        constructor(weight,melonSort) {
            super(weight,melonSort);
            this.element = 'Fire';
        }
    }
    class Earthmelon extends Melon {
        constructor(weight,melonSort) {
            super(weight,melonSort);
            this.element = 'Earth';
        }
    }
    class Airmelon extends Melon {
        constructor(weight,melonSort) {
            super(weight,melonSort);
            this.element = 'Air';
        }
    }
    class Melolemonmelon extends Watermelon {
        constructor(weight,melonSort) {
            super(weight,melonSort);
            this.element = 'Water';
            this.allElements = ['Fire','Earth','Air','Water'];
        }
        morph() {
            let elToBeChanged = this.allElements[0];
            this.allElements.shift();
            this.element = elToBeChanged;
            this.allElements.push(elToBeChanged);
        }
    }
    
    return {
        Melon,
        Watermelon,
        Firemelon,
        Earthmelon,
        Airmelon,
        Melolemonmelon
    }
}
solve();