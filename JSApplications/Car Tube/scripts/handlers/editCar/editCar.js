import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
import {notificate} from '../services/notifications.js';

export async function editCarHandler() {
    await applyCommon.call(this);
    let carId = document.location.href.split('/:')[1];
    await this.partial('./templates/editCar/editCar.hbs');
    let carTitle = document.querySelector("#edit-listing > form > div > input[type=text]:nth-child(6)");
    let carDescr = document.querySelector("#edit-listing > form > div > input[type=text]:nth-child(8)");
    let carBrand = document.querySelector("#edit-listing > form > div > input[type=text]:nth-child(10)");
    let carModel = document.querySelector("#edit-listing > form > div > input[type=text]:nth-child(12)");
    let carYear = document.querySelector("#edit-listing > form > div > input[type=number]:nth-child(14)");
    let carImageLink = document.querySelector("#edit-listing > form > div > input[type=text]:nth-child(16)");
    let carFuelType = document.querySelector("#edit-listing > form > div > input[type=text]:nth-child(18)");
    let carPrice = document.querySelector("#edit-listing > form > div > input[type=number]:nth-child(20)")
    let editCarButton = document.querySelector("#edit-listing > form > div > button");
    editCarButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (carTitle.value !== '' && carDescr.value !== '' && carBrand.value !== '' && carModel.value !== ''
            && carYear.value !== '' && carImageLink.value !== '' && carFuelType.value !== '' && carPrice.value !== '') {
            let carObj = {
                name: carTitle.value,
                description: carDescr.value,
                brand: carBrand.value,
                model: carModel.value,
                year: carYear.value,
                imageLink: carImageLink.value,
                fuelType: carFuelType.value,
                price: carPrice.value,
            }
            notificate('loading');
            let updateCarInDatabase = await firebaseRequests.patchRequest('cars',carId,sessionStorage.getItem('token'),carObj);
            notificate('loading');
            notificate.apply(this, ['success','You updated the car!','#/home'])
        } else {
            notificate('error', 'Please fill all fields!');
        }
    });
}