import firebaseRequests from '../services/firebase-requests.js';
import { applyCommon } from '../common/common.js';
export async function detailsTrekHandler() {
    await applyCommon.call(this);
    let trekId = document.location.href.split('/:')[1];
    let trekInfo = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/treks.json?auth=${sessionStorage.getItem('token')}`);
    let neededTrek = Object.keys(trekInfo).find(el => el === trekId);
    neededTrek = trekInfo[neededTrek];
    this.trekId = trekId;
    let {location,description,date,likes,organizer} = neededTrek;
    this.location = location;
    this.description = description;
    this.date = date;
    this.likes = likes;
    this.organizer = organizer;
    let checkIfUserIsAuthor = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/userInfo/${sessionStorage.getItem('userId')}.json?auth=${sessionStorage.getItem('token')}`);
        if (!checkIfUserIsAuthor) {
            checkIfUserIsAuthor = {};
        } else {
            checkIfUserIsAuthor = Object.values(checkIfUserIsAuthor);
            let result = checkIfUserIsAuthor.some(el => el.idTrek === trekId);
            if (!result) {

            } else {
                this.isAuthor = true;
            }
        }
    this.partial('./templates/singleTrekDetails/detailsTrek.hbs');
}
