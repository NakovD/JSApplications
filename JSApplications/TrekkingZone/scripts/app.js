import { registerHandler } from './handlers/auth/auth.js';
import { logInHandler } from './handlers/auth/auth.js';
import { logOutHandler } from './handlers/auth/auth.js';
import { homePageHandler } from './handlers/homePage/homePage.js';
import { createTrekHandler } from './handlers/createTrek/createTrek.js';
import { detailsTrekHandler } from './handlers/detailsTrek/detailsTrek.js';
import { likeTrekHandler } from './handlers/likeTrek/likeTrek.js';
import { deleteTrekHandler } from './handlers/deleteTrek/deleteTrek.js';
import { editTrekHandler } from './handlers/editTrek/editTrek.js';
import { profilePageHandler } from './handlers/profilePage/profilePage.js';

var app = Sammy('#main', function () {
    // include a plugin
    this.use('Handlebars', 'hbs');
    // define a 'route'
    this.get('#/', homePageHandler);
    this.get('#/home', homePageHandler);
    this.get('#/register', registerHandler);
    this.get('#/logOut', logOutHandler);
    this.get('#/logIn', logInHandler);
    this.get('#/createTrek', createTrekHandler);
    this.get('#/details/:id', detailsTrekHandler);
    this.get('#/editTrek/:id', editTrekHandler);
    this.get('#/likeTrek/:id', likeTrekHandler);
    this.get('#/deleteTrek/:id', deleteTrekHandler);
    this.get('#/profilePage', profilePageHandler);
});

// start the application
app.run('#/');