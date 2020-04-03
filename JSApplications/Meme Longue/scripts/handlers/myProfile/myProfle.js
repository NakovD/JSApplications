import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function myProfileViewHandler() {
    await applyCommon.call(this);
    this.isAuthor = true;
    this.otherUser = sessionStorage.getItem('username');
    this.otherUserEmail = sessionStorage.getItem('email');
    let allMemes = await firebaseRequests.getRequest('', sessionStorage.getItem('token'));
    allMemes = Object.entries(allMemes).map(([id, value]) => ({ id, ...value }));
    allMemes.forEach(el => {
        if (el.creator === sessionStorage.getItem('username')) {
            el.isAuthor = true;
        }
    });
    let currentUserMemes = Object.values(allMemes).filter(el => el.creator === sessionStorage.getItem('username'));
    this.memes = currentUserMemes;
    await this.partial('./templates/userProfile/userProfile.hbs');
}