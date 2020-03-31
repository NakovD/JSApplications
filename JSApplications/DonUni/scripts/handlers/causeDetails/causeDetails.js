import firebaseRequests from '../services/firebase-requests.js';
import { applyCommon } from '../common/common.js';
export async function detailsCauseHandler() {
    await applyCommon.call(this);
    let causeId = document.location.href.split('/:')[1];
    let causeInfo = await firebaseRequests.getRequest(`https://softunicourses.firebaseio.com/causes.json?auth=${sessionStorage.getItem('token')}`);
    let neededCause = Object.keys(causeInfo).find(el => el === causeId);
    neededCause = causeInfo[neededCause];
    this.causeId = causeId;
    let { title, description } = neededCause;
    this.title = title;
    this.neededFunds = neededCause.neededFunds;
    this.collectedFunds = neededCause.collectedFunds;
    if (neededCause.donors) {
        let arrDonors = Object.values(neededCause.donors);
        this.donors = arrDonors;
    }
    this.description = description;
    this.imageLink = neededCause.imageLink;
    let isAuthor;
    this.username = sessionStorage.getItem('username');
    this.token = sessionStorage.getItem('token');
    if (neededCause.creator === sessionStorage.getItem('username')) {
        isAuthor = true;
    } else {
        isAuthor = false;
    }
    this.isAuthor = isAuthor;
    await this.partial('./templates/details/details.hbs');
    if (!isAuthor) {
        let donationButton = document.querySelector("#main > div > div > div > div.modal-footer > form > button");
        donationButton.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            let numberArea = document.querySelector("#main > div > div > div > div.modal-footer > form > input");
            if (numberArea.value !== '') {
                let donationInfo = {
                    name: sessionStorage.getItem('username'),
                    donation: numberArea.value
                }
                let $currentFundsDomEl = document.querySelector("#main > div > div > div > div.modal-body > center:nth-child(1) > strong.label.text-success");
                let currentFundsNum = $currentFundsDomEl.textContent.split('$')[1];
                let updatedFunds = +currentFundsNum + +numberArea.value;
                let loadingNot = document.querySelector("#loadingNotification");
                loadingNot.style.display = 'block';
                let postRequest = await firebaseRequests.postRequest(`https://softunicourses.firebaseio.com/causes/${causeId}/donors.json?auth=${sessionStorage.getItem('token')}`, donationInfo);
                let updateFundsDB = await firebaseRequests.patchRequest(`https://softunicourses.firebaseio.com/causes/${causeId}.json?auth=${sessionStorage.getItem('token')}`, { collectedFunds: updatedFunds });
                loadingNot.style.display = 'none';
                $currentFundsDomEl.textContent = `$${updatedFunds}`;
                let $donorsFieldParent = document.querySelector("#main > div > div > div > div.modal-body > center:nth-child(3) > p:nth-child(3)");
                let $newSpanForDonor = document.createElement('span');
                $newSpanForDonor.textContent = donationInfo.name;
                $donorsFieldParent.appendChild($newSpanForDonor);
                numberArea.value = '';
                this.redirect(`#/details/:${causeId}`)
            }
        });
    }
}