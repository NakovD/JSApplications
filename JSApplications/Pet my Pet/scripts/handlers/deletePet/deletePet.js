import firebaseRequests from '../services/firebase-requests.js';

export async function deletePetHandler() {
    let petiD = document.location.href.split('/:')[1];
    let loadingNot = document.querySelector("#loadingBox");
    loadingNot.style.display = 'block';
    let deleteRequest = firebaseRequests.deleteRequest(petiD,sessionStorage.getItem('token'));
    loadingNot.style.display = 'none';
    let createNot = document.querySelector("#infoBox");
    createNot.textContent = 'Pet removed successfully!';
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