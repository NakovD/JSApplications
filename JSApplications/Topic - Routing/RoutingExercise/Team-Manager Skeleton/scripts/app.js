import {
    homeViewHandler,
    aboutFuncHandler,
    loginFuncHandler,
    registerFuncHandler,
    logOutFunc,
    catalogFunc,
    createTeamFunc, detailsFuncHandler, joinTeamHandler
} from './Handlers/index.js';
// initialize the application
var app = Sammy('#main', function () {
    // include a plugin
    this.use('Handlebars', 'hbs');

    // define a 'route'
    this.get('#/', homeViewHandler);
    this.get('#/home', homeViewHandler);
    this.get('#/about', aboutFuncHandler);
    this.get('#/login', loginFuncHandler);
    this.get('#/register', registerFuncHandler);
    this.post('#/register', () => false);
    this.get('#/logout', logOutFunc);
    this.get('#/catalog', catalogFunc);
    this.get('#/create', createTeamFunc);
    this.get('#/catalog/:id', detailsFuncHandler);
    this.get('#/join/:id', joinTeamHandler);
});

// start the application
(()=> {app.run('#/');})()

