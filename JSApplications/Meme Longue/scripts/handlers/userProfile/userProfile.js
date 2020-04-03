import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function userProfileViewHandler() {
    await applyCommon.call(this);
    let usernameOfDude = document.location.href.split('/:')[1];
    let usersInfo = await fetch(`https://softunicourses.firebaseio.com/userInfo.json?auth=${sessionStorage.getItem('token')}`)
    .then(r => r.json());
    let userWanted = Object.values(usersInfo).find(el => el.username === usernameOfDude);
    let isAuthor;
    if (userWanted.username === sessionStorage.getItem('username')) {
        isAuthor = true;
        this.isAuthor = true;
    }
    this.otherUser = userWanted.username;
    this.otherUserEmail = userWanted.email;
    let allMemes = await firebaseRequests.getRequest('',sessionStorage.getItem('token'));
    allMemes = Object.entries(allMemes).map(([id, value]) => ({ id, ...value }));
    allMemes.forEach(el => {
        if (el.creator === sessionStorage.getItem('username')) {
            el.isAuthor = true;
        }
    });
    let currentUserMemes = Object.values(allMemes).filter(el => el.creator === userWanted.username);
    this.memes = currentUserMemes;
    await this.partial('./templates/userProfile/userProfile.hbs');
}