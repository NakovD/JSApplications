import { registerHandler } from './handlers/auth/auth.js';
import { logInHandler } from './handlers/auth/auth.js';
import { logOutHandler } from './handlers/auth/auth.js';
import { homePageHandler } from './handlers/homePage/homePage.js';
import { addFlightHandler } from './handlers/addFlight/addFlight.js';
import { detailsFlightHandler } from './handlers/detailsFlight/detailsFlight.js';
// import { likeFlightHandler } from './handlers/likeFlight/likeFlight.js';
import { deleteFlightHandler } from './handlers/delete/delete.js';
import { editFlightHandler } from './handlers/editFlight/editFlight.js';
import { myFlightsHandler } from './handlers/myFlights/myFlights.js';

// import { profilePageHandler } from './handlers/profilePage/profilePage.js';



var app = Sammy('#container', function () {
    // include a plugin

    this.use('Handlebars', 'hbs');
    // define a 'route'

    this.get('#/', homePageHandler);
    this.get('#/home', homePageHandler);
    this.get('#/register', registerHandler);
    this.get('#/logOut', logOutHandler);
    this.get('#/logIn', logInHandler);
    this.get('#/addFlight', addFlightHandler);
    this.get('#/details/:id', detailsFlightHandler);
    this.get('#/editFlight/:id', editFlightHandler);
    this.get('#/myFlights', myFlightsHandler);
    // this.get('#/like/:id', likeFlightHandler);
    this.get('#/remove/:id', deleteFlightHandler);
});

// start the application
app.run('#/');