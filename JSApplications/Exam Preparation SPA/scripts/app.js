import { homeViewHandler } from './controllers/homeView/homeView.js'
import { registerHandler } from './controllers/auth/auth.js';
import { logOutHandler } from './controllers/auth/auth.js';
import { logInHandler } from './controllers/auth/auth.js';
import { createTrekHandler } from './controllers/createTrek/createTrek.js';
import { detailsTrekHandler } from './controllers/detailsTrek/detailsTrek.js';
import { editTrekHandler } from './controllers/editTrek/editTrek.js';
import { likeTrekHandler } from './controllers/likeTrek/likeTrek.js';
import { deleteTrekHandler } from './controllers/deleteTrek/deleteTrek.js';
import { profilePageHandler } from './controllers/profilePage/proflePage.js';
// initialize the application
var app = Sammy('#main', function () {
    // include a plugin
    this.use('Handlebars', 'hbs');
    // define a 'route'
    this.get('#/', homeViewHandler);
    this.get('#/home', homeViewHandler);
    this.get('#/register', registerHandler);
    this.get('#/logOut', logOutHandler);
    this.get('#/logIn', logInHandler);
    this.get('#/createTrek', createTrekHandler);
    this.get('#/details/:id', detailsTrekHandler);
    this.get('#/editTrek/:id', editTrekHandler);
    this.get('#/like/:id', likeTrekHandler);
    this.get('#/delete/:id', deleteTrekHandler);
    this.get('#/profilePage', profilePageHandler);
});

// start the application
app.run('#/');