import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
export async function likeSongHandler() {
    let currentSongId = document.location.href.split('/:')[1];
    let loadingNot = document.querySelector("#loadingBox");
    loadingNot.style.display = 'block';
    let getRequest = await firebaseRequests.getRequest(currentSongId, sessionStorage.getItem('token'));
    let currentLikes = getRequest.likes;
    let updatedLikes = currentLikes + 1;
    let updateRequest = await firebaseRequests.patchRequest(currentSongId, sessionStorage.getItem('token'), { likes: updatedLikes });
    loadingNot.style.display = 'none';
    let createNot = document.querySelector("#infoBox");
    createNot.textContent = 'Liked!';
    createNot.style.display = 'block';
    createNot.addEventListener('click', () => {
        createNot.style.display = 'none';
        this.redirect('#/allSongs')
    });
    setTimeout(() => {
        if (createNot.style.display !== 'none') {
            createNot.style.display = 'none';
            this.redirect('#/allSongs')
        }
    }, 5000);
}