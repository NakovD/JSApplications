function solve(arr){
    let arrayCoordinates = arr;
    let arrayWithRectangles = arrayCoordinates.reduce((acc,el) => {
        let obj = {width:el[0],height:el[1],area:function(){return this.width * this.height},compareTo:()=>{}};
        acc.push(obj);
        return acc;
    },[]);
    return arrayWithRectangles.sort((a,b) => b.area() - a.area() || b.width - a.width);
}
solve([[10,5], [3,20], [5,12]]);