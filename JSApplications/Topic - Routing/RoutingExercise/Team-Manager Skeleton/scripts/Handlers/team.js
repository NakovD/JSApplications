import { applyCommon } from './common.js';
export async function joinTeamHandler() {
    let teamIdToJoin = document.location.href.split('/:')[1];
    let userInfo = await fetch(`https://softunicourses.firebaseio.com/userInfo/${sessionStorage.getItem('userId')}.json?auth=${sessionStorage.getItem('token')}`).then(r => r.json());
    if (userInfo.isOnTeam) {
        alert('You cannot join this team, cause you are already member of another team!');
        this.redirect('#/catalog');
    } else {
        userInfo.isOnTeam = teamIdToJoin;
        let someth = [{id:sessionStorage.getItem('userId'), name: sessionStorage.getItem('username')}];
        let currentMembers = await fetch(`https://softunicourses.firebaseio.com/teams/${teamIdToJoin}/teamMembers.json?auth=${sessionStorage.getItem('token')}`).then(r =>r.json());
        console.log(currentMembers);
        let teamInfoChange = await fetch(`https://softunicourses.firebaseio.com/teams/${teamIdToJoin}/teamMembers/${currentMembers.length + 1}.json?auth=${sessionStorage.getItem('token')}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id:sessionStorage.getItem('userId'),name:sessionStorage.getItem('username')}),
            
        })
        console.log(teamInfoChange);
        let userJoining = await fetch(`https://softunicourses.firebaseio.com/userInfo/${sessionStorage.getItem('userId')}.json?auth=${sessionStorage.getItem('token')}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({isOnTeam:teamIdToJoin})
        });
        this.redirect('#/catalog');
        console.log(userJoining);
    }
}
export async function createTeamFunc() {
    await applyCommon.call(this);
    this.partials.createForm = await this.load('./templates/create/createForm.hbs');
    await this.partial('./templates/create/createPage.hbs');
    let createButton = document.querySelector("#main > div > div > form > input");
    let nameTeamField = document.querySelector("#name");
    let description = document.querySelector("#comment");

    createButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (nameTeamField.value !== '' && description.value !== '') {
            let objToSend = {
                name: nameTeamField.value,
                comment: description.value,
                teamMembers: [{ id: sessionStorage.getItem('userId'), name: sessionStorage.getItem('username') }],
                createdBy: sessionStorage.getItem('userId')
            }
            fetch(`https://softunicourses.firebaseio.com/teams.json?auth=${sessionStorage.getItem('token')}`, {
                method: 'POST',
                body: JSON.stringify(objToSend),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(r => {
                    if (r.status < 400) {
                        delete this.hasNoTeam;
                        sessionStorage.setItem('isOnTeam', nameTeamField.value);
                        sessionStorage.removeItem('hasNoTeam');
                        fetch(`https://softunicourses.firebaseio.com/userInfo/${sessionStorage.getItem('userId')}.json?auth=${sessionStorage.getItem('token')}`, {
                            method: 'PATCH',
                            body: JSON.stringify({ isOnTeam: nameTeamField.value })
                        })
                        this.redirect('#/catalog');
                    } else {
                        throw (r);
                    }
                })
                .catch(console.error());
        }

    })
}
