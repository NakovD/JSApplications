function solve() {
    (() => {
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
        Array.prototype.skip = function(n){
            return this.slice(n);
        };
        Array.prototype.take = function(n){
            return this.slice(0,n);
        };
        Array.prototype.sum = function(){
            return this.reduce((acc,e)=>{ acc = acc + e;
                return acc;
            },0);
        };
        Array.prototype.average = function(){
            let sum = this.reduce((acc,e) => {
                acc = acc + e;
                return acc;
            },0);
            return sum / this.length;
        };
        // let array = [1,2,3];
        // console.log(array.skip(1));
        // console.log(array.take(2));
    })();
}
solve();