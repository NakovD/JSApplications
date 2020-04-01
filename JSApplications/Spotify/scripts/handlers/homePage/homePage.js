import {applyCommon} from '../common/common.js';

export async function homePageHandler() {
    await applyCommon.call(this);
    await this.partial('./templates/main/mainPage.hbs');
}