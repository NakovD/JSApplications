export async function notificate(type, message,context,placeToRedirect) {
    // let errorNot = document.querySelector("#errorBox");         //notifications Boxes
    // let successNot = document.querySelector("#infoBox");
    // let loadingNot = document.querySelector("#loadingBox");
    if (type === 'error') {                             //type Notification
        errorNot.textContent = message;
        errorNot.style.display = 'block';
        errorNot.addEventListener('click', () => {errorNot.style.display = 'none'});
    } else if (type === 'success') {
        successNot.textContent = message;
        successNot.style.display = 'block';
        successNot.addEventListener('click', () => {
            successNot.style.display = 'none';
            context.redirect(placeToRedirect);
        });
        setTimeout(()=>{
            if (successNot.style.display !== 'none') {
                successNot.style.display = 'none';
                context.redirect(placeToRedirect);
            }
        },3000)
    } else if (type === 'loading') {
        if (loadingNot.style.display === 'none' || loadingNot.style.display === '') {
            loadingNot.style.display = 'block';
        } else {
            loadingNot.style.display = 'none';
        }
    }
}