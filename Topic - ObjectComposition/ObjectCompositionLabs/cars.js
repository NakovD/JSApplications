function solve(array){
    let arrayWithCommands = array;
    let allObjects = {};
    return function(){
        arrayWithCommands.forEach(command => {
            if (command.includes('create') && !command.includes('inherit')) {
                allObjects[command.split(' ')[1]] = {};
            }else if (command.includes('create') && command.includes('inherit')) {
                
            }else if (command.includes('set')) {
                allObjects[command.split(' ')[1]][command.split(' ')[2]] = command.split(' ')[3];
            }
        });
    }
}
solve(['create c1',
'create c2 inherit c1',
'set c1 color red',
'set c2 model new',
'print c1',
'print c2']
);