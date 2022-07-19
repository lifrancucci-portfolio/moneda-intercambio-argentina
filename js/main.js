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

  // MODAL CONOCÉ MIA
  const modalConoce = document.getElementById('modal-conoce');
  const btnConoce =
  document.getElementById('btn-conoce').onclick = function() {
    disableScroll();
    modalConoce.classList.add('active');
  };
  const closeConoce = document.getElementById('close-conoce').onclick = function() {
    enableScroll();
    modalConoce.classList.remove('active');
  }


  // MODAL BARES Y RESTAURANTES
  const modalBares = document.getElementById('modal-bares');
  const btnBares = document.getElementById('btn-bares').onclick = function() {
    modalBares.classList.add('active');
  };
  const closeBares = document.getElementById('close-bares').onclick = function() {
    modalBares.classList.remove('active');
  }

  // MODAL SERVICIOS
  const modalServicios = document.getElementById('modal-servicios');
  const btnServicios =
  document.getElementById('btn-servicios').onclick = function() {
    modalServicios.classList.add('active');
  };
  const closeServicios = document.getElementById('close-servicios').onclick = function() {
    modalServicios.classList.remove('active');
  }

  // MODAL SERVICIOS ACCORDION
  const serviceDisplay = document.querySelectorAll('.service-display');

  serviceDisplay.forEach(service => {
    service.addEventListener('click', function() {
      this.classList.toggle('active');

      let expandText = this.nextElementSibling;
      let expandSign = this.children.item(1);

      if(expandText.style.maxHeight) {
        expandSign.innerHTML = "+";
        expandText.style.maxHeight = null;
      } else {
        expandSign.innerHTML = "-";
        expandText.style.maxHeight = expandText.scrollHeight + 'px';
      }
    })
  })


  // PREGUNTAS FRECUENTES ACCORDION
  const questionDisplay = document.querySelectorAll('.question-display');

  questionDisplay.forEach(question => {
    question.addEventListener('click', function() {
      this.classList.toggle('active');

      let expandText = this.nextElementSibling;
      let expandSign = this.children.item(1);

      if(expandText.style.maxHeight) {
        expandSign.innerHTML = "+";
        expandText.style.maxHeight = null;
      } else {
        expandSign.innerHTML = "-";
        expandText.style.maxHeight = expandText.scrollHeight + 'px';
      }
    })
  })

}
