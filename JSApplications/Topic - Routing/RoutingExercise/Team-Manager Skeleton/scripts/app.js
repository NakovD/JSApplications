async function applyCommon() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };
    this.username = sessionStorage.getItem('username');
    this.loggedIn = !!sessionStorage.getItem('token');
    this.hasNoTeam = sessionStorage.getItem('hasNoTeam');
}
async function homeViewHandler() {
    await applyCommon.call(this);
    this.partial('./templates/home/home.hbs');
}
async function aboutFuncHandler() {
    await applyCommon.call(this);
    this.partial('./templates/about/about.hbs');
}
async function loginFuncHandler() {
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
                        this.redirect('#/home');
                    });
                });
        }
    })
}
async function registerFuncHandler() {
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
                                sessionStorage.setItem('hasNoTeam', true);
                                usernameEmail.value = '';
                                password.value = '';
                                repeatPassword.value = '';
                                this.redirect('#/home')
                            });
                    })
                // .catch(e => {
                // let errorCode = e.code;
                // let errorMssg = e.message;
                //TO Do error Handling;
                // switch (errorMssg) {
                //     case 'auth/weak-password':

                //         break;
                //     case ''
                // }

                // });
            } else {
                //TO DO passwords do not match;
            }
        } else {
            //To do some fields are empty;
        }
    })
}
async function logOutFunc() {
    await applyCommon.call(this);
    sessionStorage.clear();
    firebase.auth().signOut();
    this.redirect('#/home');

}
async function catalogFunc() {
    await applyCommon.call(this);
    // this.partials.teamControls = await this.load('./templates/catalog/teamControls.hbs');
    // this.partial('./templates/catalog/details.hbs');
    this.partial('./templates/catalog/teamCatalog.hbs');
    let token = sessionStorage.getItem('token');
}
async function createTeamFunc() {
    await applyCommon.call(this);
    this.partials.createForm = await this.load('./templates/create/createForm.hbs');
    await this.partial('./templates/create/createPage.hbs');
    let $teamNameField = document.querySelector("#name");
    let $teamCommentOrDescrField = document.querySelector("#comment");
    let $buttonCreate = document.querySelector("#main > div > div > form > input");

    $buttonCreate.addEventListener('click', (e) => {
        if ($teamCommentOrDescrField.value !== '' && $teamNameField.value !== '') {
            e.preventDefault();
            let objToSend = { 
                name: $teamNameField.value,
                descr: $teamCommentOrDescrField.value
            };
            console.log(objToSend);
            let token = sessionStorage.getItem('token');
            let url = `https://softunicourses.firebaseio.com/teams.json?auth=${token}`;

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.parse(objToSend)
            })
                .then(r => {
                    if (r.status < 400) {
                        console.log(r);
                    } else {
                        throw (response);
                    }
                })
                .catch(e => console.error(e.statusText));
        } else {
            //to do show alert if the the fields are empty;
        }
    })
}
// initialize the application
var app = Sammy('#main', function () {
    // include a plugin
    this.use('Handlebars', 'hbs');

    // define a 'route'
    this.get('#/', homeViewHandler);
    this.get('#/home', homeViewHandler);
    this.get('#/about', aboutFuncHandler);
    this.get('#/login', loginFuncHandler);
    this.get('#/register', registerFuncHandler);
    this.post('#/register', () => false);
    this.get('#/logout', logOutFunc);
    this.get('#/catalog', catalogFunc);
    this.get('#/create', createTeamFunc);
});

// start the application
app.run('#/');

