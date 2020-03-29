import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js'
import { formDataExtractor } from '../services/formDataExtractor.js';

export async function registerHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/registerPage/registerPage.hbs');
    let emailField = document.querySelector("#inputEmail");
    let passwordField = document.querySelector("#inputPassword");
    let repeatPasswordField = document.querySelector("#inputPassword");
    let registerButton = document.querySelector("#main > form > button");
    registerButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (emailField.value !== '' && passwordField.value !== '' && repeatPasswordField.value !== '') {
            if (passwordField.value === repeatPasswordField.value) {
                let registerUser = await firebase.auth().createUserWithEmailAndPassword(emailField.value, passwordField.value)
                    .catch(e => {
                        let errorCode = e.code;
                        let errorNot = document.querySelector("#errorBox");
                        switch (errorCode) {
                            case 'auth/weak-password':
                                errorNot.textContent = 'Weak Password';
                                break;
                            case 'auth/invalid-email':
                                errorNot.textContent = 'Invalid email!';
                                break;
                            case 'auth/email-already-in-use':
                                errorNot.textContent = 'This email is already in use';
                                break;
                            default:
                        }
                        errorNot.style.display = 'block';
                        errorNot.addEventListener('click', () => {
                            errorNot.textContent = '';
                            errorNot.style.display = 'none';
                        });
                        setTimeout(() => {
                            errorNot.textContent = '';
                            errorNot.style.display = 'none'
                        }, 5000)
                        this.redirect('#/register');
                    });
                let token = await firebase.auth().currentUser.getIdToken();
                sessionStorage.setItem('username', registerUser.user.email);
                sessionStorage.setItem('userId', firebase.auth().currentUser.uid);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('loggedIn', true);
                this.redirect('#/home')
                let regNot = document.querySelector("#successBox");
                regNot.textContent = 'Registration successfull!';
                regNot.style.display = 'block';
                regNot.addEventListener('click', () => {
                    regNot.style.display = 'none';
                    regNot.textContent = '';
                });
                setTimeout(() => {
                    regNot.style.display = 'none';
                    regNot.textContent = '';
                }, 5000)
            } else {
                alert('Passwords must match!');
            }
        } else {
            alert('All fields must be filled!');
            return;
        }
    })

}
export async function logOutHandler() {
    await applyCommon.call(this);
    sessionStorage.clear();
    firebase.auth().signOut();
    let logOutSucc = document.querySelector("#successBox");
    logOutSucc.textContent = 'Logout successfull';
    logOutSucc.style.display = 'block';
    logOutSucc.addEventListener('click', () => {
        logOutSucc.textContent = '';
        logOutSucc.style.display = 'none';
    })
    setTimeout(() => {
        logOutSucc.textContent = '';
        logOutSucc.style.display = 'none';
    }, 5000)
    this.redirect('#/home');
}
export async function logInHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/login/loginPage.hbs');
    let form = document.querySelector("#main > form");
    let logInButton = document.querySelector("#main > form > button");

    logInButton.addEventListener('click', async (e) => {
        e.preventDefault();
        let result = formDataExtractor(form);
        let checkEmptyFields = Object.values(result).every(el => el !== '');
        if (checkEmptyFields) {
            const loggedInUser = await firebase.auth().signInWithEmailAndPassword(result.email, result.password);
            const userToken = await firebase.auth().currentUser.getIdToken();
            sessionStorage.setItem('username', loggedInUser.user.email);
            sessionStorage.setItem('userId', firebase.auth().currentUser.uid);
            sessionStorage.setItem('token', userToken);
            sessionStorage.setItem('loggedIn', true);
            let logInNot = document.querySelector("#successBox");
            logInNot.textContent = 'Log In Successfull!';
            logInNot.style.display = 'block';
            logInNot.addEventListener('click', () => {
                logInNot.textContent = '';
                logInNot.style.display = 'none';
            })
            setTimeout(() => {
                logInNot.textContent = '';
                logInNot.style.display = 'none';
            }, 5000)
            this.redirect('#/home');
        } else {
            let errorNot = document.querySelector("#errorBox");
            errorNot.textContent = 'Please fill all fields!';
            errorNot.style.display = 'none';
            errorNot.addEventListener('click', () => {
                errorNot.textContent = '';
                errorNot.style.display = 'none';
            });
            setTimeout(() => {
                errorNot.textContent = '';
                errorNot.style.display = 'none';
            }, 5000)
        }
    })

}
