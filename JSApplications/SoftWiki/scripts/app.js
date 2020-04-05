import { registerHandler } from './handlers/auth/auth.js';
import { logInHandler } from './handlers/auth/auth.js';
import { logOutHandler } from './handlers/auth/auth.js';
import { homePageHandler } from './handlers/homePage/homePage.js';
import { createArticleHandler } from './handlers/createArticle/createArticle.js';
import { detailsArticleHandler } from './handlers/detailsArticle/detailsArticle.js';
import { deleteArticleHandler } from './handlers/deleteArticle/deleteArticle.js';
import { editArticleHandler } from './handlers/editArticle/editArticle.js';



var app = Sammy('#root', function () {
    // include a plugin
    
    this.use('Handlebars', 'hbs');
    // define a 'route'

    this.get('#/', homePageHandler);
    this.get('#/home', homePageHandler);
    this.get('#/register', registerHandler);
    this.get('#/logOut', logOutHandler);
    this.get('#/logIn', logInHandler);
    this.get('#/createArticle', createArticleHandler);
    this.get('#/details/:id', detailsArticleHandler);
    this.get('#/editArticle/:id', editArticleHandler);
    this.get('#/deleteArticle/:id', deleteArticleHandler);
});

// start the application
app.run('#/');