import {applyCommon} from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function createTrekHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/createTrek/createTrek.hbs');
    let locationField = document.querySelector("body > form > div:nth-child(2) > input");
    let dateField = document.querySelector("body > form > div:nth-child(3) > input");
    let descrField = document.querySelector("body > form > div:nth-child(4) > textarea");
    let imageLinkField = document.querySelector("body > form > div:nth-child(5) > input");
    let createTrekButton = document.querySelector("body > form > button");
    createTrekButton.addEventListener('click',async (e)=> {
        e.preventDefault();
        if (locationField.value !== '' && dateField.value !== '' && descrField.value !== '' && imageLinkField.value !== '') {
            let trekObj = {
                location: locationField.value,
                date: dateField.value,
                description: descrField.value,
                imageLink: imageLinkField.value,
                organizer: sessionStorage.getItem('username'),
                likes: 0,
                createdBy: sessionStorage.getItem('userId')
            }
            let putTrekInDatabase = await firebaseRequests.postRequest(`https://softunicourses.firebaseio.com/treks.json?auth=${sessionStorage.getItem('token')}`,trekObj);
            let treks = {nameTrek: locationField.value};
            let userInfoUpdate = await firebaseRequests.postRequest(`https://softunicourses.firebaseio.com/userInfo/${sessionStorage.getItem('userId')}.json?auth=${sessionStorage.getItem('token')}`,treks);
            this.redirect('#/home');
        }
    })
}