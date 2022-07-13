function validateEmail(e) {
    let field = e.target;
    let fieldValue = field.value;

    if (fieldValue.search('@') == -1) {
        displayError('Email não valido', field);
    } else {
        clearError(field);
    }   
    field.classList.remove('not-validated');
    checkEnableSubmit(); 
    }

    function validateNotEmpty(e) {
        let field = e.target;
        let fieldValue = field.value;

        if (fieldValue == ''){
            displayError('Campo não pode ser vazio', field);
        } else {
            clearError(field);
        }

        field.classList.remove('not-validated');
    checkEnableSubmit();
        }

        
        function displayError(message, field) {
            clearError(field)
            field.classList.add('is-invalid');
            let error = document.createElement('small');
            error.style.color = 'red';
            error.classList.add('error-message');
            error.textContent = message;
            field.parentElement.appendChild(error);
        }

        function clearError(field) {
            let container = field.parentElement;
            let error = container.querySelector('.error-message');
            if (error){
                container.removeChild(error);
            }
            field.classList.remove('is-invalid');
            }
      
        function checkEnableSubmit(){
            let form = document.querySelector('#form');  
            let notValidated = form.querySelectorAll('.not-validated');
            let errors = form.querySelectorAll('.is-invalid');

            if (errors.length == 0 && notValidated.length == 0) {
                enableSubmit();
            } else {
                disableSubmit();
            }      
         } 

         function enableSubmit() {
            let form = document.querySelector('#form');  
            let submit = form.querySelector('[type=submit]');

           
           submit.disabled = false;
            }

        function disableSubmit() {
                let form = document.querySelector('#form');  
                let submit = form.querySelector('[type=submit]');
    
                submit.disabled = true;
        
        }
           
document.querySelectorAll('input').forEach(el => el.classList.add('not-validate'));
document.querySelectorAll('input.email').forEach(el => el.addEventListener('keyup', validateEmail));
document.querySelectorAll('input:required').forEach(el => el.addEventListener('keyup', validateNotEmpty));

//// API
function preencherTitulo(titulo){
    document.querySelector('#name').innerText = titulo
  }
  function preencherImagem(src, alt){
    const image = document.querySelector('#profilePicture');
    image.src = src;
    image.alt = alt;
  }
  
  function pegarListaDeRepositorios(reposUrl){
    fetch(reposUrl)
    .then(function(response){ return response.json() })
  }
  
  fetch("https://api.github.com/users/MaribelCol")
  .then(function(response){
    //executa quando resolve
    return response.json();
  })
  .then(function(response){
    preencherImagem(response.avatar_url, response.name);
    preencherTitulo(response.name);
    //...
  })
  .catch(function(error){
    //executa quando rejeita
    console.error(error)
  });