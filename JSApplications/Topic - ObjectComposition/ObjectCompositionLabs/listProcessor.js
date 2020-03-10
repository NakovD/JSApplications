function solve(array){
    let innerCollection = [];
        let arrayOfCommands = array;
        arrayOfCommands.forEach(command => {
            if (command.includes('add')) {
                innerCollection.push(command.split(' ')[1]);
            }else if (command.includes('remove')) {
                innerCollection = innerCollection.filter(el => el !== command.split(' ')[1]);
            }else {
                console.log(innerCollection.join(','));
            }
        });
}
solve(['add pesho', 'add george', 'add peter', 'remove peter','print']);
// let result = solve();
// result(['add pesho', 'add george', 'add peter', 'remove peter','print']);