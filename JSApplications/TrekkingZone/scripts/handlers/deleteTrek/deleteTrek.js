import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
import { notificate } from '../services/notifications.js';

export async function deleteTrekHandler() {
    let trekId = document.location.href.split('/:')[1];
    notificate('loading');
    let deleteRequest = await firebaseRequests.deleteRequest('treks',trekId,sessionStorage.getItem('token'));
    notificate('loading');
    notificate.apply(this,['success','You closed the trek successfully.','#/home']);
}