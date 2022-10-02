import api from "./helpers/wp_api.js";
import {App} from "./App.js";
import { infiniteScroll } from "./helpers/infinite_scroll.js";
document.addEventListener('DOMContentLoaded', () => {
    infiniteScroll();
    App();
});
window.addEventListener('hashchange', e =>{
    api.page = 1;
    App();
});