import { applyCommon } from '../common/common.js';
import { notificate } from '../services/notifications.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function addFlightHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/addFlight/addFlight.hbs');
    let destination = document.querySelector("#formAddFlight > input[type=text]:nth-child(2)");
    let origin = document.querySelector("#formAddFlight > input[type=text]:nth-child(4)");
    let departureDate = document.querySelector("#formAddFlight > input[type=date]:nth-child(6)");
    let departureTime = document.querySelector("#formAddFlight > input[type=time]:nth-child(8)");
    let numSeats = document.querySelector("#formAddFlight > input[type=number]:nth-child(10)");
    let costPerSeat = document.querySelector("#formAddFlight > input[type=number]:nth-child(12)");
    let imageLink = document.querySelector("#formAddFlight > input[type=text]:nth-child(14)");
    let isPublic = document.querySelector("#formAddFlight > input[type=checkbox]:nth-child(16)");
    let createFlightButton = document.querySelector("#formAddFlight > input.create");
    createFlightButton.addEventListener('click', async (e) => {
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
                    addedBy: sessionStorage.getItem('username')
                }
                notificate('loading');
                let putFlightInDatabase = await firebaseRequests.postRequest('flights', '', sessionStorage.getItem('token'), flightInfo);
                notificate('loading');
                notificate.apply(this, ['success', 'You added a new flight!', '#/home'])
            } else {
                notificate('error', 'Number of seats and cost per seat must be a positive number!');
            }

        } else {
            notificate('error', 'Please fill all fields!');
        }
    });
} 