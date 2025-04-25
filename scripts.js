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

// Woodcutting progress animation
document.addEventListener('DOMContentLoaded', function() {
    const progressCircle = document.getElementById('woodcuttingProgress');
    const treeHealth = document.getElementById('treeHealth');
    const firTree = document.getElementById('firTree');
    
    function TreeHit() {
        // Get current health width and reduce by 20%
        const currentWidth = parseFloat(treeHealth.style.width) || 100;
        const newWidth = Math.max(0, currentWidth - 20);
        treeHealth.style.width = newWidth + '%';
    
        // If health reaches 0, reset it to 100%
        if (newWidth === 0) {
            setTimeout(() => {
                treeHealth.style.width = '100%';
            }, 500); // Small delay before resetting
        }
    
        // Screen shake animation
        let shakeCount = 0;
        const maxShakes = 5;
        const shakeInterval = setInterval(() => {
            if (shakeCount >= maxShakes) {
                clearInterval(shakeInterval);
                firTree.style.transform = 'translate(0, 0)';
                return;
            }
    
            // Random shake position
            const xOffset = Math.random() * 6 - 3; // -3 to 3 pixels
            const yOffset = Math.random() * 6 - 3; // -3 to 3 pixels
            firTree.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            shakeCount++;
        }, 50);
    }

    if (progressCircle) {
        function animateProgress() {
            const circumference = 2 * Math.PI * 16; // r = 16
            let progress = 0;
            const duration = 6000; // 6 seconds
            const interval = 60; // Update every 60ms for smooth animation
            const increment = (100 * interval) / duration;
            const attackTimer = document.getElementById('attackTimer');

            const animation = setInterval(() => {
                progress += increment;
                if (progress >= 100) {
                    progress = 0;
                    progressCircle.style.strokeDashoffset = circumference;
                    if (attackTimer) {
                        attackTimer.style.width = '0%';
                    }
                    TreeHit(); // Call TreeHit when progress completes
                } else {
                    const offset = circumference - (progress / 100) * circumference;
                    progressCircle.style.strokeDashoffset = offset;
                    if (attackTimer) {
                        attackTimer.style.width = progress + '%';
                    }
                }
            }, interval);

            // Store the interval ID in case we need to clear it later
            progressCircle.dataset.animationInterval = animation;
        }

        // Start the animation when the page loads
        animateProgress();
    }
});

// Item selection functionality
document.addEventListener('DOMContentLoaded', function() {
    const item1 = document.getElementById('zone1_item1');
    const item2 = document.getElementById('zone1_item2');
    const item1Stats = document.getElementById('zone1_item1_stats');
    const item2Stats = document.getElementById('zone1_item2_stats');

    function updateStats(selectedItem) {
        // Reset both items to default state
        item1.classList.remove('border-red-500', 'border-2');
        item2.classList.remove('border-red-500', 'border-2');
        
        // Set default percentages
        item1Stats.textContent = '50%';
        item2Stats.textContent = '50%';

        if (selectedItem) {
            // Update selected item with red border
            selectedItem.classList.add('border-red-500', 'border-2');
            
            // Update stats based on selection
            if (selectedItem === item1) {
                item1Stats.textContent = '75%';
                item2Stats.textContent = '25%';
            } else {
                item1Stats.textContent = '25%';
                item2Stats.textContent = '75%';
            }
        }
    }

    // Add click handlers
    item1.addEventListener('click', function() {
        const isCurrentlySelected = this.classList.contains('border-red-500');
        updateStats(isCurrentlySelected ? null : this);
    });

    item2.addEventListener('click', function() {
        const isCurrentlySelected = this.classList.contains('border-red-500');
        updateStats(isCurrentlySelected ? null : this);
    });
});