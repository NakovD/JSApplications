import firebaseRequests from '../services/firebase-requests.js';

export async function applyCommon() {
    this.partials = {
        header: await this.load('./templates/headerNdFooter/header.hbs'),
        footer: await this.load('./templates/headerNdFooter/footer.hbs'),
        notifications: await this.load('./templates/notifications/notifications.hbs')
    }
    if (sessionStorage.getItem('loggedIn')) {
        this.loggedIn = true;
        this.username = sessionStorage.getItem('username');
        // let ideas = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/ideas.json?auth=${sessionStorage.getItem('token')}`);
        // if (!ideas) {
        //     ideas = []
        // } else {
        //     ideas = Object.entries(ideas).map(([id, value]) => ({ id, ...value }));
        // }
        // this.ideas = ideas;
    }
}

