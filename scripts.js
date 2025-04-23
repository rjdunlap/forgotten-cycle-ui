// JavaScript for theme switching using a dropdown
const themeSelect = document.getElementById('theme-select'); // Target the select element
const themeStyle = document.getElementById('theme-style');

// Function to apply the theme based on the selected value (e.g., 'light', 'dark', 'ancient-ruins')
function applyTheme(themeName) {
  const themePath = `${themeName}-theme.css`; // Construct the CSS file path
  themeStyle.href = themePath;
  localStorage.setItem('theme', themeName); // Save the selected theme name
  // Ensure the dropdown reflects the active theme
  themeSelect.value = themeName;
}

// Get saved theme from local storage or default to 'light'
let currentTheme = localStorage.getItem('theme') || 'light';

// Apply the initial theme on page load
applyTheme(currentTheme);

// Add event listener to the dropdown for changes
themeSelect.addEventListener('change', (event) => {
  const selectedTheme = event.target.value; // Get the value of the selected option
  applyTheme(selectedTheme); // Apply the new theme
});

// Navigation toggle functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const mainContent = document.getElementById('mainContent');

hamburger.addEventListener('click', function() {
    navMenu.classList.remove('-translate-x-full');
    mainContent.classList.remove('ml-0');
    mainContent.classList.add('ml-64');
    // Hide hamburger when menu is open
    hamburger.classList.add('hidden');
});

// Add close button functionality
document.getElementById('closeNav').addEventListener('click', function() {
    navMenu.classList.add('-translate-x-full');
    mainContent.classList.remove('ml-64');
    mainContent.classList.add('ml-0');
    // Show hamburger when menu is closed
    hamburger.classList.remove('hidden');
});

document.getElementById('theme-select').addEventListener('change', (event) => {
  const selectedTheme = event.target.value; // Get the value of the selected option
  applyTheme(selectedTheme); // Apply the new theme
});

// Zone switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all zone buttons and content divs
    const zoneButtons = document.querySelectorAll('[id^="zone"][id$="_button"]');
    const zoneContents = document.querySelectorAll('[id^="zone"][id$="_content"]');

    // Function to switch active zone
    function switchZone(activeIndex) {
        // Update button styles
        zoneButtons.forEach((button, index) => {
            if (index === activeIndex) {
                button.classList.add('border-b-2', 'border-button-bg');
                button.classList.remove('hover:text-text-heading');
            } else {
                button.classList.remove('border-b-2', 'border-button-bg');
                button.classList.add('hover:text-text-heading');
            }
        });

        // Show/hide content
        zoneContents.forEach((content, index) => {
            if (index === activeIndex) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    }

    // Add click event listeners to buttons
    zoneButtons.forEach((button, index) => {
        button.addEventListener('click', () => switchZone(index));
    });

    // Show Zone 1 by default
    switchZone(0);
});

// Navigation for woodcutting buttons
document.addEventListener('DOMContentLoaded', function() {
    // Start button in woodcutting.html
    const startButton = document.getElementById('startWoodcuttingButton');
    if (startButton) {
        startButton.addEventListener('click', function() {
            window.location.href = 'woodcutting-active.html';
        });
    }

    // Stop button in woodcutting-active.html
    const stopButton = document.getElementById('stopWoodcuttingButton');
    if (stopButton) {
        stopButton.addEventListener('click', function() {
            window.location.href = 'woodcutting.html';
        });
    }
});
