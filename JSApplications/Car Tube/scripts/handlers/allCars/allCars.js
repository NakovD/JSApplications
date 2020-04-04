import { applyCommon } from '../common/common.js';
import { notificate } from '../services/notifications.js';
import firebaseRequests from '../services/firebase-requests.js';
export async function allCarsHandler() {
    await applyCommon.call(this);
    let allCars = await firebaseRequests.getRequest('cars', '', sessionStorage.getItem('token'));
    if (!allCars) {
        allCars = {}
    }
    let allCarsArr = Object.entries(allCars).map(([id, value]) => ({ id, ...value }));
    allCarsArr.forEach(el => {
        if (el.seller === sessionStorage.getItem('username')) {
            el.isAuthor = true;
        }
    });
    this.cars = allCarsArr;
    await this.partial('./templates/carList/carList.hbs');
}