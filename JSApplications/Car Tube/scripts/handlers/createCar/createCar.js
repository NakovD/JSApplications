import { applyCommon } from '../common/common.js';
import { notificate } from '../services/notifications.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function createCarHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/createCar/createCar.hbs');
    let carTitle = document.querySelector("#create-listing > form > div > input[type=text]:nth-child(5)");
    let carDescr = document.querySelector("#create-listing > form > div > input[type=text]:nth-child(7)");
    let carBrand = document.querySelector("#create-listing > form > div > input[type=text]:nth-child(9)");
    let carModel = document.querySelector("#create-listing > form > div > input[type=text]:nth-child(11)");
    let carYear = document.querySelector("#create-listing > form > div > input[type=number]:nth-child(13)");
    let carImageLink = document.querySelector("#create-listing > form > div > input[type=text]:nth-child(15)");
    let carFuelType = document.querySelector("#create-listing > form > div > input[type=text]:nth-child(17)");
    let carPrice = document.querySelector("#create-listing > form > div > input[type=number]:nth-child(19)");
    let createCarButton = document.querySelector("#create-listing > form > div > button");
    createCarButton.addEventListener('click', async (e) => {
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
                seller: sessionStorage.getItem('username'),

            }
            notificate('loading');
            let putCarInDatabase = await firebaseRequests.postRequest('cars','',sessionStorage.getItem('token'),carObj);
            notificate('loading');
            notificate.apply(this, ['success','You created a new Car!','#/home'])
        } else {
            notificate('error', 'Please fill all fields!');
        }
    });
}