export default {
    getRequest: async function(URL) {
            let response = await fetch(URL).then(r => r.json());
            return response;
        },
    postRequest: async function(URL) {
            let response = await fetch(URL).then(r => r.json());
            return response;
        },
    deleteRequest: async function(URL) {
            let response = await fetch(URL,{method:'DELETE'});
            return response;
        },
    putRequest: async function(URL,entityBody) {
            let response = await fetch(URL,{
                method: 'PUT',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(entityBody)
            });
            return response;
        },
    patchRequest: async function patchRequest(URL,entityBody) {
            let response = await fetch(URL,{
                method: 'PATCH',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(entityBody)
            });
            return response;
        }
}
export async function getRequest(URL) {
    let response = await fetch(URL).then(r => r.json());
    return response;
}
export async function postRequest(URL, entityBody) {
    let response = await fetch(URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entityBody)
    })
    return response;
}
export async function deleteRequest(URL) {
    let response = await fetch(URL,{method:'DELETE'});
    return response;
}
export async function updateRequest(URL,entityBody) {
    let response = await fetch(URL,{
        method: 'PUT',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(entityBody)
    });
    return response;
}
export async function patchRequest(URL,entityBody) {
    let response = await fetch(URL,{
        method: 'PATCH',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(entityBody)
    });
    return response;
}