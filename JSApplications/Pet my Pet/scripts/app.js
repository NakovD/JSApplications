import { registerHandler } from './handlers/auth/auth.js';
import { logInHandler } from './handlers/auth/auth.js';
import { logOutHandler } from './handlers/auth/auth.js';
import { homePageHandler } from './handlers/homePage/homePage.js';
import { addPetHandler } from './handlers/addPet/addPet.js';
import { dashboardViewHandler } from './handlers/dashboard/dashboard.js';
import { myPetsViewHandler } from './handlers/myPets/myPets.js';
import { detailsPetHandler } from './handlers/details/details.js';
import { deletePetHandler } from './handlers/deletePet/deletePet.js';
import { editPetHandler } from './handlers/editPet/editPet.js';
import { petPetHandler } from './handlers/petPet/petPet.js';
import { catPetsView } from './handlers/dashboard/dashboard.js';
import { dogPetsView } from './handlers/dashboard/dashboard.js';
import { parrotPetsView } from './handlers/dashboard/dashboard.js';
import { reptilePetsView } from './handlers/dashboard/dashboard.js';
import { otherPetsView } from './handlers/dashboard/dashboard.js'



var app = Sammy('#main', function () {
    // include a plugin
    this.use('Handlebars', 'hbs');
    // define a 'route'
    this.get('#/', homePageHandler);
    this.get('#/home', homePageHandler);
    this.get('#/register', registerHandler);
    this.get('#/logOut', logOutHandler);
    this.get('#/logIn', logInHandler);
    this.get('#/addPet', addPetHandler);
    this.get('#/dashboard', dashboardViewHandler);
    this.get('#/myPets', myPetsViewHandler);
    this.get('#/details/:id', detailsPetHandler);
    this.get('#/editPet/:id', editPetHandler);
    this.get('#/pet/:id', petPetHandler);
    this.get('#/dashboard/cats', catPetsView);
    this.get('#/dashboard/dogs', dogPetsView);
    this.get('#/dashboard/parrots', parrotPetsView);
    this.get('#/dashboard/reptiles', reptilePetsView);
    this.get('#/dashboard/others', otherPetsView);
    // this.get('#/like/:id', likePetHandler);
    this.get('#/delete/:id', deletePetHandler);
});

// start the application
app.run('#/');