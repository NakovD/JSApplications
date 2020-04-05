import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
import { notificate } from '../services/notifications.js';


export async function editArticleHandler() {
    await applyCommon.call(this);
    let articleId = document.location.href.split('/:')[1];
    let articleInfo = await firebaseRequests.getRequest('articles',articleId,sessionStorage.getItem('token'));
    this.title = articleInfo.title
    this.content = articleInfo.content;
    this.category = articleInfo.category;
    await this.partial('./templates/editArticle/editArticle.hbs');
    let title = document.querySelector("#title");
    let category = document.querySelector("#category");
    let contentField = document.querySelector("#content");
    let editButton = document.querySelector("#root > div > form > fieldset > p.field.submit > button");
    editButton.addEventListener('click',async (e)=>{
        e.preventDefault();
        if (title.value !== '' && category.value !== '' && contentField.value !== '') {
            let articleObj = {
                title: title.value,
                category: category.value,
                content: contentField.value
            }
            let updateRequest = await firebaseRequests.patchRequest('articles',articleId,sessionStorage.getItem('token'),articleObj);
            alert('You edited the article successfully!');
            this.redirect('#/home');
        }else {
            alert('Please fill all fields!');
        }
    })
}