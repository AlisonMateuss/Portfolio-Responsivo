/* Abre e fecha menu Lateral em mobile */

const menuMobile = document.querySelector('.menu-mobile')
const body = document.querySelector('body')

menuMobile.addEventListener('click', () => {
    menuMobile.classList.contains("bi-list")
        ? menuMobile.classList.replace("bi-list", "bi-x")
        : menuMobile.classList.replace("bi-x", "bi-list");
    body.classList.toggle("menu-nav-active")
})

/* Menu fecha quando clica e muda o icone para list */

const navItem = document.querySelectorAll('.nav-item')

navItem.forEach(item =>{
    item.addEventListener("click", () =>{
        if(body.classList.contains("menu-nav-active")){
            body.classList.remove("menu-nav-active")
            menuMobile.classList.replace("bi-x", "bi-list");
        }
    })
})

// animar todos os itens da minha tela que tiverem data-anime

const debounce = function(func, wait, immediate) {
    let timeout;
    return function(args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const target = document.querySelectorAll('[data-anime]');
  const animationClass = 'animate';
  
  function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 6) / 7);
    target.forEach(function(element) {
      if((windowTop) > element.offsetTop) {
        element.classList.add(animationClass);
      } else {
        element.classList.remove(animationClass);
      }
    })
  }
  
  animeScroll();
  
  if(target.length) {
    window.addEventListener('scroll', debounce(function() {
      animeScroll();
    }, 5));
  }

// Ativar carregamento do botão do formulario

const form = document.querySelector('#form');
const btnEnviar = document.querySelector('#btn-enviar')
const btnEnviarLoader = document.querySelector('#btn-enviar-loader')

form.addEventListener("submit", (event) => {
  
  event.preventDefault();

  
  if (form.checkValidity()) {
      
      btnEnviarLoader.style.display = "block";
      btnEnviar.style.display = "none";

      
      setTimeout(() => {
          form.submit();  
      }, 1000); 
  } else {
      
      form.reportValidity(); 
  }
});

// Remover mensagem do alerta

setTimeout(()=>{
    document.querySelector('#alerta').style.display = "none";
}, 5000)

document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();  // Impede o envio tradicional do formulário

  const formData = new FormData(this);

  fetch('/send', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Mensagem enviada com sucesso!');
      window.location.href = '/';  // Redireciona para a página inicial após sucesso
    } else {
      alert('Ocorreu um erro. Tente novamente!');
    }
  })
  .catch(error => {
    alert('Erro ao enviar a mensagem. Tente novamente!');
  });
});