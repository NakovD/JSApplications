import firebaseRequests from '../services/firebase-requests.js';
import { applyCommon } from '../common/common.js';
import {notificate} from '../services/notifications.js';

export async function detailsTrekHandler() {
    await applyCommon.call(this);
    let trekId = document.location.href.split('/:')[1];
    let trekInfo = await firebaseRequests.getRequest('treks',trekId,sessionStorage.getItem('token'));
    this.id = trekId;
    let { location, description,date,likes,organizer,imageLink } = trekInfo;
    this.location = location;
    this.description = description;
    this.imageLink = imageLink
    this.organizer = organizer;
    this.date = date;
    this.likes = likes;
    if (trekInfo.organizer === sessionStorage.getItem('username')) {
        this.isAuthor = true;
    }
    await this.partial('./templates/trekDetails/trekDetails.hbs');
}