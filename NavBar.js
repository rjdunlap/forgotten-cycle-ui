/**
 * Navigation Bar Functionality
 * Handles mobile navigation toggle and collapsible sections
 */
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.getElementById('hamburger');
    const closeNav = document.getElementById('closeNav');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && closeNav && navMenu && mainContent) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.remove('-translate-x-full');
        });
        
        closeNav.addEventListener('click', function() {
            navMenu.classList.add('-translate-x-full');
        });
    }
    
    // Collapsible navigation sections
    const navSections = document.querySelectorAll('.nav-section');
    
    navSections.forEach(section => {
        const header = section.querySelector('.section-header');
        const content = section.querySelector('.section-content');
        const toggle = section.querySelector('.section-toggle');
        
        // Set initial state (expanded)
        // We'll leave them expanded by default
        
        header.addEventListener('click', function() {
            // Toggle section visibility using class instead of inline styles
            content.classList.toggle('collapsed');
            
            // Update the toggle icon
            if (content.classList.contains('collapsed')) {
                toggle.textContent = '►';
            } else {
                toggle.textContent = '▼';
            }
        });
    });
});