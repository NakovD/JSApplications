import { registerHandler } from './handlers/auth/auth.js';
import { logInHandler } from './handlers/auth/auth.js';
import { logOutHandler } from './handlers/auth/auth.js';
import { homePageHandler } from './handlers/homePage/homePage.js';
import { allSongsHandler } from './handlers/allSongsVIew/allSongsView.js';
import { createSongHandler } from './handlers/createSong/createSong.js';
import { likeSongHandler } from './handlers/likeSong/likeSong.js'
import { listenSongHandler } from './handlers/listenSong/listenSong.js';
import { removeSongHandler } from './handlers/removeSong/removeSong.js';
import { mySongsHandler } from './handlers/mySongs/mySongs.js';



var app = Sammy('#main', function () {
    // include a plugin
    this.use('Handlebars', 'hbs');
    // define a 'route'
    this.get('#/', homePageHandler);
    this.get('#/home', homePageHandler);
    this.get('#/register', registerHandler);
    this.get('#/logOut', logOutHandler);
    this.get('#/logIn', logInHandler);
    this.get('#/allSongs', allSongsHandler);
    this.get('#/createSong', createSongHandler);
    this.get('#/listen/:id', listenSongHandler);
    this.get('#/mySongs', mySongsHandler);
    // this.get('#/details/:id', detailsSongHandler);
    // this.get('#/editSong/:id', editSongHandler);
    this.get('#/like/:id', likeSongHandler);
    this.get('#/remove/:id', removeSongHandler);
});

// start the application
app.run('#/');