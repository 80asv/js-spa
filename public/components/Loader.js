export function Loader(){
    const $loader = document.createElement('img');

    $loader.src = 'public/assets/loader-dots.svg';
    $loader.alt = 'Cargando...';
    $loader.classList.add('loader');

    return $loader;
}
