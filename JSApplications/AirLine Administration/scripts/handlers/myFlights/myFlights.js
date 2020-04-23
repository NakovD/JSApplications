import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';


export async function myFlightsHandler() {
    await applyCommon.call(this);
    let allFlights = await firebaseRequests.getRequest('flights', '', sessionStorage.getItem('token'));
    if (!allFlights) {
        allFlights = {};
    }
    let allFlightsArr = Object.entries(allFlights).map(([id, value]) => ({ id, ...value }));
    let currentUserFlights = allFlightsArr.filter(el => el.addedBy === sessionStorage.getItem('username'));
    this.flights = currentUserFlights;
    await this.partial('./templates/myFlights/myFlights.hbs');
}