import firebaseRequests from '../services/firebase-requests.js';
import { applyCommon } from '../common/common.js';

export async function allReceiptsHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/list/list.hbs');
}