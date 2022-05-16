function contentLoaded() {

  // MENU
  const header = document.getElementById('header');
  const hamburguerMenu = document.getElementById('hamburguer-menu');
  const navMenu = document.getElementById('nav-menu');
  const closeMenuButton = document.getElementById('close-menu-button');
  const menuLinks = document.querySelectorAll('.menu-link')

  function openMenu() {
    header.classList.add('menu-expanded');
    navMenu.style.display = 'flex';
  }

  function closeMenu() {
    header.classList.remove('menu-expanded');
    navMenu.style.display = 'none';
  }


  hamburguerMenu.addEventListener('click', openMenu);
  closeMenuButton.addEventListener('click', closeMenu);
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', closeMenu);
  });




}
