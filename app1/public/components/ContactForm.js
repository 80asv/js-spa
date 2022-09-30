export function ContactForm(){
    const $form = document.createElement('form');
    const $styles = document.getElementById('dynamic-styles');
    const d = document;
    $styles.innerHTML = `
        .contact-form {
            --form-ok-color: #4caf50;
            --form-error-color: #f44336;
            margin-left: auto;
            margin-right: auto;
            width: 80%;
        }
    
        .contact-form>* {
            padding: 0.5rem;
            margin: 1rem auto;
            display: block;
            width: 100%;
        }
    
        .contact-form textarea {
            resize: none;
        }
    
        .contact-form legend,
        .contact-form-response {
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
        }
    
        .contact-form input,
        .contact-form textarea {
            font-size: 1rem;
            font-family: sans-serif;
        }
    
        .contact-form input[type="submit"] {
            width: 50%;
            font-weight: bold;
            cursor: pointer;
        }
    
        .contact-form *::placeholder {
            color: #000;
        }
    
        .contact-form [required]:valid {
            border: thin solid var(--form-ok-color);
        }
    
        .contact-form [required]:invalid {
            border: thin solid var(--form-error-color);
        }
    
        .contact-form-error {
            margin-top: -1rem;
            font-size: 80%;
            background-color: var(--form-error-color);
            color: #fff;
            transition: all 800ms ease;
        }
    
        .contact-form-error.is-active {
            display: block;
            animation: show-message 1s 1 normal 0s ease-out both;
        }
    
        .contact-form-loader {
            text-align: center;
        }
    
        .none {
            display: none;
        }
    
        @keyframes show-message {
            0% {
            visibility: hidden;
            opacity: 0;
            }
    
            100% {
            visibility: visible;
            opacity: 1;
            }
        }
    `;

    $form.classList.add('contact-form');
    
    $form.innerHTML = `
        <legend>send us your comments</legend>
        <input type="text" name="name" placeholder="Name"  pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$" title="Only letters and empty spaces" required>
        <input type="email" name="email" placeholder="Email" pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$" title="incorrect email" required>
        <input type="text" name="subject" placeholder="Subject" title="the subject is required" required>
        <textarea name="comments" cols="30" rows="10" placeholder="write your comments" data-pattern="^.{1,255}$" title="your comment should not exceed 255 characters" required></textarea>
        <input type="submit" value="send">
        <div class="contact-form-loader none"><img src="public/assets/loader-dots.svg" alt="loading"></div>
        <div class="contact-form-response none">
            <p>the data has been sent</p>
        </div>`;


    function formValidation(){
        //seleccionamos el formualrio a tratar
        const $form = document.querySelector('.contact');
        //seleccionamos los inputs que tengan el attributo required
        const $inputs = d.querySelectorAll('.contact [required]');

        //console.log($inputs);

        //por cada input con attributo required creamos adyacentemente un espan que marcara un error si la info no es adecuada
        $inputs.forEach(input => {
            // crear elemento span
            const $span = d.createElement('span');

            // asignamos id con el atributo name que contenta el elemento
            $span.id = input.name;
            // asignamos contenido que tenga en el atributo title
            $span.textContent = input.title;
            // asignamos clases para añadir estilos
            $span.classList.add('contact-form-error', 'none');
            // insertamos el elemento al html adyacentemente
            input.insertAdjacentElement('afterend', $span);
        });


        /* al momento de que el usuario escriba dentro de los inputs comensara a validar la informacion */ 
        d.addEventListener('keyup', (e) =>{
            // si el evento se delega dentro de los inputs el atributo required
            if(e.target.matches('.contact [required]')){

                // buscar el atributo pattern que contiene la validacion con la exp reg
                let $input = e.target,
                    pattern = $input.pattern || $input.dataset.pattern;

                // si el input tienen atributo pattern    
                if(pattern && $input.value !== ''){
                    //guardamos la exp regular
                    let regExp = new RegExp(pattern);
                    return !regExp.exec($input.value) ? d.getElementById($input.name).classList.add('active') : d.getElementById($input.name).classList.remove('active');
                }

                if(!pattern){
                    return $input.value === '' ? d.getElementById($input.name).classList.add('active') : d.getElementById($input.name).classList.remove('active');
                }

            }
        });

        d.addEventListener('submit', (e ) => {
            //e.preventDefault();
            alert('sending form');
    
            const $loader = d.querySelector('.contact-form-loader');
            const $response = d.querySelector('.contact-form-response');
    
            $loader.classList.remove('none');
    
            setTimeout(() => {
                $loader.classList.add('none');
                $response.classList.remove('none');
                $form.reset();
                
                setTimeout(() => {$response.classList.add('none')}, 3E3);
            }, 3E3)
        })
    }

    setTimeout( () => formValidation(), 100);

    return $form;
}