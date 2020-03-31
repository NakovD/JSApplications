import firebaseRequests from '../services/firebase-requests.js';
import { applyCommon } from '../common/common.js';
import { formDataExtractor } from '../services/formDataExtractor.js';

export async function registerHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/registerPage/registerPage.hbs');
    let userNameField = document.querySelector("#defaultFormCardNameEx")
    let passField = document.querySelector("#defaultFormCardPasswordEx")
    let repeatPassField = document.querySelector("#defaultFormCardRePasswordEx")
    let regButton = document.querySelector("#main > div > div > form > div > button");
    regButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (userNameField.value !== '' && passField.value !== '' && repeatPassField.value !== '') {
            if (passField.value === repeatPassField.value) {
                let regFail = false;
                let loadingNot = document.querySelector("#loadingNotification");
                loadingNot.style.display = 'block';
                let registerUser = await firebase.auth().createUserWithEmailAndPassword(userNameField.value, passField.value)
                    .catch(e => {
                        let errorCode = e.code;
                        let errorNot = document.querySelector("#errorNotification");
                        regFail = true;
                        switch (errorCode) {
                            case 'auth/weak-password':
                                errorNot.textContent = 'Your password should be at least six symbols!';
                                break;
                            case 'auth/invalid-email':
                                errorNot.textContent = 'Invalid email!';
                                break;
                            case 'auth/email-already-in-use':
                                errorNot.textContent = 'This email is already in use!';
                                break;
                            default:
                        }
                        loadingNot.style.display = 'none';
                        errorNot.style.display = 'block';
                        errorNot.addEventListener('click', () => {
                            errorNot.style.display = 'none';
                        });
                        this.redirect('#/register');
                    });
                if (!regFail) {
                    let token = await firebase.auth().currentUser.getIdToken();
                    sessionStorage.setItem('username', registerUser.user.email);
                    sessionStorage.setItem('userId', firebase.auth().currentUser.uid);
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('loggedIn', true);
                    loadingNot.style.display = 'none';
                    let regNot = document.querySelector("#successNotification");
                    regNot.textContent = 'Registration successfull!';
                    regNot.style.display = 'block';
                    regNot.addEventListener('click', () => {
                        regNot.style.display = 'none';
                        this.redirect('#/home')
                    });
                    setTimeout(() => {
                        if (regNot.style.display !== 'none') {
                            regNot.style.display = 'none';
                            this.redirect('#/home')
                        }
                    }, 5000)
                } else {
                    return;
                }
            } else {
                let errorNot = document.querySelector("#errorNotification");
                errorNot.textContent = 'Passwords must match!';
                errorNot.style.display = 'block';
                errorNot.addEventListener('click', () => {
                    errorNot.style.display = 'none';
                });
            }
        } else {
            let errorNot = document.querySelector("#errorNotification");
            errorNot.textContent = 'All fields must be filled!';
            errorNot.style.display = 'block';
            errorNot.addEventListener('click', () => {
                errorNot.style.display = 'none';
            });
            return;
        }
    });
}
export async function logInHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/loginPage/loginPage.hbs');
    let userNameField = document.querySelector("#defaultFormCardNameEx");
    let passField = document.querySelector("#defaultFormCardPasswordEx")
    let logInButton = document.querySelector("#main > div > div > form > div > button");
    logInButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (userNameField.value !== '' && passField.value !== '') {
            let logInFail = false;
            let loadingNot = document.querySelector("#loadingNotification");
            loadingNot.style.display = 'block';
            const loggedInUser = await firebase.auth().signInWithEmailAndPassword(userNameField.value, passField.value)
                .catch(e => {
                    let errorCode = e.code;
                    let errorNot = document.querySelector("#errorNotification");
                    logInFail = true;
                    switch (errorCode) {
                        case 'auth/invalid-email':
                            errorNot.textContent = 'Invalid email!'
                            break;
                        case 'auth/user-disabled':
                            errorNot.textContent = 'This user is disabled!'
                            break;
                        case 'auth/user-not-found':
                            errorNot.textContent = 'User not found!';
                            break;
                        case 'auth/wrong-password':
                            errorNot.textContent = 'Wrong Password!'
                            break;
                        default:
                    }
                    loadingNot.style.display = 'none';
                    errorNot.style.display = 'block';
                    errorNot.addEventListener('click', () => {
                        errorNot.style.display = 'none';
                    })
                });
            if (!logInFail) {
                const userToken = await firebase.auth().currentUser.getIdToken();
                sessionStorage.setItem('username', loggedInUser.user.email);
                sessionStorage.setItem('userId', firebase.auth().currentUser.uid);
                sessionStorage.setItem('token', userToken);
                sessionStorage.setItem('loggedIn', true);
                loadingNot.style.display = 'none';
                let logInNot = document.querySelector("#successNotification");
                logInNot.textContent = 'Log In Successfull!';
                logInNot.style.display = 'block';
                logInNot.addEventListener('click', () => {
                    logInNot.style.display = 'none';
                    this.redirect('#/home');
                    return;
                });
                setTimeout(() => {
                    if (logInNot.style.display !== 'none') {
                        logInNot.style.display = 'none';
                        this.redirect('#/home');
                    }
                }, 5000);
            }
        } else {
            let errorNot = document.querySelector("#errorNotification");
            errorNot.textContent = 'Please fill all fields!';
            errorNot.style.display = 'block';
            errorNot.addEventListener('click', () => {
                errorNot.style.display = 'none';
            });
        }
    })
}
export async function logOutHandler() {
    await applyCommon.call(this);
    sessionStorage.clear();
    let loadingNot = document.querySelector("#loadingNotification");
    loadingNot.style.display = 'block';
    firebase.auth().signOut();
    loadingNot.style.display = 'none';
    let logOutSucc = document.querySelector("#successNotification");
    logOutSucc.textContent = 'Logout successfull';
    logOutSucc.style.display = 'block';
    logOutSucc.addEventListener('click', () => {
        logOutSucc.style.display = 'none';
        this.redirect('#/home');
    });
    setTimeout(() => {
        if (logOutSucc.style.display !== 'none') {
            logOutSucc.style.display = 'none';
            this.redirect('#/home');
        }
    }, 5000)
}