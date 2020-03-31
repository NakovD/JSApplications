import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
export async function createIdeaHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/createIdea/createIdea.hbs');
    let titleField = document.querySelector("#title");
    let descriptionField = document.querySelector("#main > div > div > form > div:nth-child(3) > textarea")
    let imageLinkField = document.querySelector("#imageURl");
    let createIdeaButton = document.querySelector("#main > div > div > form > button");
    createIdeaButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (titleField.value !== '' && descriptionField.value !== '' && imageLinkField.value !== '') {
            let ideaObj = {
                title: titleField.value,
                description: descriptionField.value,
                imageLink: imageLinkField.value,
                creator: sessionStorage.getItem('username'),
                likes: 0,
                createdByID: sessionStorage.getItem('userId'),
                comments: []
            }
            let putIdeaInDatabase = await firebaseRequests.postRequest(`https://softunicourses.firebaseio.com/ideas.json?auth=${sessionStorage.getItem('token')}`, ideaObj);
            let createNot = document.querySelector("#successBox");
            createNot.textContent = 'You created a new idea.';
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
        }
    })
}