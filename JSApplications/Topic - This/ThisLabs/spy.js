function spy(_obj,_method) {
    let [obj,method] = arguments;
    let originalFunction = obj[method];
    let objResult = {count:0};
    obj[method] = function(){
        objResult.count++;
        return originalFunction.apply(this,arguments);
    }
    return objResult;
}
console.log(spy({method:()=>'invoked'}));