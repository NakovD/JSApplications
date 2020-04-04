import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function profilePageHandler() {
    await applyCommon.call(this);
    let allTreks = await firebaseRequests.getRequest('treks','',sessionStorage.getItem('token'));
    if (!allTreks) {
        allTreks = {};
    }
    let currentUserTreks = Object.values(allTreks).filter(el => el.organizer === sessionStorage.getItem('username'));
    console.log(currentUserTreks);
    this.numTreks = currentUserTreks.length;
    this.treks = currentUserTreks;
    await this.partial('./templates/profilePage/profilePage.hbs');
}