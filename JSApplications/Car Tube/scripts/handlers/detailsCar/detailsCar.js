import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function detailsCarHandler() {
    await applyCommon.call(this);
    let idCar = document.location.href.split('/:')[1];
    let neededCar = await firebaseRequests.getRequest('cars',idCar,sessionStorage.getItem('token'));
    if (neededCar.seller === sessionStorage.getItem('username')) {
        this.isAuthor = true;
    }
    neededCar.id = idCar;
    this.id = neededCar.id;
    this.name = neededCar.name;
    this.fuelType = neededCar.fuelType;
    this.description = neededCar.description;
    this.imageLink = neededCar.imageLink;
    this.brand = neededCar.brand;
    this.year = neededCar.year;
    this.model = neededCar.model;
    this.price = neededCar.price;
    this.partial('./templates/details/details.hbs');
}