import { applyCommon } from '../common/common.js'
export async function homeViewHandler() {
    await applyCommon.call(this);
    this.partial('./templates/main/home.hbs');
}