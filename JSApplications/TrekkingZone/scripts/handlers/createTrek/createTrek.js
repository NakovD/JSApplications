import { applyCommon } from '../common/common.js';
import { notificate } from '../services/notifications.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function createTrekHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/createTrek/createTrek.hbs');
    let location = document.querySelector("#main > form > div:nth-child(2) > input");
    let date = document.querySelector("#main > form > div:nth-child(3) > input");
    let descriptionField = document.querySelector("#main > form > div:nth-child(4) > textarea");
    let trekImageLink = document.querySelector("#main > form > div:nth-child(5) > input");
    let createTrekButton = document.querySelector("#main > form > button");
    createTrekButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (location.value !== '' && descriptionField.value !== '' && trekImageLink.value !== '' && date.value !== '') {
            if (location.value.length < 6 || descriptionField.value.length < 10) {
                notificate('error','Trek name should be at least 6 characters long and description - 10')
            } else {
                let trekObj = {
                    location: location.value,
                    description: descriptionField.value,
                    imageLink: trekImageLink.value,
                    date: date.value,
                    organizer: sessionStorage.getItem('username'),
                    createdByID: sessionStorage.getItem('userId'),
                    likes: 0
                }
                notificate('loading');
                let putTrekInDatabase = await firebaseRequests.postRequest('treks','',sessionStorage.getItem('token'),trekObj);
                notificate('loading');
                notificate.apply(this, ['success', 'Trek created successfully.', '#/home']);
            }
        } else {
            notificate('error', 'Please fill all fields!');
        }
    });
}