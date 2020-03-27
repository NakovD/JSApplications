export async function applyCommon() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };
    this.username = sessionStorage.getItem('username');
    this.loggedIn = !!sessionStorage.getItem('token');
    if (sessionStorage.hasOwnProperty('hasNoTeam')) {
        this.hasNoTeam = true;
    }
    if (sessionStorage.hasOwnProperty('isOnTeam')) {
        this.isOnTeam = true;
    }
}