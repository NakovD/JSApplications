import { registerHandler } from './handlers/auth/auth.js';
import { logInHandler } from './handlers/auth/auth.js';
import { logOutHandler } from './handlers/auth/auth.js';
import { homePageHandler } from './handlers/homePage/homePage.js';
import { createMemeHandler } from './handlers/createMeme/createMeme.js';
import { editMemeHandler } from './handlers/editMeme/editMeme.js';
import { deleteMemeHandler } from './handlers/deleteMeme/deleteMeme.js';
import { detailsMemeHandler } from './handlers/detailsMeme/detailsMeme.js';
import { userProfileViewHandler } from './handlers/userProfile/userProfile.js';
import { myProfileViewHandler } from './handlers/myProfile/myProfle.js';



var app = Sammy('#container', function () {
    // include a plugin
    this.use('Handlebars', 'hbs');
    // define a 'route'
    this.get('#/', homePageHandler);
    this.get('#/home', homePageHandler);
    this.get('#/register', registerHandler);
    this.get('#/logOut', logOutHandler);
    this.get('#/logIn', logInHandler);
    this.get('#/createMeme', createMemeHandler);
    this.get('#/details/:id', detailsMemeHandler);
    this.get('#/editMeme/:id', editMemeHandler);
    this.get('#/userProfile/:id', userProfileViewHandler);
    this.get('#/myProfile', myProfileViewHandler);
    // this.get('#/like/:id', likeMemeHandler);
    this.get('#/deleteMeme/:id', deleteMemeHandler);
});

// start the application
app.run('#/');