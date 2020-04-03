import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function editMemeHandler() {
    await applyCommon.call(this);
    let memeId = document.location.href.split('/:')[1];
    let memeInfo = await firebaseRequests.getRequest(memeId, sessionStorage.getItem('token'));
    this.name = memeInfo.name;
    this.description = memeInfo.description;
    this.imageLink = memeInfo.imageLink;
    await this.partial('./templates/editMeme/editMeme.hbs');
    let titleField = document.querySelector("#edit-meme > form > div > input[type=text]:nth-child(3)");
    let descriptionField = document.querySelector("#edit-meme > form > div > input[type=text]:nth-child(5)");
    let imageLinkField = document.querySelector("#edit-meme > form > div > input[type=text]:nth-child(7)");
    let editMemeButton = document.querySelector("#edit-meme > form > div > button");
    editMemeButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (titleField.value !== '') {
            let loadingNot = document.querySelector("#loadingBox");
            loadingNot.style.display = 'block';
            let editedMemeObj = {
                name: titleField.value,
                description: descriptionField.value,
                imageLink: imageLinkField.value
            }
            let updateRequest = await firebaseRequests.patchRequest(memeId, sessionStorage.getItem('token'),editedMemeObj);
            loadingNot.style.display = 'none';
            this.redirect('#/home')
        } else {
            let createNot = document.querySelector("#errorBox");
            createNot.textContent = 'Please fullfill all fields!!';
            createNot.style.display = 'block';
            createNot.addEventListener('click', () => {
                createNot.style.display = 'none';
                this.redirect('#/home')
            });
        }
    })
}