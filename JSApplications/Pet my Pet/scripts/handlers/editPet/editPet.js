import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function editPetHandler() {
    await applyCommon.call(this);
    let petId = document.location.href.split('/:')[1];
    let petInfo = await firebaseRequests.getRequest(petId, sessionStorage.getItem('token'));
    this.name = petInfo.name;
    this.description = petInfo.description;
    this.imageLink = petInfo.imageLink;
    this.likes = petInfo.likes;
    await this.partial('./templates/detailsMyPet/detailsMyPet.hbs');
    let textArea = document.querySelector("#main > section > form > textarea");
    let saveButton = document.querySelector("#main > section > form > button");
    saveButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (textArea.value !== '') {
            let loadingNot = document.querySelector("#loadingBox");
            loadingNot.style.display = 'block';
            let updateRequest = await firebaseRequests.patchRequest(petId, sessionStorage.getItem('token'), { description: textArea.value });
            loadingNot.style.display = 'none';
            this.redirect('#/dashboard')
        } else {
            let createNot = document.querySelector("#errorBox");
            createNot.textContent = 'Please fullfill the text area!';
            createNot.style.display = 'block';
            createNot.addEventListener('click', () => {
                createNot.style.display = 'none';
                this.redirect('#/myPets')
            });
        }
    })

}