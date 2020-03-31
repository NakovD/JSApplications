import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function deleteCauseHandler() {
    let causeId = document.location.href.split('/:')[1];
    let loadingNot = document.querySelector("#loadingNotification");
    loadingNot.style.display = 'block';
    let deleteRequest = await firebaseRequests.deleteRequest(`https://softunicourses.firebaseio.com/causes/${causeId}.json?auth=${sessionStorage.getItem('token')}`);
    loadingNot.style.display = 'none';
    let deleteNot = document.querySelector("#errorNotification");
    deleteNot.textContent = 'You deleted the cause successfully.';
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