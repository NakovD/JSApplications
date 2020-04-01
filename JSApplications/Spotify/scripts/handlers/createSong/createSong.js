import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';
export async function createSongHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/createSong/createSong.hbs');
    let songTitle = document.querySelector("#title");
    let artist = document.querySelector("#artist");
    let songImageLink = document.querySelector("#imageURL");
    let createSongButton = document.querySelector("#createSongView > div > div > form > button");
    createSongButton.addEventListener('click', async (e) => {
        e.preventDefault();
        let loadingNot = document.querySelector("#loadingBox");
        if (songTitle.value !== '' && artist.value !== '' && songImageLink.value !== '') {
                let songObj = {
                    title: songTitle.value,
                    artist: artist.value,
                    likes: 0,
                    listened: 0,
                    imageLink: songImageLink.value,
                    creator: sessionStorage.getItem('username'),
                    createdByID: sessionStorage.getItem('userId'),
                }
                loadingNot.style.display = 'block';
                let putSongInDatabase = await firebaseRequests.postRequest('',sessionStorage.getItem('token'),songObj);
                loadingNot.style.display = 'none';
                let createNot = document.querySelector("#infoBox");
                createNot.textContent = 'You created a new Song.';
                createNot.style.display = 'block';
                createNot.addEventListener('click', () => {
                    createNot.style.display = 'none';
                    this.redirect('#/home');
                });
                setTimeout(() => {
                    if (createNot.style.display !== 'none') {
                        createNot.style.display = 'none';
                        this.redirect('#/home');
                    }
                }, 5000);
        } else {
            let errorNot = document.querySelector("#errorBox");
            errorNot.textContent = 'All fields must be filled!';
            errorNot.style.display = 'block';
            errorNot.addEventListener('click', () => {
                errorNot.style.display = 'none';
                this.redirect('#/createSong');
            });
        }
    });
}