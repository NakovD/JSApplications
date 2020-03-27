import { applyCommon } from './common.js';
import firebaseRequests from '../firebase-requests.js'
export async function loginFuncHandler() {
    await applyCommon.call(this);
    this.partials.loginForm = await this.load('./templates/login/loginForm.hbs');
    await this.partial('./templates/login/loginPage.hbs');
    let emailUsername = document.querySelector("#username");
    let password = document.querySelector("#password");
    let button = document.querySelector("#main > div > form > input");
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (emailUsername.value !== '' && password.value !== '') {
            firebase.auth().signInWithEmailAndPassword(emailUsername.value, password.value)
                .then(r => {
                    firebase.auth().currentUser.getIdToken().then(token => {
                        sessionStorage.setItem('username', emailUsername.value);
                        sessionStorage.setItem('token', token);
                        sessionStorage.setItem('userId',firebase.auth().currentUser.uid);
                        fetch(`https://softunicourses.firebaseio.com/userInfo/${sessionStorage.getItem('userId')}.json?auth=${token}`)
                        .then(resp=> resp.json())
                        .then(data => {
                            if (!data.isOnTeam) {
                                sessionStorage.setItem('hasNoTeam',true);
                            }else {
                                sessionStorage.setItem('isOnTeam',data.isOnTeam);
                            }
                        })
                        this.redirect('#/home');
                    });
                });
        }
    })
}
export async function registerFuncHandler() {
    await applyCommon.call(this);
    this.partials.registerForm = await this.load('./templates/register/registerForm.hbs');
    await this.partial('./templates/register/registerPage.hbs');
    let usernameEmail = document.querySelector("#username");
    let password = document.querySelector("#password");
    let repeatPassword = document.querySelector("#repeatPassword");
    let registerButton = document.querySelector("#main > div > form > input");
    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (usernameEmail.value !== '' && password.value !== '' && repeatPassword !== '') {
            if (password.value === repeatPassword.value) {
                firebase.auth().createUserWithEmailAndPassword(usernameEmail.value, password.value)
                    .then(response => {
                        firebase.auth().currentUser.getIdToken()
                            .then(token => {
                                sessionStorage.setItem('token', token);
                                sessionStorage.setItem('username', response.user.email);
                                sessionStorage.setItem('userId',firebase.auth().currentUser.uid);
                                sessionStorage.setItem('hasNoTeam', true);
                                fetch(`https://softunicourses.firebaseio.com/userInfo/${sessionStorage.getItem('userId')}.json?auth=${token}`, {
                                    method: 'PUT',
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({isOnTeam:false})
                                })
                                this.redirect('#/home');
                            });
                    })
                    .catch(e => {
                        let errorCode = e.code;
                        let errorMssg = e.message;
                        switch (errorCode) {
                            case 'auth/weak-password':
                                alert(errorMssg);
                                break;
                            case 'auth/invalid-email':
                                alert(errorMssg);
                                break;
                            case 'auth/email-already-in-use':
                                alert('Email already in use');
                                break;
                            default:
                        }
                        usernameEmail.value = '';
                        password.value = '';
                        repeatPassword.value = '';
                    });
            } else {
                alert('Passwords do not match!');
                return;
            }
        } else {
            // To do some fields are empty;
            alert('You should fill all fields!');
            return;
        }
    })
}
export async function logOutFunc() {
    await applyCommon.call(this);
    sessionStorage.clear();
    firebase.auth().signOut();
    this.redirect('#/home');

}