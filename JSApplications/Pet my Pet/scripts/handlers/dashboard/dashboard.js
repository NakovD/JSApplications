import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function dashboardViewHandler() {
    await applyCommon.call(this);
    let allPets = await firebaseRequests.getRequest('', sessionStorage.getItem('token'));
    if (!allPets) {
        allPets = {};
    }
    let allPetsArr = Object.entries(allPets).map(([id, value]) => ({ id, ...value }));
    let otherPets = allPetsArr.filter(el => el.creator !== sessionStorage.getItem('username'));
    this.pets = otherPets;
    await this.partial('./templates/dashboard/dashboard.hbs');
}

export async function catPetsView() {
    await applyCommon.call(this);
    let allPets = await firebaseRequests.getRequest('', sessionStorage.getItem('token'));
    if (!allPets) {
        allPets = {};
    }
    let allPetsArr = Object.entries(allPets).map(([id, value]) => ({ id, ...value }));
    let catsOnly = allPetsArr.filter(el => el.type === 'Cat');
    this.pets = catsOnly;
    await this.partial('./templates/dashboard/dashboard.hbs');
}

export async function dogPetsView() {
    await applyCommon.call(this);
    let allPets = await firebaseRequests.getRequest('', sessionStorage.getItem('token'));
    if (!allPets) {
        allPets = {};
    }
    let allPetsArr = Object.entries(allPets).map(([id, value]) => ({ id, ...value }));
    let dogsOnly = allPetsArr.filter(el => el.type === 'Dog');
    this.pets = dogsOnly;
    await this.partial('./templates/dashboard/dashboard.hbs');
}

export async function parrotPetsView() {
    await applyCommon.call(this);
    let allPets = await firebaseRequests.getRequest('', sessionStorage.getItem('token'));
    if (!allPets) {
        allPets = {};
    }
    let allPetsArr = Object.entries(allPets).map(([id, value]) => ({ id, ...value }));
    let parrotsOnly = allPetsArr.filter(el => el.type === 'Parrot');
    this.pets = parrotsOnly;
    await this.partial('./templates/dashboard/dashboard.hbs');
}

export async function reptilePetsView() {
    await applyCommon.call(this);
    let loadingNot = document.querySelector('#loadingBox');
    loadingNot.style.display = 'block';
    let allPets = await firebaseRequests.getRequest('', sessionStorage.getItem('token'));
    if (!allPets) {
        allPets = {};
    }
    loadingNot.style.display = 'none';
    let allPetsArr = Object.entries(allPets).map(([id, value]) => ({ id, ...value }));
    let reptilesOnly = allPetsArr.filter(el => el.type === 'Reptile');
    this.pets = reptilesOnly;
    await this.partial('./templates/dashboard/dashboard.hbs');
}

export async function otherPetsView() {
    await applyCommon.call(this);
    let loadingNot = document.querySelector('#loadingBox');
    loadingNot.style.display = 'block';
    let allPets = await firebaseRequests.getRequest('', sessionStorage.getItem('token'));
    if (!allPets) {
        allPets = {};
    }
    loadingNot.style.display = 'none';
    let allPetsArr = Object.entries(allPets).map(([id, value]) => ({ id, ...value }));
    let othersOnly = allPetsArr.filter(el => el.type === 'Other');
    this.pets = othersOnly;
    await this.partial('./templates/dashboard/dashboard.hbs');
}
