import { applyCommon } from '../common/common.js';
import { notificate } from '../services/notifications.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function createReceiptHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/create/create.hbs');
    let rowExample = document.querySelector("#active-entries > div:nth-child(1)");
    let rowsParent = document.querySelector("#active-entries");
    rowsParent.innerHTML = '';
    let addBttn = document.querySelector("#addItemBtn");
    addBttn.addEventListener('click', async (e) => {
        e.preventDefault();
        let productName = document.querySelector("#create-entry-form > div:nth-child(1) > input");
        let productQuantity = document.querySelector("#create-entry-form > div:nth-child(2) > input");
        let prPerUnit = document.querySelector("#create-entry-form > div:nth-child(3) > input");
        if (productName.value !== '' && Number(productQuantity.value) && Number(prPerUnit.value)) {
            let newRow = rowExample.cloneNode(true);
            newRow.children[0].textContent = productName.value;
            newRow.children[1].textContent = productQuantity.value;
            newRow.children[2].textContent = (+prPerUnit.value).toFixed(2);
            newRow.children[3].textContent = (+productQuantity.value * +prPerUnit.value).toFixed(2);
            rowsParent.appendChild(newRow);
            let total = document.querySelector("#create-receipt-form > div:nth-child(4)");
            console.log(+total.textContent + (+productQuantity.value * +prPerUnit.value));
            total.textContent = (+total.textContent + (+productQuantity.value * +prPerUnit.value)).toFixed(2);
            productName.value = '';
            productQuantity.value = '';
            prPerUnit.value = '';
            notificate('success','Entry Added','#/create');
            // console.log(rowExample);
        } else {
            notificate('error', 'Please input correct information!');
        }
    });
} 