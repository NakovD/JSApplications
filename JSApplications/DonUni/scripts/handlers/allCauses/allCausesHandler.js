import {applyCommon} from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
export async function allCausesHandler() {
    await applyCommon.call(this);
    let causes = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/causes.json?auth=${sessionStorage.getItem('token')}`);
    if (!causes) {
        causes = {};
    }
    let arrCauses = Object.entries(causes).map(([id,value])=> ({id,...value}));
    this.causes = arrCauses;
    await this.partial('./templates/dashboard/dashboard.hbs');
}