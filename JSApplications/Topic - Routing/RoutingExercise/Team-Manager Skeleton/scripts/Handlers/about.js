import { applyCommon } from './common.js';
export async function aboutFuncHandler() {
    await applyCommon.call(this);
    this.partial('./templates/about/about.hbs');
}