import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function detailsPetHandler() {
    await applyCommon.call(this);
    let idPet = document.location.href.split('/:')[1];
    let neededPet = await firebaseRequests.getRequest(idPet,sessionStorage.getItem('token'));
    neededPet.id = idPet;
    this.id = neededPet.id;
    this.name = neededPet.name;
    this.type = neededPet.type;
    this.description = neededPet.description;
    this.imageLink = neededPet.imageLink;
    this.likes = neededPet.likes;
    if (sessionStorage.getItem('username') === neededPet.creator) {
        await this.partial('./templates/myPet/myPet.hbs');
    }else {
        await this.partial('./templates/otherPet/otherPet.hbs');
    }
}