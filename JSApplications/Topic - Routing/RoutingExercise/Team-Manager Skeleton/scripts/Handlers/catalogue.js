import  {applyCommon } from './common.js';
export async function catalogFunc() {
    let teams = Object.entries(await fetch(`https://softunicourses.firebaseio.com/teams.json?auth=${sessionStorage.getItem('token')}`)
        .then(r => r.json())
        .then(d => d || {})
    ).map(([id, value]) => ({ _id: id, ...value }));
    this.teams = teams;
    await applyCommon.call(this);
    this.partials.team = await this.load('./templates/catalog/team.hbs');
    this.partial('./templates/catalog/teamCatalog.hbs');
}
export async function detailsFuncHandler() {
    let teamId = document.location.href.split('/:')[1];
    let someth = await fetch(`https://softunicourses.firebaseio.com/teams/${teamId}.json?auth=${sessionStorage.getItem('token')}`).then(r=>r.json());
    console.log(someth);
    this.teamId = teamId;
    this.name = someth.name;
    this.comment = someth.comment;
    this.members = (someth.teamMembers || []).map(member => ({username:member.name}));
    if (someth.createdBy === sessionStorage.getItem('userId')) {
        this.isAuthor = someth.createdBy;
    }
    this.isOnTeam = (someth.teamMembers || []).find(x => x.id === sessionStorage.getItem('userId'));
    await applyCommon.call(this);
    this.partials.teamMember = await this.load('./templates/catalog/teamMember.hbs');
    this.partials.teamControls = await this.load('./templates/catalog/teamControls.hbs');
    await this.partial('./templates/catalog/details.hbs');
}