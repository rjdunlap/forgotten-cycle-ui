// Mock inventory data - replace with actual data from your backend
const mockInventory = [
    { id: 1, name: "Fir Log", image: "images/logs/fir-log.png", quantity: 5500 },
    { id: 2, name: "Elm Log", image: "images/logs/elm-log.png", quantity: 3200 },
    { id: 3, name: "Beech Log", image: "images/logs/beech-log.png", quantity: 2800 },
    { id: 4, name: "Oak Log", image: "images/logs/oak-log.png", quantity: 1500 },
    { id: 5, name: "Birch Log", image: "images/logs/birch-log.png", quantity: 900 },
    { id: 6, name: "Maple Log", image: "images/logs/maple-log.png", quantity: 750 },
    { id: 7, name: "Willow Log", image: "images/logs/willow-log.png", quantity: 450 },
    { id: 8, name: "Cypress Log", image: "images/logs/cypress-log.png", quantity: 200 },
    { id: 9, name: "Rubra Wood", image: "images/logs/rubra-log.png", quantity: 100 },
    { id: 10, name: "Copper Ore", image: "images/mining/copper-ore.png", quantity: 2650 },
    { id: 11, name: "Iron Ore", image: "images/mining/iron-ore.png", quantity: 6600 },
    { id: 12, name: "Mithril Bar", image: "images/smelting/mithril-bar.png", quantity: 9200 }
];

// Configuration
const INVENTORY_SIZE = 100;

// DOM Elements
const inventoryGrid = document.querySelector('.grid-cols-5.sm\\:grid-cols-7.md\\:grid-cols-10');
const searchInput = document.querySelector('input[placeholder="Search inventory"]');
const slotsCounter = document.querySelector('.absolute.right-3');

// Function to format numbers (e.g., 1500 -> 1.5K)
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Function to create an item slot
function createItemSlot(item) {
    const slot = document.createElement('div');
    slot.className = 'relative bg-bg-primary p-1.5 rounded border border-text-heading hover:border-text-primary cursor-pointer';
    slot.id = `inventory-item-${item.id}`;

    // Add click handler to show item details
    slot.addEventListener('click', () => showItemDetails(item));

    slot.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="w-full h-auto"/>
        <span class="absolute bottom-0.5 right-0.5 text-text-primary text-xs">${formatNumber(item.quantity)}</span>
    `;

    return slot;
}

// Function to show item details in the right panel
function showItemDetails(item) {
    const detailsPanel = document.querySelector('.space-y-4 .text-center');
    detailsPanel.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="mx-auto w-24 h-24 mb-4"/>
        <h3 class="text-text-heading text-xl mb-2">${item.name}</h3>
        <p class="text-text-primary">Quantity: ${item.quantity}</p>
    `;
}

// Function to update inventory display
function updateInventoryDisplay(items) {
    // Clear existing grid
    inventoryGrid.innerHTML = '';

    // Add items to grid
    items.forEach(item => {
        inventoryGrid.appendChild(createItemSlot(item));
    });

    // Update slots counter
    slotsCounter.textContent = `${items.length} / ${INVENTORY_SIZE} Slots`;
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredItems = mockInventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm)
    );
    updateInventoryDisplay(filteredItems);
});

// Initialize inventory
document.addEventListener('DOMContentLoaded', () => {
    updateInventoryDisplay(mockInventory);
});