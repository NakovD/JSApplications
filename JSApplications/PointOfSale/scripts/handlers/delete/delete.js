import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
import { notificate } from '../services/notifications.js';

export async function deleteEntryHandler() {
    await applyCommon.call(this);
    let deleteEntryButton = document.querySelector("#active-entries > div > div.col.right > a");
    let row = deleteEntryButton.parentNode.parentNode;
    
}