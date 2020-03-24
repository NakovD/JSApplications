import Router from './router.js';
var router = new Router({
    home: {
        logState: function (state) {
            console.log(state);
        }
    },
    away: {
        printName: function(state) {
            console.log(state.name);
        },
        appendDiv: function(state) {
            let body = document.querySelector("body");
            let newEl = document.createElement('div');
            newEl.textContent = state.name;
            body.appendChild(newEl);
        }
    },
    printStuff: {
        printKenobiName: function(state) {
            console.log(state.name);
        },
        printKenobiAge: function(state) {
            console.log(state.age);
        },
        printKenobiLightsaberColor: function(state) {
            console.log(state.saberColor,state.age);
        },
        printKenobiInfo: function(state) {
            Object.keys(state).forEach(el => console.log(`${el}:${state[el]}`));
        }
    }
});
router.initialize();
