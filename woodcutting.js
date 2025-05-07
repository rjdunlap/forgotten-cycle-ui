/**
 * Woodcutting Content Switching
 * Handles the tab switching between different content sections in the woodcutting interface
 */
document.addEventListener('DOMContentLoaded', function() {
    // Info toggle functionality
    const infoToggle = document.getElementById('infoToggle');
    const dropInfoContent = document.getElementById('dropInfoContent');
    const combatInfoContent = document.getElementById('combatInfoContent');
    
    if (infoToggle && dropInfoContent && combatInfoContent) {
        infoToggle.addEventListener('click', function() {
            // Toggle visibility of content sections
            dropInfoContent.classList.toggle('hidden');
            combatInfoContent.classList.toggle('hidden');
        });
    }

    // Woodcutting tabs - using specific selectors
    const tabButtons = document.querySelectorAll('.border-b.border-text-heading nav button');
    if (tabButtons.length >= 2) {
        const firTab = tabButtons[0];  // First tab button (Fir)
        const elmTab = tabButtons[1];  // Second tab button (Elm)
        const firContent = document.getElementById('zone1_item1_content1');
        const elmContent = document.getElementById('zone1_item1_content2');
        
        if (firContent && elmContent) {
            // Set initial state - show Fir content, hide Elm content
            firContent.classList.remove('hidden');
            elmContent.classList.add('hidden');
            
            firTab.addEventListener('click', () => {
                // Update tab styling
                firTab.classList.add('border-button-bg', 'text-text-heading');
                firTab.classList.remove('border-transparent', 'text-text-primary', 'hover:text-text-heading', 'hover:border-gray-500');
                
                elmTab.classList.remove('border-button-bg', 'text-text-heading');
                elmTab.classList.add('border-transparent', 'text-text-primary', 'hover:text-text-heading', 'hover:border-gray-500');
                
                // Show/hide content
                firContent.classList.remove('hidden');
                elmContent.classList.add('hidden');
            });
            
            elmTab.addEventListener('click', () => {
                // Update tab styling
                elmTab.classList.add('border-button-bg', 'text-text-heading');
                elmTab.classList.remove('border-transparent', 'text-text-primary', 'hover:text-text-heading', 'hover:border-gray-500');
                
                firTab.classList.remove('border-button-bg', 'text-text-heading');
                firTab.classList.add('border-transparent', 'text-text-primary', 'hover:text-text-heading', 'hover:border-gray-500');
                
                // Show/hide content
                elmContent.classList.remove('hidden');
                firContent.classList.add('hidden');
            });
        }
    }
});