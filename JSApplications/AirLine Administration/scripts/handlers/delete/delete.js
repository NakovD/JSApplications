import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
import { notificate } from '../services/notifications.js';

export async function deleteFlightHandler() {
    let flightId = document.location.href.split('/:')[1];
    notificate('loading');
    let deleteRequest = firebaseRequests.deleteRequest('flights', flightId, sessionStorage.getItem('token'));
    notificate('loading');
    notificate.apply(this, ['success', 'You deleted the flight successfully!', '#/home']);
}