function solve() {
    let myObj = {
        extend: function (template) {
            Object.keys(template).forEach(key => {
                if (typeof template[key] === 'function') {
                    Object.getPrototypeOf(this)[key] = template[key];
                } else {
                    this[key] = template[key];
                }
            });
        }
    };
    myObj.extend({
        someth: 'ok',
        ok: function () {
            console.log(this.someth)
        }
    });
    return myObj;
}
solve();