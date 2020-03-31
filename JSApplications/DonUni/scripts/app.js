import { registerHandler } from './handlers/auth/auth.js';
import { logInHandler } from './handlers/auth/auth.js';
import { logOutHandler } from './handlers/auth/auth.js';
import { homePageHandler } from './handlers/homePage/homePage.js';
import { createCauseHandler } from './handlers/createCause/createCause.js';
import { allCausesHandler } from './handlers/allCauses/allCausesHandler.js';
import { detailsCauseHandler } from './handlers/causeDetails/causeDetails.js';
import { deleteCauseHandler } from './handlers/deleteCause/deleteCause.js';

var app = Sammy('#main', function () {
    // include a plugin
    this.use('Handlebars', 'hbs');
    // define a 'route'
    this.get('#/', homePageHandler);
    this.get('#/home', homePageHandler);
    this.get('#/register', registerHandler);
    this.get('#/logOut', logOutHandler);
    this.get('#/logIn', logInHandler);
    this.get('#/createCause', createCauseHandler);
    this.get('#/allCauses', allCausesHandler);
    this.get('#/details/:id', detailsCauseHandler);
    // this.get('#/editCause/:id', editCauseHandler);
    // this.get('#/like/:id', likeCauseHandler);
    this.get('#/deleteCause/:id', deleteCauseHandler);
});

// start the application
app.run('#/');