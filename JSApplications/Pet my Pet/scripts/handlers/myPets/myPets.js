import {applyCommon} from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function myPetsViewHandler() {
    await applyCommon.call(this);
    let allPets = await firebaseRequests.getRequest('',sessionStorage.getItem('token'));
    if (!allPets) {
        allPets = {};
    }
    let allPetsArr = Object.entries(allPets).map(([id, value]) => ({ id, ...value }));
    let myPets = allPetsArr.filter(el => el.creator === sessionStorage.getItem('username'));
    this.pets = myPets;
    await this.partial('./templates/myPets/myPets.hbs');
}