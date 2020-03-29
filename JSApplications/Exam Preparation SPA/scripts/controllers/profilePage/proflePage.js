import {applyCommon} from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
export async function profilePageHandler() {
    await applyCommon.call(this);
    let allTreks = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/treks.json?auth=${sessionStorage.getItem('token')}`);
    this.username = sessionStorage.getItem('username');
    let neededTreks = Object.values(allTreks).filter(el => el.organizer === sessionStorage.getItem('username'));
    this.numTreks = neededTreks.length;
    this.currentUserTreks = neededTreks;
    await this.partial('./templates/profilePage/profilePage.hbs');
}
