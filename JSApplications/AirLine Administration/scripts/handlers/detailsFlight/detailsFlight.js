import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
import { notificate } from '../services/notifications.js';

export async function detailsFlightHandler() {
    await applyCommon.call(this);
    let idFlight = document.location.href.split('/:')[1];
    let neededFlight = await firebaseRequests.getRequest('flights',idFlight,sessionStorage.getItem('token'));
    if (neededFlight.addedBy === sessionStorage.getItem('username')) {
        this.isAuthor = true;
    }
    this.id = idFlight;
    this.destination = neededFlight.destination;
    this.origin = neededFlight.origin;
    this.numSeats = neededFlight.numSeats;
    this.costPerSeat = neededFlight.costPerSeat;
    this.departureDate = neededFlight.departureDate;
    this.departureTime = neededFlight.departureTime;
    await this.partial('./templates/details/details.hbs');
}