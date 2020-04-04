import { registerHandler } from './handlers/auth/auth.js';
import { logInHandler } from './handlers/auth/auth.js';
import { logOutHandler } from './handlers/auth/auth.js';
import { homePageHandler } from './handlers/homePage/homePage.js';
import { createCarHandler } from './handlers/createCar/createCar.js';
import { allCarsHandler } from './handlers/allCars/allCars.js';
import { detailsCarHandler } from './handlers/detailsCar/detailsCar.js';
import { deleteCarHandler } from './handlers/deleteCar/deleteCar.js';
import { editCarHandler } from './handlers/editCar/editCar.js';
import { myCarsHandler } from './handlers/myCars/myCars.js';


var app = Sammy('#container', function () {
    // include a plugin
    this.use('Handlebars', 'hbs');
    // define a 'route'
    this.get('#/', homePageHandler);
    this.get('#/home', homePageHandler);
    this.get('#/register', registerHandler);
    this.get('#/logOut', logOutHandler);
    this.get('#/logIn', logInHandler);
    this.get('#/createCar', createCarHandler);
    this.get('#/allCars', allCarsHandler);
    this.get('#/details/:id', detailsCarHandler);
    this.get('#/editCar/:id', editCarHandler);
    this.get('#/myCars', myCarsHandler);
    // this.get('#/like/:id', likeCarHandler);
    this.get('#/deleteCar/:id', deleteCarHandler);
});

// start the application
app.run('#/');