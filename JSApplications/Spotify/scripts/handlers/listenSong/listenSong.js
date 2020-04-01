import firebaseRequest from '../services/firebase-requests.js';

export async function listenSongHandler() {
    let currentSongId = document.location.href.split('/:')[1];
    let loadingNot = document.querySelector("#loadingBox");
    loadingNot.style.display = 'block';
    let getRequest = await firebaseRequest.getRequest(currentSongId,sessionStorage.getItem('token'));
    let currentTimesListened = getRequest.listened;
    let updateListened = currentTimesListened + 1;
    let patchRequest = await firebaseRequest.patchRequest(currentSongId,sessionStorage.getItem('token'),{listened:updateListened});
    loadingNot.style.display = 'none';
    let createNot = document.querySelector("#infoBox");
    createNot.textContent = `You just listened ${getRequest.title}`;
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
    }, 5000)
}