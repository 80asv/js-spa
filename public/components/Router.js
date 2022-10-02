import api from '../helpers/wp_api.js';
import { ajax } from '../helpers/ajax.js';
import { PostCard } from './PostCard.js';
import { Post } from './Post.js';
import { SearchCard } from './SearchCard.js';
import { ContactForm } from './ContactForm.js';

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
        let query = localStorage.getItem('wpSearch');

        if(!query){
            document.querySelector('.loader').style.display = 'none';
            return false;
        };

        await ajax({
            url: `${api.SEARCH}${query}`,
            cbSuccess: (search) => {
                let html = "";
                if(search.length === 0){
                    html = `
                        <p class="error">
                            No existen resultados de busqueda para <mark>${query}</mark>
                        </p>
                    `;
                } else {
                    search.forEach(post => html += SearchCard(post));
                }
                $main.innerHTML = html;
            }
        })

    } else if (hash.includes("#/contacto")){
        //$main.innerHTML = "<h2>Seccion de contacto</h2>";
        $main.appendChild(ContactForm());
    } else {
        await ajax({
            url: `${api.POST}/${localStorage.getItem('wpPostId')}`,
            cbSuccess: (post) => {
                $main.innerHTML = Post(post);
            }
        });
    }
    document.querySelector('.loader').style.display = "none";
}