import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
export async function createCauseHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/createCause/createCause.hbs');
    let causeTitle = document.querySelector("#defaultFormNameModalEx");
    let descriptionField = document.querySelector("#defaultFormMessageModalEx");
    let causeImageLink = document.querySelector("#defaultFormEmailModalEx");
    let neededFunds = document.querySelector("#defaultFormSubjectModalEx");
    let createCauseButton = document.querySelector("#main > div > div.modal-body > form > div > button");
    createCauseButton.addEventListener('click', async (e) => {
        e.preventDefault();
        let loadingNot = document.querySelector("#loadingNotification");
        if (causeTitle.value !== '' && descriptionField.value !== '' && causeImageLink.value !== '' && neededFunds.value !== '') {
            if (+neededFunds.value) {
                let CauseObj = {
                    title: causeTitle.value,
                    description: descriptionField.value,
                    imageLink: causeImageLink.value,
                    neededFunds: +neededFunds.value,
                    creator: sessionStorage.getItem('username'),
                    collectedFunds: 0,
                    createdByID: sessionStorage.getItem('userId'),
                    donors: []
                }
                loadingNot.style.display = 'block';
                let putCauseInDatabase = await firebaseRequests.postRequest(`https://softunicourses.firebaseio.com/causes.json?auth=${sessionStorage.getItem('token')}`, CauseObj);
                loadingNot.style.display = 'none';
                let createNot = document.querySelector("#successNotification");
                createNot.textContent = 'You created a new Cause.';
                createNot.style.display = 'block';
                createNot.addEventListener('click', () => {
                    createNot.style.display = 'none';
                    this.redirect('#/home');
                });
                setTimeout(() => {
                    if (createNot.style.display !== 'none') {
                        createNot.style.display = 'none';
                        this.redirect('#/home');
                    }
                }, 5000);
            } else {
                loadingNot.style.display = 'none';
                let errorNot = document.querySelector("#errorNotification");
                errorNot.textContent = 'Needed funds must be a number!';
                errorNot.style.display = 'block';
                errorNot.addEventListener('click', () => {
                    errorNot.style.display = 'none';
                    this.redirect('#/createCause');
                });
            }
        } else {
            let errorNot = document.querySelector("#errorNotification");
            errorNot.textContent = 'All fields must be filled!';
            errorNot.style.display = 'block';
            errorNot.addEventListener('click', () => {
                errorNot.style.display = 'none';
                this.redirect('#/createCause');
            });
        }
    });
}