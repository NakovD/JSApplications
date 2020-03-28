import {applyCommon} from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js'

export async function registerHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/registerPage/registerPage.hbs');
    let emailField = document.querySelector("#inputEmail");
    let passwordField = document.querySelector("#inputPassword");
    let repeatPasswordField = document.querySelector("#inputPassword");
    let registerButton = document.querySelector("body > form > button");
    registerButton.addEventListener('click',async (e)=> {
        e.preventDefault();
        if (emailField.value !== '' && passwordField.value !== '' && repeatPasswordField.value !== '') {
            if (passwordField.value === repeatPasswordField.value) {
                let registerUser = await firebase.auth().createUserWithEmailAndPassword(emailField.value,passwordField.value)
                let token = await firebase.auth().currentUser.getIdToken();
                sessionStorage.setItem('username',registerUser.user.email);
                sessionStorage.setItem('userId',firebase.auth().currentUser.uid);
                sessionStorage.setItem('token',token);
                sessionStorage.setItem('loggedIn',true);
                this.redirect('#/home');
            }else {
                alert('Passwords must match!');
            }
        }else {
            alert('All fields must be filled!');
            return;
        }
    })
    
}
export async function logOutHandler() {
    await applyCommon.call(this);
    sessionStorage.clear();
    firebase.auth().signOut();
    this.redirect('#/home');
}
export async function logInHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/login/loginPage.hbs');
    let emailField = document.querySelector("#inputEmail");
    let passwordField = document.querySelector("#inputPassword");
    let logInButton = document.querySelector("body > form > button");
    
    logInButton.addEventListener('click', async (e)=>{
        e.preventDefault();
        const loggedInUser = await firebase.auth().signInWithEmailAndPassword(emailField.value,passwordField.value);
        const userToken = await firebase.auth().currentUser.getIdToken();
        sessionStorage.setItem('username',loggedInUser.user.email);
        sessionStorage.setItem('userId',firebase.auth().currentUser.uid);
        sessionStorage.setItem('token',userToken);
        sessionStorage.setItem('loggedIn',true);
        this.redirect('#/home');
    })

}