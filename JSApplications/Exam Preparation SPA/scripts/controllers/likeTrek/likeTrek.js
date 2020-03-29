import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function likeTrekHandler() {
    let trekId = document.location.href.split('/:')[1];
    let trekInfo = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/treks/${trekId}.json?auth=${sessionStorage.getItem('token')}`);
    trekInfo.likes = trekInfo.likes + 1;
    let trekLikesUpdate = await firebaseRequests.putRequest(`https://softunicourses.firebaseio.com/treks/${trekId}.json?auth=${sessionStorage.getItem('token')}`, trekInfo);
    this.redirect(`#/details/:${trekId}`);
    let likeNot = document.querySelector("#successBox");
    likeNot.style.display = 'block';
    likeNot.textContent = 'You liked the trek successfully.';
    likeNot.addEventListener('click', () => {
        likeNot.textContent = '';
        likeNot.style.display = 'none';
    });
    setTimeout(() => {
        likeNot.textContent = '';
        likeNot.style.display = 'none';
    }, 5000)
}