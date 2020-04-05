import { applyCommon } from '../common/common.js';
import firebaseRequests from '../services/firebase-requests.js';

export async function homePageHandler() {
    await applyCommon.call(this);
    if (sessionStorage.getItem('loggedIn')) {
        let allArticles = await firebaseRequests.getRequest('articles', '', sessionStorage.getItem('token'));
        if (!allArticles) {
            allArticles = {};
        }
        let allArticlesArr = Object.entries(allArticles).map(([id, value]) => ({ id, ...value }));
        let jsArticles = allArticlesArr.filter(el => el.category.toLowerCase().trim() === 'javascript' || el.category.toLowerCase().trim() === 'js'
            || el.category.toLowerCase().trim() === 'java script');
        jsArticles.sort((a, b) => (b.title).localeCompare(a.title))
        let javaArticles = allArticlesArr.filter(el => el.category.toLowerCase().trim() === 'java');
        javaArticles.sort((a, b) => (b.title).localeCompare(a.title));
        let cSharpArticles = allArticlesArr.filter(el => el.category.toLowerCase().trim() === 'csharp' || el.category.toLowerCase().trim() === 'c#'
            || el.category.toLowerCase().trim() === 'c sharp' || el.category.toLowerCase().trim() === 'c #');
        cSharpArticles.sort((a, b) => (b.title).localeCompare(a.title));
        let pythonArticles = allArticlesArr.filter(el => el.category.toLowerCase().trim() === 'python');
        pythonArticles.sort((a, b) => (b.title).localeCompare(a.title));
        this.jsArticles = jsArticles;
        this.javaArticles = javaArticles;
        this.cSharpArticles = cSharpArticles;
        this.pythonArticles = pythonArticles;
        await this.partial('./templates/main/mainPage.hbs');
    } else {
        this.redirect('#/logIn');
    }
}