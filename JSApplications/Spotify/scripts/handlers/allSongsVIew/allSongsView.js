import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function allSongsHandler() {
    await applyCommon.call(this);
    let songs = await firebaseRequests.getRequest('', sessionStorage.getItem('token'));
    if (!songs) {
        songs = {};
    } else {
        let allSongs = Object.entries(songs).map(([id, value]) => ({ id, ...value }));
        let currentUserSongs = allSongs.filter(el => el.creator === sessionStorage.getItem('username'))
            .sort((a,b)=> b.likes - a.likes || b.listened - a.listened);
        currentUserSongs.forEach(el => el.isAuthor = true);
        let otherUsersSongs = allSongs.filter(el => el.creator !== sessionStorage.getItem('username'))
            .sort((a, b) => b.likes - a.likes);
        this.songs = otherUsersSongs.concat(currentUserSongs);
    }
    await this.partial('./templates/allSongs/allSongs.hbs');
}