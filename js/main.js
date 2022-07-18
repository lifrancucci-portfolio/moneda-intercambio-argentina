// PRELOAD IMAGES
let images = [];
function preload() {
    for (let i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

//-- usage --//
preload(
    "images/hero-gradient.png",
    "images/slide-bg-1.jpg",
    "images/slide-bg-2.jpg",
    "images/slide-bg-3.jpg",
    "images/como-comprar.jpg",
    "images/billetes-captura.png",
)

function contentLoaded() {

  // MENU
  const mainContainer = document.getElementById('main-container');
  const header = document.getElementById('header');
  const hamburguerMenu = document.getElementById('hamburguer-menu');
  const navMenu = document.getElementById('nav-menu');
  const closeMenuButton = document.getElementById('close-menu-button');
  const menuLinks = document.querySelectorAll('.menu-link')

  // Desplegar Menú
  function openMenu() {
    if(header.classList.contains('menu-expanded')) {
      closeMenu();
    } else {
      header.classList.add('menu-expanded');
      navMenu.style.display = 'flex';
      // Deshabilitar Scroll
      disableScroll();
    }
  }

  // Evitar scroll cuando el Menú está desplegado
  function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  function disableScroll() {
    mainContainer.addEventListener('wheel', preventScroll);
  }
  function enableScroll() {
    mainContainer.removeEventListener('wheel', preventScroll);
  }

  // Cerrar Menú
  function closeMenu() {
    header.classList.remove('menu-expanded');
    navMenu.style.display = 'none';
    // Rehabilitar Scroll
    enableScroll();
  }

  hamburguerMenu.addEventListener('click', openMenu);
  closeMenuButton.addEventListener('click', closeMenu);
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', closeMenu);
  });

  // Funciones específicas de cada página
  let page = document.body.id;

  switch(page) {
    // Para index.html
    case 'index':
      // HERO SECTION CARROUSEL
      const sectionHero = document.getElementById('section-hero');
      const heroTextSlides = document.querySelectorAll('.hero-text-slide');
      const carrouselSelectors = document.querySelectorAll('.carrousel-selector');

      let currentSlide = 0;

      // Cambiar slide cada n milisegundos
      let slidesTimer = setInterval(function() {selectSlide(currentSlide)}, 2500);

      function selectSlide(target) {
        // Cambiar a la slide n mediante los selectores
        if(currentSlide < heroTextSlides.length) {
          heroTextSlides.forEach(slide => {
            slide.style.display = 'none';
          })
          heroTextSlides[target].style.display = 'block';

          // Indicar qué selector está seleccionado
          carrouselSelectors.forEach(selector => {
            selector.classList.remove('selected');
          })
          carrouselSelectors[target].classList.add('selected');
          currentSlide++;
        } else {
          // Cuando currentSlide llega al último elemento de heroTextSlides, volver a 0 y llamar recursivamente a la función
          currentSlide = 0;
          selectSlide(currentSlide);
        }

        // Cambiar el fondo del slide
        switch(currentSlide) {
          case 1:
            sectionHero.style.backgroundImage="url(images/slide-bg-1.jpg)";
            break;
          case 2:
            sectionHero.style.backgroundImage="url(images/slide-bg-2.jpg)";
            break;
          case 3:
            sectionHero.style.backgroundImage="url(images/slide-bg-3.jpg)";
            break;
        }
      }

      // Seleccionar el slide mediante click en los selectores
      carrouselSelectors.forEach(carrouselSelector => {
        carrouselSelector.addEventListener('click', function handleClick(event) {
          let e = event.target.classList;
          if(e.contains('selector1')) {
            currentSlide = 0;
          }
          if(e.contains('selector2')) {
            currentSlide = 1;
          }
          if(e.contains('selector3')) {
            currentSlide = 2;
          }
          // Seleccionar el slide elegido
          selectSlide(currentSlide);

          // Resetear slidesTimer
          window.clearInterval(slidesTimer);
          slidesTimer = window.setInterval(function() {selectSlide(currentSlide)}, 2500);
        });
      })

      // Ir a Conocé MIA
      const modalConoce = document.getElementById('modal-conoce');
      const btnConoce =
      document.getElementById('btn-conoce').onclick = function() {
        modalConoce.classList.add('active');
      };
      const closeModal = document.getElementById('close-modal').onclick = function() {
        modalConoce.classList.remove('active');
      }

      // PREGUNTAS FRECUENTES ACCORDION
      const questionDisplay = document.querySelectorAll('.question-display');

      questionDisplay.forEach(question => {
        question.addEventListener('click', function() {
          this.classList.toggle('active');
          let expandText = this.nextElementSibling;
          if(expandText.style.maxHeight) {
            expandText.style.maxHeight = null;
          } else {
            expandText.style.maxHeight = expandText.scrollHeight + 'px';
          }
        })
      })
    break;

    // Para conoce-mia.html
    case 'conoce-mia':

    break;
  }

}
