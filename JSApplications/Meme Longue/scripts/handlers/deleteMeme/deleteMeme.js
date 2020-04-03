import firebaseRequests from '../services/firebase-requests.js';

export async function deleteMemeHandler() {
    let memeId = document.location.href.split('/:')[1];
    let loadingNot = document.querySelector("#loadingBox");
    loadingNot.style.display = 'block';
    let deleteRequest = firebaseRequests.deleteRequest(memeId,sessionStorage.getItem('token'));
    loadingNot.style.display = 'none';
    let createNot = document.querySelector("#infoBox");
    createNot.textContent = 'Meme removed successfully!';
    createNot.style.display = 'block';
    createNot.addEventListener('click', () => {
        createNot.style.display = 'none';
        this.redirect('#/home')
    });
    setTimeout(() => {
        if (createNot.style.display !== 'none') {
            createNot.style.display = 'none';
            this.redirect('#/home')
        }
    }, 5000);
}