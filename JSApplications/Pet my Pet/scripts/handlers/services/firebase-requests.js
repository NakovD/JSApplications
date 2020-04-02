let apiKey = 'https://softunicourses.firebaseio.com/';
let collectionName = 'pets';
export default {
    getRequest: async function (ID, token) {
        let response;
        if (ID === '') {
            response = await fetch(`${apiKey}${collectionName}.json?auth=${token}`).then(r => r.json());
        } else {
            response = await fetch(`${apiKey}${collectionName}/${ID}.json?auth=${token}`).then(r=>r.json());
        }
        return response;
    },
    postRequest: async function (ID, token, entityBody) {
        let requestBody = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entityBody)
        }
        let response;
        if (ID === '') {
            response = await fetch(`${apiKey}${collectionName}.json?auth=${token}`, requestBody);
        } else {
            response = await fetch(`${apiKey}${collectionName}/${ID}.json?auth=${token}`, requestBody);
        }
        return response;
    },
    deleteRequest: async function (ID, token) {
        let requestBody = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }
        let response;
        if (ID === '') {
            response = await fetch(`${apiKey}${collectionName}.json?auth=${token}`, requestBody);
        } else {
            response = await fetch(`${apiKey}${collectionName}/${ID}.json?auth=${token}`,requestBody);
        }
        return response;
    },
    putRequest: async function (ID, token, entityBody) {
        let requestBody = {
            method: 'PUT',
            header: { "Content-Type": "application/json" },
            body: JSON.stringify(entityBody)
        }
        let response;
        if (ID === '') {
            response = await fetch(`${apiKey}${collectionName}.json?auth=${token}`,requestBody);
        } else {
            response = await fetch(`${apiKey}${collectionName}/${ID}.json?auth=${token}`,requestBody);
        }
        return response;
    },
    patchRequest: async function patchRequest(ID, token, entityBody) {
        let requestBody = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entityBody)
        }
        let response;
        if (ID === '') {
            response = await fetch(`${apiKey}${collectionName}.json?auth=${token}`,requestBody);
        }else {
            response = await fetch(`${apiKey}${collectionName}/${ID}.json?auth=${token}`,requestBody);
        }
        return response;
    }
}
// export async function getRequest(URL) {
//     let response = await fetch(URL).then(r => r.json());
//     return response;
// }
// export async function postRequest(URL, entityBody) {
//     let response = await fetch(URL, {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(entityBody)
//     })
//     return response;
// }
// export async function deleteRequest(URL) {
//     let response = await fetch(URL,{method:'DELETE'});
//     return response;
// }
// export async function updateRequest(URL,entityBody) {
//     let response = await fetch(URL,{
//         method: 'PUT',
//         headers: {"Content-Type":"application/json"},
//         body: JSON.stringify(entityBody)
//     });
//     return response;
// }
// export async function patchRequest(URL,entityBody) {
//     let response = await fetch(URL,{
//         method: 'PATCH',
//         headers: {"Content-Type":"application/json"},
//         body: JSON.stringify(entityBody)
//     });
//     return response;
// }