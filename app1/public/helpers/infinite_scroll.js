import { PostCard } from "../components/PostCard.js";
import { SearchCard } from "../components/SearchCard.js";
import api from "../helpers/wp_api.js";
import { ajax } from "./ajax.js";

export async function infiniteScroll(){
    let query = localStorage.getItem('wpSearch');
    let apiURL;
    let Component; //* hight Order Component

    window.addEventListener('scroll', async e =>{
        let { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        let { hash } = window.location;

        //console.log(scrollTop, clientHeight, scrollHeight, hash);

        if(scrollTop+clientHeight >= scrollHeight){
            api.page++;
            if(!hash || hash === "#/"){
                apiURL = `${api.POSTS}&page=${api.page}`;
                Component = PostCard;
                console.log(Component);
            } else if(hash.includes('#/search')){
                apiURL = `${api.SEARCH}&page=${api.page}`;
                Component = SearchCard;
                console.log(Component);
            } else {
                return false;
            }


            document.querySelector('.loader').style.display = 'block';

            await ajax({
                url: apiURL,
                cbSuccess: (posts) => {
                    console.log(posts);
                    let html = "";
                    posts.forEach(post => html += Component(post));
                    document.getElementById('main').insertAdjacentHTML('beforeend', html);
                    document.querySelector('.loader').style.display = 'none';
                }
            });
        }
    })
}