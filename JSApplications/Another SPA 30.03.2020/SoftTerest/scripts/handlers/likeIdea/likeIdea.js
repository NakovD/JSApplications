import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function likeIdeaHandler() {
    let ideaId = document.location.href.split('/:')[1];
    let ideaInfo = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/ideas/${ideaId}.json?auth=${sessionStorage.getItem('token')}`);
    ideaInfo.likes = ideaInfo.likes + 1;
    let ideaLikesUpdate = await firebaseRequests.putRequest(`https://softunicourses.firebaseio.com/ideas/${ideaId}.json?auth=${sessionStorage.getItem('token')}`, ideaInfo);
    let likeNot = document.querySelector("#successBox");
    likeNot.style.display = 'block';
    likeNot.textContent = 'You liked the idea successfully.';
    likeNot.addEventListener('click', () => {
        likeNot.style.display = 'none';
        this.redirect(`#/details/:${ideaId}`);
    });
    setTimeout(() => {
        likeNot.style.display = 'none';
        this.redirect(`#/details/:${ideaId}`);
    }, 5000)
}