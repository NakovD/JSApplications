import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
import { notificate } from '../services/notifications.js';


export async function editFlightHandler() {
    await applyCommon.call(this);
    let flightId = document.location.href.split('/:')[1];
    let flightInfo = await firebaseRequests.getRequest('flights',flightId,sessionStorage.getItem('token'));
    this.destination = flightInfo.destination;
    this.origin = flightInfo.origin;
    this.numSeats = flightInfo.numSeats;
    this.costPerSeat = flightInfo.costPerSeat;
    this.departureDate = flightInfo.departureDate;
    this.departureTime = flightInfo.departureTime;
    this.imageLink = flightInfo.imageLink;
    if (flightInfo.isPublic) {
        this.isPublic = 'checked'
    }else {
        this.isPublic = 'unchecked';
    }
    await this.partial('./templates/edit/edit.hbs');
    let destination = document.querySelector("#formEditFlight > input[type=text]:nth-child(2)");
    let origin = document.querySelector("#formEditFlight > input[type=text]:nth-child(4)");
    let departureDate = document.querySelector("#tt");
    let departureTime = document.querySelector("#formEditFlight > input[type=time]:nth-child(8)");
    let numSeats = document.querySelector("#formEditFlight > input[type=number]:nth-child(10)");
    let costPerSeat = document.querySelector("#formEditFlight > input[type=number]:nth-child(12)");
    let imageLink = document.querySelector("#formEditFlight > input[type=text]:nth-child(14)");
    let isPublic = document.querySelector("#formEditFlight > input[type=checkbox]:nth-child(16)");
    let editFlightButton = document.querySelector("#formEditFlight > input.save-changes");
    editFlightButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (destination.value !== '' && origin.value !== '' && numSeats.value !== '' && costPerSeat.value !== '' && imageLink.value !== '') {
            if ((+numSeats.value && +numSeats.value > 0) || (+costPerSeat.value && +costPerSeat > 0)) {
                let flightInfo = {
                    destination: destination.value,
                    origin: origin.value,
                    departureDate: departureDate.value,
                    departureTime: departureTime.value,
                    numSeats: +numSeats.value,
                    costPerSeat: +costPerSeat.value,
                    imageLink: imageLink.value,
                    isPublic: isPublic.checked,
                    EditedBy: sessionStorage.getItem('username')
                }
                notificate('loading');
                let EditFlightInDatabase = await firebaseRequests.patchRequest('flights', flightId, sessionStorage.getItem('token'), flightInfo);
                notificate('loading');
                notificate.apply(this, ['success', 'You edited the flight!', '#/home'])
            } else {
                notificate('error', 'Number of seats and cost per seat must be a positive number!');
            }

        } else {
            notificate('error', 'Please fill all fields!');
        }
    })
}