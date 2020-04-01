import firebaseRequests from '../services/firebase-requests.js';

export async function removeSongHandler() {
    let songiD = document.location.href.split('/:')[1];
    let loadingNot = document.querySelector("#loadingBox");
    loadingNot.style.display = 'block';
    let deleteRequest = firebaseRequests.deleteRequest(songiD,sessionStorage.getItem('token'));
    loadingNot.style.display = 'none';
    let createNot = document.querySelector("#infoBox");
    createNot.textContent = 'Song removed successfully!';
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