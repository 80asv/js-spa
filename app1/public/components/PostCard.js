export function PostCard(props){
    let { date, id, slug, title, _embedded } = props;
    let dateFormat = new Date(date).toLocaleString();
    let urlPoster = _embedded["wp:featuredmedia"] ? _embedded["wp:featuredmedia"][0].source_url : "public/assets/ghost-solid.svg";
    document.addEventListener('click', e =>{
        e.stopImmediatePropagation();
        if(!e.target.matches('.post-card a')) return false;
        localStorage.setItem('wpPostId', e.target.dataset.id);
    });
    return `
        <article class="post-card">
            <img src="${urlPoster}" alt="">
            <h2>${title.rendered}</h2>
            <p>
                <time datetime="${date}">${dateFormat}</time>
                <a href="#/${slug}" data-id="${id}">Ver publicacion</a>
            </p>
        </article>
    `;
}

