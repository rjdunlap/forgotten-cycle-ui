document.addEventListener('DOMContentLoaded', function() {
  // Load the navigation menu
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('nav-placeholder').innerHTML = data;
      
      // Initialize navigation functionality after loading
      initNavigation();
    })
    .catch(error => console.error('Error loading navigation:', error));
});

// Initialize navigation functionality
function initNavigation() {
  // Toggle sections
  document.querySelectorAll('.section-header').forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      content.classList.toggle('collapsed');
      const toggle = this.querySelector('.section-toggle img');
      if (toggle) {
        toggle.style.transform = content.classList.contains('collapsed') ? 'rotate(180deg)' : '';
      }
    });
  });

  // Mobile navigation toggle
  const hamburger = document.getElementById('hamburger');
  const closeNav = document.getElementById('closeNav');
  const navMenu = document.getElementById('navMenu');
  const mainContent = document.getElementById('mainContent');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.remove('-translate-x-full');
    });
  }

  if (closeNav) {
    closeNav.addEventListener('click', function() {
      navMenu.classList.add('-translate-x-full');
    });
  }
}