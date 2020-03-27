import { applyCommon } from './common.js';
export async function homeViewHandler() {
    await applyCommon.call(this);
    this.partial('./templates/home/home.hbs');
}