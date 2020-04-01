import firebaseRequests from '../services/firebase-requests.js';

export async function applyCommon() {
    this.partials = {
        header: await this.load('./templates/headerNdFooter/header.hbs'),
        footer: await this.load('./templates/headerNdFooter/footer.hbs'),
        notifications: await this.load('./templates/notifications/notifications.hbs')
    }
    if (sessionStorage.getItem('loggedIn')) {
        this.username = sessionStorage.getItem('username');
        this.loggedIn = true;
    }
    //other stuff;


}

