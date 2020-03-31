import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function deleteIdeaHandler() {
    let ideaId = document.location.href.split('/:')[1];
    let deleteRequest = await firebaseRequests.deleteRequest(`https://softunicourses.firebaseio.com/ideas/${ideaId}.json?auth=${sessionStorage.getItem('token')}`);
    let deleteNot = document.querySelector("#successBox");
    deleteNot.textContent = 'You deleted the idea successfully.';
    deleteNot.style.display = 'block';
    deleteNot.addEventListener('click', () => {
        deleteNot.style.display = 'none';
        this.redirect('#/home');
    });
    setTimeout(() => {
        if (deleteNot.style.display !== 'none') {
            deleteNot.style.display = 'none';
            this.redirect('#/home');
        }
    }, 5000);
}