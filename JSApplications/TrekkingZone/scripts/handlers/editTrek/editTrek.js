import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
import { notificate } from '../services/notifications.js';

export async function editTrekHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/editTrek/editTrek.hbs');
    let trekId = document.location.href.split('/:')[1];
    let location = document.querySelector("#main > form > div:nth-child(1) > input");
    let date = document.querySelector("#main > form > div:nth-child(2) > input");
    let description = document.querySelector("#main > form > div:nth-child(3) > textarea");
    let imageLink = document.querySelector("#main > form > div:nth-child(4) > input");
    let editButton = document.querySelector("#main > form > button");
    editButton.addEventListener('click',async (e)=>{
        e.preventDefault();
        if (location.value !== '' && date.value !== '' && description.value !== '' && imageLink.value !== '') {
            let updatedInfo = {
                location: location.value,
                date: date.value,
                description: description.value,
                imageLink: imageLink.value
            }
            notificate('loading');
            let updateRequest = await firebaseRequests.patchRequest('treks',trekId,sessionStorage.getItem('token'),updatedInfo);
            notificate('loading');
            notificate.apply(this,['success','Trek edited successfully.','#/home']);
        }else {
            notificate('error','Please fill all fields!');
        }

    });

}