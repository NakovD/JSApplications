function arrayMap(arr,func) {
    let array = arr;
    let result = array.map(el => func(el));
    return result;
}
console.log(arrayMap(['a','b','c'],(l)=>l.toLocaleUpperCase()));