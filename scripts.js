/*
// JavaScript for theme switching using a dropdown
const themeSelect = document.getElementById('theme-select'); // Target the select element
const themeStyle = document.getElementById('theme-style');

 Function to apply the theme based on the selected value (e.g., 'light', 'dark', 'ancient-ruins')
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

document.getElementById('theme-select').addEventListener('change', (event) => {
  const selectedTheme = event.target.value; // Get the value of the selected option
  applyTheme(selectedTheme); // Apply the new theme
});
*/

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

// Single DOMContentLoaded listener for all initializations
document.addEventListener('DOMContentLoaded', () => {
    const toolCategories = [
      { categoryId: 'hatchetsCategory', listId: 'hatchetsList' },
      { categoryId: 'bellowsCategory', listId: 'bellowsList' },
      { categoryId: 'pickaxesCategory', listId: 'pickaxeList' }, // Corrected ID based on previous turn
      { categoryId: 'hammersCategory', listId: 'hammerList' },   // Corrected ID based on previous turn
      { categoryId: 'rodsCategory', listId: 'rodsList' },       // Corrected ID based on previous turn
    ];

    const categoryElements = {};
    const listElements = {};
    let foundSmithingElements = false; // Flag to check if we are on the smithing page

    // Get references to elements and add click listeners
    toolCategories.forEach(item => {
      const categoryEl = document.getElementById(item.categoryId);
      const listEl = document.getElementById(item.listId);

      if (categoryEl && listEl) {
        foundSmithingElements = true; // Found at least one pair, assume it's the smithing page
        categoryElements[item.categoryId] = categoryEl;
        listElements[item.listId] = listEl;

        // Add click listener to category selector
        categoryEl.addEventListener('click', () => {
          // Hide all lists and remove active style from all categories
          toolCategories.forEach(innerItem => {
            const innerListEl = listElements[innerItem.listId];
            const innerCategoryEl = categoryElements[innerItem.categoryId];
            if (innerListEl) {
              innerListEl.classList.add('hidden');
            }
            if (innerCategoryEl) {
              innerCategoryEl.classList.remove('border-button-bg', 'bg-bg-primary'); // Remove active styles
              innerCategoryEl.classList.add('border-text-heading'); // Ensure default border is present
            }
          });

          // Show the selected list and apply active style to selected category
          listEl.classList.remove('hidden');
          categoryEl.classList.add('border-button-bg', 'bg-bg-primary'); // Add active styles
          categoryEl.classList.remove('border-text-heading'); // Remove default border if needed
        });
      } else {
         // Don't log warning unless we expect these elements (i.e., foundSmithingElements is true later)
         // This prevents console spam on pages without smithing elements.
      }
    });

    // Set initial active state only if smithing elements were found
    if (foundSmithingElements) {
        const initialCategory = categoryElements['hatchetsCategory'];
        const initialList = listElements['hatchetsList'];
        if(initialCategory && initialList){
            initialCategory.classList.add('border-button-bg', 'bg-bg-primary');
            initialCategory.classList.remove('border-text-heading');
            // Ensure others are hidden and styled correctly initially
            Object.values(listElements).forEach(list => {
                if (list && list.id !== 'hatchetsList') { // Check if list exists before accessing id
                    list.classList.add('hidden');
                }
            });
             Object.values(categoryElements).forEach(cat => {
                if (cat && cat.id !== 'hatchetsCategory') { // Check if cat exists before accessing id
                    cat.classList.remove('border-button-bg', 'bg-bg-primary');
                    cat.classList.add('border-text-heading');
                }
            });
        } else {
             console.warn("Could not find initial smithing category ('hatchetsCategory') or list ('hatchetsList') to set active state.");
        }
    }

    // Profile Equipment Selection Logic
    const equippedItemIcon = document.getElementById('equippedItemIcon');
    const equippedItemName = document.getElementById('equippedItemName');
    const inventoryItems = document.querySelectorAll('.inventory-item'); // Select all items with the class
    let currentlyEquippedItemElement = null; // Keep track of the currently equipped/hidden item element

    // Check if we are on the profile-equip page by checking for elements
    if (equippedItemIcon && equippedItemName && inventoryItems.length > 0) {

        inventoryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Get data from the clicked item
                const itemName = item.dataset.itemName;
                const itemIcon = item.dataset.itemIcon;

                // If an item is already equipped, make it visible again in the inventory
                if (currentlyEquippedItemElement) {
                    currentlyEquippedItemElement.style.display = ''; // Or remove 'hidden' class if you prefer using classes
                }

                // Update the equipped slot display
                equippedItemIcon.src = itemIcon;
                equippedItemIcon.alt = itemName; // Update alt text
                equippedItemName.textContent = itemName;

                // Hide the newly selected item from the inventory
                item.style.display = 'none'; // Or add 'hidden' class

                // Update the reference to the currently equipped item element
                currentlyEquippedItemElement = item;
            });
        });

        const equippedSlot = document.getElementById('equippedItemSlot');
        if (equippedSlot) {
            equippedSlot.addEventListener('click', () => {
                 // Check if something other than 'Empty' is equipped
                 if (equippedItemName.textContent !== 'Empty') {
                    // Reset to default empty state
                    equippedItemIcon.src = 'images/tools/no-hatchet.png'; // Default empty image
                    equippedItemIcon.alt = 'Equipped Hatchet';
                    equippedItemName.textContent = 'Empty';

                    // Make the previously equipped item visible again in the inventory
                    if (currentlyEquippedItemElement) {
                        currentlyEquippedItemElement.style.display = ''; // Or remove 'hidden' class
                        currentlyEquippedItemElement = null; // Clear the reference
                    }
                 }
            });
            // Add cursor pointer to equipped slot if it's meant to be clickable
             equippedSlot.classList.add('cursor-pointer');
        }
    }

}); // End of the single, main DOMContentLoaded listener