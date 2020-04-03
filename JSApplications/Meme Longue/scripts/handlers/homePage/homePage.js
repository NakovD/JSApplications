import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function homePageHandler() {
    await applyCommon.call(this);
    if (sessionStorage.getItem('loggedIn')) {
        let allMemes = await firebaseRequests.getRequest('', sessionStorage.getItem('token'));
        if (!allMemes) {
            allMemes = {};
        }
        let memesArr = Object.entries(allMemes).map(([id, value]) => ({ id, ...value }));
        memesArr.forEach(el => {
            if (el.creator === sessionStorage.getItem('username')) {
                el.isAuthor = true;
            }
        });
        this.memes = memesArr;
    }
    await this.partial('./templates/main/mainPage.hbs');
}