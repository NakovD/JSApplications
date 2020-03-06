let someFunc = (function () {
    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str + this;
        } else {
            return this + '';
        }
    }
    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
            return this + str;
        } else {
            return this + '';
        }
    }
    String.prototype.isEmpty = function () {
        if (this.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    String.prototype.truncate = function (n) {
        if (this.length <= n) {
            return this + '';
        }else {
            let string = this;
            if (string.includes(' ')) {
                while (string.length > n) {
                    let arrStr = string.split(' ');
                    arrStr.pop();
                    string = arrStr.join(' ') + '...';
                }
                return string;
            } else {
                if (n < 4) {
                    let result = '.'.repeat(n);
                    return result;
                }
                let index = n - 3;
                let result = string.substring(0,index);
                return result + '...';
            }
        }
    }
    String.format = function(_string,params) {
        let string = _string;
        let arrReplacements = Array.from(arguments).slice(1);
        string = string.split(' ').reduce((acc,word) => {
            if (word.includes('{')) {
                let replacement = arrReplacements.shift();
                acc.push(!replacement ? word : replacement);
            }else {
                acc.push(word);
            }
            return acc;
        },[]).join(' ');
        return string;
    }
})();