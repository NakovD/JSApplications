import firebaseRequests from '../services/firebase-requests.js';
import { applyCommon } from '../common/common.js';
import { formDataExtractor } from '../services/formDataExtractor.js';

export async function registerHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/registerPage/registerPage.hbs');
    let email = document.querySelector("#email");
    let passField = document.querySelector("#register-pass");
    let repeatPassField = document.querySelector("#rep-pass");
    let regButton = document.querySelector("#root > div > form > fieldset > p.field.submit > button");
    regButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (email.value !== '' && passField.value !== '' && repeatPassField.value !== '') {
            if (passField.value === repeatPassField.value) {
                let regFail = false;
                let registerUser = await firebase.auth().createUserWithEmailAndPassword(email.value, passField.value)
                    .catch(e => {
                        let errorCode = e.code;
                        regFail = true;
                        switch (errorCode) {
                            case 'auth/weak-password':
                                alert('Your password should be at least six symbols!');
                                break;
                            case 'auth/invalid-email':
                                alert('Invalid email!');
                                break;
                            case 'auth/email-already-in-use':
                                alert('This email is already in use!');
                                break;
                            default:
                        }
                    });
                if (!regFail) {
                    let token = await firebase.auth().currentUser.getIdToken();
                    sessionStorage.setItem('username', registerUser.user.email);
                    sessionStorage.setItem('userId', firebase.auth().currentUser.uid);
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('loggedIn', true);
                    alert('Register successfull!');
                    this.redirect('#/home');
                } else {
                    return;
                }
            } else {
                alert('Passwords do not match!');
            }
        } else {
            alert('Please fill all fields!');
            return;
        }
    });
}
export async function logInHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/loginPage/loginPage.hbs');
    let email = document.querySelector("#email");
    let passField = document.querySelector("#login-pass");
    let logInButton = document.querySelector("#root > div > form > fieldset > p.field.submit > button");
    logInButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (email.value !== '' && passField.value !== '') {
            let logInFail = false;
            const loggedInUser = await firebase.auth().signInWithEmailAndPassword(email.value, passField.value)
                .catch(e => {
                    let errorCode = e.code;
                    logInFail = true;
                    switch (errorCode) {
                        case 'auth/invalid-email':
                            alert('Invalid email!');
                            break;
                        case 'auth/user-disabled':
                            alert('This user is disabled!');
                            break;
                        case 'auth/user-not-found':
                            alert('User not found!');
                            break;
                        case 'auth/wrong-password':
                            alert('Wrong Password!');
                            break;
                        default:
                    }
                });
            if (!logInFail) {
                const userToken = await firebase.auth().currentUser.getIdToken();
                sessionStorage.setItem('username', loggedInUser.user.email);
                sessionStorage.setItem('userId', firebase.auth().currentUser.uid);
                sessionStorage.setItem('token', userToken);
                sessionStorage.setItem('loggedIn', true);
                alert('Log in successfull!');
                this.redirect('#/home');
            }
        } else {
            alert('Please fill all fields!');
        }
    });
}
export async function logOutHandler() {
    sessionStorage.clear();
    firebase.auth().signOut();
    alert('Log out successfull!');
    this.redirect('#/logIn');
}