import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function detailsArticleHandler() {
    await applyCommon.call(this);
    let articleId = document.location.href.split('/:')[1];
    let articleInfo = await firebaseRequests.getRequest('articles',articleId,sessionStorage.getItem('token'));
    this.title = articleInfo.title;
    this.content = articleInfo.content;
    this.category = articleInfo.category;
    this.id = articleId;
    if (articleInfo.creator === sessionStorage.getItem('username')) {
        this.isAuthor= true;
    }
    await this.partial('./templates/detailsArticle/detailsArticle.hbs');
}