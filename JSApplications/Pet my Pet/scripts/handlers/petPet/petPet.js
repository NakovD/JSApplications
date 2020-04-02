import {applyCommon} from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function petPetHandler() {
    let petId = document.location.href.split('/:')[1];
    let getPets = await firebaseRequests.getRequest(petId,sessionStorage.getItem('token'));
    let updateLikes = await firebaseRequests.patchRequest(petId,sessionStorage.getItem('token'),{likes:getPets.likes + 1});
    this.redirect('#/dashboard');
}