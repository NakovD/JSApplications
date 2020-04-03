import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
export async function createMemeHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/createMeme/createMeme.hbs');
    let memeTitle = document.querySelector("#create-meme > form > div > input[type=text]:nth-child(4)")
    let memeDescr = document.querySelector("#create-meme > form > div > input[type=text]:nth-child(6)");
    let memeImageLink = document.querySelector("#create-meme > form > div > input[type=text]:nth-child(8)");
    let createMemeButton = document.querySelector("#create-meme > form > div > button")
    createMemeButton.addEventListener('click', async (e) => {
        e.preventDefault();
        let loadingNot = document.querySelector("#loadingBox");
        if (memeTitle.value !== '' && memeImageLink.value !== '' && memeDescr.value !== '') {
            if (memeTitle.value.length < 33 && (memeDescr.value.length > 30 && memeDescr.value.length < 450)) {
                let memeObj = {
                    name: memeTitle.value,
                    description: memeDescr.value,
                    imageLink: memeImageLink.value,
                    creator: sessionStorage.getItem('username'),
                    createdByID: sessionStorage.getItem('userId'),
                }
                loadingNot.style.display = 'block';
                let putMemeInDatabase = await firebaseRequests.postRequest('', sessionStorage.getItem('token'), memeObj);
                loadingNot.style.display = 'none';
                let createNot = document.querySelector("#infoBox");
                createNot.textContent = 'You created a new Meme.';
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
                errorNot.textContent = 'Meme title must not exceed 33 characters and meme description must be between 30 and 450 characters!';
                errorNot.style.display = 'block';
                errorNot.addEventListener('click', () => {
                    errorNot.style.display = 'none';
                    this.redirect('#/createMeme');
                });
            }
        } else {
            let errorNot = document.querySelector("#errorBox");
            errorNot.textContent = 'All fields must be filled!';
            errorNot.style.display = 'block';
            errorNot.addEventListener('click', () => {
                errorNot.style.display = 'none';
                this.redirect('#/createMeme');
            });
        }
    });
}