import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function detailsMemeHandler() {
    await applyCommon.call(this);
    let idMeme = document.location.href.split('/:')[1];
    let neededMeme = await firebaseRequests.getRequest(idMeme,sessionStorage.getItem('token'));
    neededMeme.id = idMeme;
    this.id = neededMeme.id;
    this.name = neededMeme.name;
    this.description = neededMeme.description;
    this.imageLink = neededMeme.imageLink;
    this.creator = neededMeme.creator;
    this.partial('./templates/memeDetails/memeDetails.hbs');
}