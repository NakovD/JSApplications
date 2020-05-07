import firebaseRequests from '../services/firebase-requests.js';
import { applyCommon } from '../common/common.js';
import { formDataExtractor } from '../services/formDataExtractor.js';
import { notificate } from '../services/notifications.js';

export async function registerHandler() {
    // await applyCommon.call(this);
    // await this.partial('./templates/registerPage/registerPage.hbs');
}
export async function logInHandler() {
    // await applyCommon.call(this);
    // await this.partial('./templates/loginPage/loginPage.hbs');
}
export async function logOutHandler() {
    await applyCommon.call(this);
    sessionStorage.clear();
    notificate('loading');
    firebase.auth().signOut();
    notificate('loading');
    notificate.apply(this, ['success', 'Log Out successfull!', '#/home']);
}