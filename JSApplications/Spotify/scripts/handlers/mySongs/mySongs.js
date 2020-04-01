import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function mySongsHandler() {
    await applyCommon.call(this);
    let allSongsObj = await firebaseRequests.getRequest('', sessionStorage.getItem('token'));
    if (!allSongsObj) {
        allSongsObj = {};
    } else {
        let allSongsArr = Object.entries(allSongsObj).map(([id, value]) => ({ id, ...value }));
        let currentUserSongs = allSongsArr.filter(el => el.creator === sessionStorage.getItem('username'))
            .sort((a, b) => b.likes - a.likes || b.listened - a.listened);
        currentUserSongs.forEach(el => el.isAuthor = true);
        this.songs = currentUserSongs;
    }
    this.partial('./templates/mySongs/mySongs.hbs');
}