import api from '../helpers/wp_api.js';
import { ajax } from '../helpers/ajax.js';
import { PostCard } from './PostCard.js';
import { Post } from './Post.js';

export async function Router(){
    let { hash } = location;
    const $main = document.getElementById('main');
    $main.innerHTML = null;

    if(!hash || hash === "#/"){
        await ajax({
            url: api.POSTS,
            cbSuccess: (posts) => {
                let html = "";
                posts.forEach(post => html += PostCard(post));
                document.querySelector('.loader').style.display = "none";
                $main.innerHTML = html;
            }
        });
    } else if (hash.includes("#/search")) {
        $main.innerHTML = "<h2>Seccion del buscador</h2>";
    } else if (hash.includes("#/contacto")){
        $main.innerHTML = "<h2>Seccion de contacto</h2>";
    } else {
        await ajax({
            url: `${api.POST}/${localStorage.getItem('wpPostId')}`,
            cbSuccess: (post) => {
                console.log(post);
                $main.innerHTML = Post(post);
            }
        });
        
    }

    document.querySelector('.loader').style.display = "none";
}