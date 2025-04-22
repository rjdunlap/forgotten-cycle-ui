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