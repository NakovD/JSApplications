import firebaseRequests from '../services/firebase-requests.js';
import { notificate } from '../services/notifications.js';

export async function deleteCarHandler() {
    let cariD = document.location.href.split('/:')[1];
    notificate('loading');
    let deleteRequest = firebaseRequests.deleteRequest('cars', cariD, sessionStorage.getItem('token'));
    notificate('loading');
    notificate.apply(this,['success','You deleted the car successfully!','#/allCars']);
}