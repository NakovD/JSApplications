import firebaseRequests from '../services/firebase-requests.js';
import { notificate } from '../services/notifications.js';
import { applyCommon } from '../common/common.js';

export async function likeTrekHandler() {
    await applyCommon.call(this);
    let trekId = document.location.href.split('/:')[1];
    notificate('loading');
    let trekInfo = await firebaseRequests.getRequest('treks', trekId, sessionStorage.getItem('token'));
    let updatedLikes = +trekInfo.likes + 1;
    let patchRequest = await firebaseRequests.patchRequest('treks', trekId, sessionStorage.getItem('token'), { likes: updatedLikes });
    notificate('loading');
    notificate.apply(this, ['success', 'You liked the trek successfully.', `#/details/:${trekId}`]);
}