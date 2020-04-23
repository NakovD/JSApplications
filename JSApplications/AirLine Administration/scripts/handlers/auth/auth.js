import firebaseRequests from '../services/firebase-requests.js';
import { applyCommon } from '../common/common.js';
import { notificate } from '../services/notifications.js';


export async function registerHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/registerPage/registerPage.hbs');
    let userNameField = document.querySelector("#formRegister > input[type=text]:nth-child(2)");
    let passField = document.querySelector("#formRegister > input[type=password]:nth-child(4)");
    let repeatPass = document.querySelector("#formRegister > input[type=password]:nth-child(6)");
    let regButton = document.querySelector("#formRegister > input.register");
    regButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (userNameField.value !== '' && passField.value !== '' && repeatPass.value !== '') {
            if (userNameField.value.length >= 5) {
                if (passField.value === repeatPass.value) {
                    notificate('loading');
                    let regFail = false;
                    let registerUser = await firebase.auth().createUserWithEmailAndPassword(userNameField.value, passField.value)
                        .catch(e => {
                            let errorCode = e.code;
                            regFail = true;
                            let mssg = '';
                            switch (errorCode) {
                                case 'auth/weak-password':
                                    mssg = 'Your password should be at least six symbols!';
                                    break;
                                case 'auth/invalid-email':
                                    mssg = 'Invalid email!';
                                    break;
                                case 'auth/email-already-in-use':
                                    mssg = 'This email is already in use!';
                                    break;
                                default:
                            }
                            notificate('loading');
                            notificate('error', mssg);
                        });
                    if (!regFail) {
                        let token = await firebase.auth().currentUser.getIdToken();
                        sessionStorage.setItem('username', registerUser.user.email);
                        sessionStorage.setItem('userId', firebase.auth().currentUser.uid);
                        sessionStorage.setItem('token', token);
                        sessionStorage.setItem('loggedIn', true);
                        notificate('loading');
                        notificate.apply(this, ['success', 'User registration successfull!', '#/home']);
                    } else {
                        return;
                    }

                } else {
                    notificate('error', 'Passwords must match!');
                }
            } else {
                notificate('error', 'Username must be at least 5 characters long!');
            }
        } else {
            notificate('error', 'Please fill all fields!');
            return;
        }
    })
}
export async function logInHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/loginPage/loginPage.hbs');
    let userNameField = document.querySelector("#formLogin > input[type=text]:nth-child(2)");
    let passField = document.querySelector("#formLogin > input[type=password]:nth-child(4)");
    let logInButton = document.querySelector("#formLogin > input.login");
    logInButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (userNameField.value !== '' && passField.value !== '') {
            let logInFail = false;
            notificate('loading');
            const loggedInUser = await firebase.auth().signInWithEmailAndPassword(userNameField.value, passField.value)
                .catch(e => {
                    let errorCode = e.code;
                    logInFail = true;
                    let mssg = '';
                    switch (errorCode) {
                        case 'auth/invalid-email':
                            mssg = 'Invalid email!'
                            break;
                        case 'auth/user-disabled':
                            mssg = 'This user is disabled!'
                            break;
                        case 'auth/user-not-found':
                            mssg = 'User not found!';
                            break;
                        case 'auth/wrong-password':
                            mssg = 'Wrong Password!'
                            break;
                        default:
                    }
                    notificate('loading');
                    notificate('error', mssg);
                    return;
                });
            if (!logInFail) {
                const userToken = await firebase.auth().currentUser.getIdToken();
                sessionStorage.setItem('username', loggedInUser.user.email);
                sessionStorage.setItem('userId', firebase.auth().currentUser.uid);
                sessionStorage.setItem('token', userToken);
                sessionStorage.setItem('loggedIn', true);
                notificate('loading');
                notificate.apply(this, ['success', 'Log In successfull!', '#/home']);
            }
        } else {
            notificate('error', 'Please full all fields!');
        }
    })
}
export async function logOutHandler() {
    await applyCommon.call(this);
    sessionStorage.clear();
    notificate('loading');
    firebase.auth().signOut();
    notificate('loading');
    notificate.apply(this, ['success', 'Log Out successfull!', '#/home']);
}