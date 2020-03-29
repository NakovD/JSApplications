import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function deleteTrekHandler() {
    let trekId = document.location.href.split('/:')[1];
    let deleteRequest = await firebaseRequests.deleteRequest(`https://softunicourses.firebaseio.com/treks/${trekId}.json?auth=${sessionStorage.getItem('token')}`);
    let updateUserInfo = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/userInfo/${sessionStorage.getItem('userId')}.json?auth=${sessionStorage.getItem('token')}`);
    let neededTrek = Object.keys(updateUserInfo).find(el => updateUserInfo[el].idTrek === trekId);
    await firebaseRequests.deleteRequest(`https://softunicourses.firebaseio.com/userInfo/${sessionStorage.getItem('userId')}/${neededTrek}.json?auth=${sessionStorage.getItem('token')}`);
    this.redirect('#/home');
    let deleteNot = document.querySelector("#successBox");
    deleteNot.textContent = 'You closed the trek successfully.';
    deleteNot.style.display = 'block';
    deleteNot.addEventListener('click', () => {
        deleteNot.textContent = '';
        deleteNot.style.display = 'none';
    })
    setTimeout(() => {
        deleteNot.textContent = '';
        deleteNot.style.display = 'none';
    }, 5000);
}