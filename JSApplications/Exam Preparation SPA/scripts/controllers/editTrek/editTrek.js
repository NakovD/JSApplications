import firebaseRequests from '../services/firebase-requests.js';
import { applyCommon } from '../common/common.js';
export async function editTrekHandler() {
    await applyCommon.call(this);
    let trekId = document.location.href.split('/:')[1];
    await this.partial('./templates/editTrek/editTrek.hbs');
    let newLocationField = document.querySelector("body > form > div:nth-child(1) > input");
    let newDateField = document.querySelector("body > form > div:nth-child(2) > input");
    let newDescrField = document.querySelector("body > form > div:nth-child(3) > textarea");
    let newImageLink = document.querySelector("body > form > div:nth-child(4) > input");
    let editButton = document.querySelector("body > form > button");
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
            let updateTrek = await firebaseRequests.putRequest(`https://softunicourses.firebaseio.com/treks/${trekId}.json?auth=${sessionStorage.getItem('token')}`,objToSend);
            let userInfo = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/userInfo/${sessionStorage.getItem('userId')}.json?auth=${sessionStorage.getItem('token')}`);
            let neededTrek = Object.keys(userInfo).find(el => userInfo[el].nameTrek === likesBefore.location);
            userInfo[neededTrek].nameTrek = newLocationField.value;
            let obj = userInfo[neededTrek];        
            await firebaseRequests.patchRequest(`https://softunicourses.firebaseio.com/userInfo/${sessionStorage.getItem('userId')}/${neededTrek}.json?auth=${sessionStorage.getItem('token')}`,obj);
            this.redirect(`#/details/:${trekId}`);
        }
    });
}