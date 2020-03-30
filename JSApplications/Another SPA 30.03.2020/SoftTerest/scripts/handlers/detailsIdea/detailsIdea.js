import firebaseRequests from '../services/firebase-requests.js';
import { applyCommon } from '../common/common.js';
export async function detailsIdeaHandler() {
    await applyCommon.call(this);
    let ideaId = document.location.href.split('/:')[1];
    let ideaInfo = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/ideas.json?auth=${sessionStorage.getItem('token')}`);
    let neededidea = Object.keys(ideaInfo).find(el => el === ideaId);
    neededidea = ideaInfo[neededidea];
    this.ideaId = ideaId;
    let {title,description,likes,creator} = neededidea;
    this.title = title;
    if (neededidea.comments) {
        this.comments = neededidea.comments;
    }
    this.description = description;
    this.likes = likes;
    this.creator = creator;
    this.imageLink = neededidea.imageLink;
    let isAuthor;
    this.username = sessionStorage.getItem('username');
    this.token = sessionStorage.getItem('token');
    if (neededidea.creator === sessionStorage.getItem('username')) {
        isAuthor = true;
    }else {
        isAuthor = false;
    }
    this.isAuthor = isAuthor;
    await this.partial('./templates/IdeaDetails/ideaDetails.hbs');
    let commentButton = document.querySelector("#main > div.container.home.some > form > button");
    commentButton.addEventListener('click',async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        let textArea = document.querySelector("#comment");
        if (textArea.value !== '') {
            let commentInfo = {
                name: sessionStorage.getItem('username'),
                comment: textArea.value
            }
            debugger;
            let postRequest = await firebaseRequests.postRequest(`https://softunicourses.firebaseio.com/ideas/${ideaId}/comments.json?auth=${sessionStorage.getItem('token')}`,commentInfo);
            textArea.value = '';
            this.redirect(`#/details/:${ideaId}`);
        }
    });

}