import {applyCommon} from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
export async function profilePageHandler() {
    await applyCommon.call(this);
    let allIdeas = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/ideas.json?auth=${sessionStorage.getItem('token')}`);
    this.username = sessionStorage.getItem('username');
    let neededIdeas = Object.values(allIdeas).filter(el => el.creator === sessionStorage.getItem('username'));
    this.numIdeas = neededIdeas.length;
    this.currentUserIdeas = neededIdeas;
    await this.partial('./templates/profilePage/profilePage.hbs');
}