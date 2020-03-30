import { registerHandler } from './handlers/auth/auth.js';
import { logInHandler } from './handlers/auth/auth.js';
import { logOutHandler } from './handlers/auth/auth.js';
import { homePageHandler } from './handlers/homePage/homePage.js';
import { createIdeaHandler } from './handlers/createIdea/createIdea.js';
import { detailsIdeaHandler } from './handlers/detailsIdea/detailsIdea.js';
import { deleteIdeaHandler } from './handlers/deleteIdea/deleteIdeaHandler.js'
import { likeIdeaHandler } from './handlers/likeIdea/likeIdea.js';
// import { commentIdeaHandler } from './handlers/commentIdea/commentIdea.js';
import { profilePageHandler } from './handlers/profilePage/proflePage.js';


var app = Sammy('#main', function () {
    // include a plugin
    this.use('Handlebars', 'hbs');
    // define a 'route'
    this.get('#/', homePageHandler);
    this.get('#/home', homePageHandler);
    this.get('#/register', registerHandler);
    this.get('#/logOut', logOutHandler);
    this.get('#/logIn', logInHandler);
    this.get('#/createIdea', createIdeaHandler);
    this.get('#/details/:id', detailsIdeaHandler);
    this.get('#/like/:id', likeIdeaHandler);
    this.get('#/delete/:id', deleteIdeaHandler);
    // this.get('#/comment/:id', commentIdeaHandler);
    this.get('#/profilePage', profilePageHandler);
    // this.post('#/comment/:id',()=>false);
});

// start the application
app.run('#/');