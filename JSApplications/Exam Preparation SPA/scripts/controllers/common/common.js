import firebaseRequests from "../services/firebase-requests.js";

export async function applyCommon() {
    this.partials = {
        header: await this.load('./templates/headerAndFooters/header.hbs'),
        footer: await this.load('./templates/headerAndFooters/footer.hbs')
    }
    if (sessionStorage.getItem('loggedIn')) {
        this.loggedIn = true;
        let treks = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/treks.json?auth=${sessionStorage.getItem('token')}`);
        if (!treks) {
            treks = []
        } else {
            treks = Object.entries(treks).map(([id, value]) => ({ id, ...value }));
            // console.log(treks);
        }
        this.treks = treks;
    }
    if (sessionStorage.hasOwnProperty('username')) {
        this.username = sessionStorage.getItem('username');
    }
}