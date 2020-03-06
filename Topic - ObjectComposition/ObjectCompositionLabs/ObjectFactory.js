function solve(string){
    let arrayWithObjects = JSON.parse(string);
    let resultObj = arrayWithObjects.reduce((acc,el) => {
        let properties = Object.keys(el);
        properties.forEach(property => {
            if (!acc.hasOwnProperty(property)) {
                acc[property] = el[property];
            }
        });
        return acc;
    },{});
    return resultObj;
}
solve(`[{"canFly": true},{"canMove":true, "doors": 4},{"capacity": 255},{"canFly":true, "canLand": true}]`);