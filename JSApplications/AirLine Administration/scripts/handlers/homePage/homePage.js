import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function homePageHandler() {
    await applyCommon.call(this);
    if (this.loggedIn) {
        let allFlights = await firebaseRequests.getRequest('flights', '', sessionStorage.getItem('token'));
        if (!allFlights) {
            allFlights = {}
        }
        let allFlightsArr = Object.entries(allFlights).map(([id, value]) => ({ id, ...value }));
        allFlightsArr.forEach(el => {
            if (el.addedBy === sessionStorage.getItem('username')) {
                el.isAuthor = true;
            }
        });
        this.flights = allFlightsArr;
    }
    await this.partial('./templates/main/mainPage.hbs');
}