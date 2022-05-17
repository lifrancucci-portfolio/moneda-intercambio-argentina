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
  const heroTextSlides = document.querySelectorAll('.hero-text-slide');
  const carrouselSelectors = document.querySelectorAll('.carrousel-selector');

  let currentSlide = 0;

  // Cambiar slide cada n milisegundos
  setInterval(function() {selectSlide(currentSlide)}, 2500);

  function selectSlide(target) {
    // Cambiar a la slide n mediante los selectores
    if(currentSlide < heroTextSlides.length) {
      heroTextSlides.forEach(slide => {
        slide.style.display = "none";
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
  }

  // Seleccionar el slide mediante click en los selectores
  carrouselSelectors.forEach(carrouselSelector => {
    carrouselSelector.addEventListener('click', function handleClick(event) {
      let e = event.target.classList;
      // console.log(e);
      if(e.contains('selector1')) {
        selectSlide(0);
        currentSlide = 0;
      }
      if(e.contains('selector2')) {
        selectSlide(1);
        currentSlide = 1;
      }
      if(e.contains('selector3')) {
        selectSlide(2);
        currentSlide = 2;
      }
    });
  })

  // PREGUNTAS FRECUENTES ACCORDION
  const questionDisplay = document.getElementsByClassName('question-display');

  for(let i = 0; i < questionDisplay.length; i++) {
    questionDisplay[i].addEventListener('click', function() {
      this.classList.toggle('active');
      let expandText = this.nextElementSibling;
      if(expandText.style.maxHeight) {
        expandText.style.maxHeight = null;
      } else {
        expandText.style.maxHeight = expandText.scrollHeight + 'px';
      }
    });
  }

}
