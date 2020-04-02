import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
export async function addPetHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/createPet/createPet.hbs');
    let petName = document.querySelector("#name");
    let petDescr = document.querySelector("#description");
    let petImageLink = document.querySelector("#image");
    let typePet = document.querySelector("#main > section > form > fieldset > p:nth-child(5) > span > select");
    let createPetButton = document.querySelector("#main > section > form > fieldset > input");
    createPetButton.addEventListener('click', async (e) => {
        e.preventDefault();
        let loadingNot = document.querySelector("#loadingBox");
        if (petName.value !== '' && petImageLink.value !== '' && petDescr.value !== '') {
                let petObj = {
                    name: petName.value,
                    description: petDescr.value,
                    type: typePet.value,
                    likes: 0,
                    imageLink: petImageLink.value,
                    creator: sessionStorage.getItem('username'),
                    createdByID: sessionStorage.getItem('userId'),
                }
                loadingNot.style.display = 'block';
                let putPetInDatabase = await firebaseRequests.postRequest('',sessionStorage.getItem('token'),petObj);
                loadingNot.style.display = 'none';
                let createNot = document.querySelector("#infoBox");
                createNot.textContent = 'You created a new Pet.';
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
            let errorNot = document.querySelector("#errorBox");
            errorNot.textContent = 'All fields must be filled!';
            errorNot.style.display = 'block';
            errorNot.addEventListener('click', () => {
                errorNot.style.display = 'none';
                this.redirect('#/createPet');
            });
        }
    });
}