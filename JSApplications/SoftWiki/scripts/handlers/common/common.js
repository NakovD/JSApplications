import firebaseRequests from '../services/firebase-requests.js';

export async function applyCommon() {
    this.partials = {
        header: await this.load('./templates/headerNdFooter/header.hbs'),
        footer: await this.load('./templates/headerNdFooter/footer.hbs'),
    }
    if (sessionStorage.getItem('loggedIn')) {
        this.loggedIn = true;
        this.username = sessionStorage.getItem('username');
    }
}

