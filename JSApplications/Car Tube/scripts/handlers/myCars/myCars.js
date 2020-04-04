import {applyCommon} from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function myCarsHandler() {
    await applyCommon.call(this);
    let allCars = await firebaseRequests.getRequest('cars','',sessionStorage.getItem('token'));
    if (!allCars) {
        allCars = {};
    }
    let allCarsArr = Object.entries(allCars).map(([id, value]) => ({ id, ...value }));
    let currentUserCars = allCarsArr.filter(el => el.seller === sessionStorage.getItem('username'));
    this.cars = currentUserCars;
    await this.partial('./templates/myCars/myCar.hbs');
}