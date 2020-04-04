import {applyCommon} from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function homePageHandler() {
    await applyCommon.call(this);
    let allTreks = await firebaseRequests.getRequest('treks','',sessionStorage.getItem('token'));
    if (!allTreks) {
        allTreks = {};
    }
    let allTreksArr = Object.entries(allTreks).map(([id,value])=> ({id,...value}))
    this.treks = allTreksArr.sort((a,b) => b.likes - a.likes);
    await this.partial('./templates/main/mainPage.hbs');
}