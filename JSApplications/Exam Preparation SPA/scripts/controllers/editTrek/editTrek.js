import firebaseRequests from '../services/firebase-requests.js';
import { applyCommon } from '../common/common.js';
export async function editTrekHandler() {
    await applyCommon.call(this);
    let trekId = document.location.href.split('/:')[1];
    await this.partial('./templates/editTrek/editTrek.hbs');
    let newLocationField = document.querySelector("#main > form > div:nth-child(1) > input")
    let newDateField = document.querySelector("#main > form > div:nth-child(1) > input");
    let newDescrField = document.querySelector("#main > form > div:nth-child(1) > input")
    let newImageLink = document.querySelector("#main > form > div:nth-child(4) > input")
    let editButton = document.querySelector("#main > form > button");
    editButton.addEventListener('click', async (e) => {
        e.preventDefault();
        let likesBefore = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/treks/${trekId}.json?auth=${sessionStorage.getItem('token')}`);
        if (newLocationField.value !== '' && newDateField.value !== '' && newDescrField.value !== '' && newImageLink.value !== '') {
            let objToSend = {
                location: newLocationField.value,
                createdBy: sessionStorage.getItem('userId'),
                date: newDateField.value,
                description: newDescrField.value,
                imageLink: newImageLink.value,
                organizer: sessionStorage.getItem('username'),
                likes: likesBefore.likes
            }
            let updateTrek = await firebaseRequests.putRequest(`https://softunicourses.firebaseio.com/treks/${trekId}.json?auth=${sessionStorage.getItem('token')}`, objToSend);
            this.redirect(`#/details/:${trekId}`);
            let updateNot = document.querySelector("#successBox");
            updateNot.textContent = 'Trek edited successfully.';
            updateNot.style.display = 'block';
            updateNot.addEventListener('click', () => {
                updateNot.textContent = '';
                updateNot.style.display = 'none';
            });
            setTimeout(() => {
                updateNot.textContent = '';
                updateNot.style.display = 'none';
            }, 5000);
        }
    });
}