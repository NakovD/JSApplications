import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function createArticleHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/createArticle/createArticle.hbs');
    let title = document.querySelector("#title");
    let category = document.querySelector("#category");
    let content = document.querySelector("#content");
    let createTrekButton = document.querySelector("#root > div > form > fieldset > p.field.submit > button");
    createTrekButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (title.value !== '' && content.value !== '' && category.value !== '') { 
                let articleObj = {
                    title: title.value,
                    content: content.value,
                    category: category.value,
                    creator: sessionStorage.getItem('username'),
                    createdByID: sessionStorage.getItem('userId'),
                }
                let putArticleInDatabase = await firebaseRequests.postRequest('articles', '', sessionStorage.getItem('token'), articleObj);
                alert('You created a new article!');
                this.redirect('#/home');
            } else {
            alert('Please fill all fields!');
        }
    });
} 