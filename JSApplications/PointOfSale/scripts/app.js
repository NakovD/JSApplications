import { registerHandler } from './handlers/auth/auth.js';
import { logInHandler } from './handlers/auth/auth.js';
import { logOutHandler } from './handlers/auth/auth.js';
import { homePageHandler } from './handlers/homePage/homePage.js';
import { createReceiptHandler } from './handlers/create/create.js';
import { allReceiptsHandler } from './handlers/all/all.js';
// import { detailsSomehtHandler } from './handlers/detailsTrek/detailsTrek.js';
// import { likeTrekHandler } from './handlers/likeTrek/likeTrek.js';
import { deleteEntryHandler } from './handlers/delete/delete.js';
// import { editSomethHandler } from './handlers/editTrek/editTrek.js';
// import { profilePageHandler } from './handlers/profilePage/profilePage.js';



var app = Sammy('#container', function () {
    // include a plugin

    this.use('Handlebars', 'hbs');
    // define a 'route'

    this.get('#/', homePageHandler);
    this.get('#/home', homePageHandler);
    this.get('#/all', allReceiptsHandler);
    // this.get('#/register', registerHandler);
    this.get('#/logOut', logOutHandler);
    // this.get('#/logIn', logInHandler);
    this.get('#/create', createReceiptHandler);
    // this.get('#/details/:id', detailsTrekHandler);
    // this.get('#/editTrek/:id', editTrekHandler);
    // this.get('#/like/:id', likeTrekHandler);
    this.get('#/deleteEntry', deleteEntryHandler);
});

// start the application
app.run('#/');