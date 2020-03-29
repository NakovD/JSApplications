import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function createTrekHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/createTrek/createTrek.hbs');
    let locationField = document.querySelector("#main > form > div:nth-child(2) > input");
    let dateField = document.querySelector("#main > form > div:nth-child(3) > input");
    let descrField = document.querySelector("#main > form > div:nth-child(4) > textarea");
    let imageLinkField = document.querySelector("#main > form > div:nth-child(5) > input");
    let createTrekButton = document.querySelector("#main > form > button");
    createTrekButton.addEventListener('click', async (e) => {
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
            let putTrekInDatabase = await firebaseRequests.postRequest(`https://softunicourses.firebaseio.com/treks.json?auth=${sessionStorage.getItem('token')}`, trekObj);
            let treks = { nameTrek: locationField.value };
            let allTreks = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/treks.json?auth=${sessionStorage.getItem('token')}`);
            let neededTrek = Object.keys(allTreks).find(el => allTreks[el].location === trekObj.location);
            let trekObjId = { idTrek: neededTrek };
            let userInfoUpdate = await firebaseRequests.postRequest(`https://softunicourses.firebaseio.com/userInfo/${sessionStorage.getItem('userId')}.json?auth=${sessionStorage.getItem('token')}`, trekObjId);
            let createNot = document.querySelector("#successBox");
            createNot.textContent = 'You created a new trek.';
            createNot.style.display = 'block';
            createNot.addEventListener('click', () => {
                createNot.textContent = '';
                createNot.style.display = 'none';
            })
            setTimeout(() => {
                createNot.textContent = '';
                createNot.style.display = 'none';
            }, 5000);
            this.redirect('#/home');
        }
    })
}