import firebaseRequests from '../services/firebase-requests.js';

export async function deleteArticleHandler() {
    let articleId = document.location.href.split('/:')[1];
    let deleteRequest = await firebaseRequests.deleteRequest('articles',articleId,sessionStorage.getItem('token'));
    alert('Article deleted successfully!');
    this.redirect('#/home');
}