// Mock data for central market
const userInfo = {
    balance: 539318053,
    warehouseCapacity: 919.7,
    warehouseMax: 5000,
};

const items = [
    {
        id: 1,
        name: "Azwell Longsword",
        inStock: 13,
        basePrice: 128000,
        warehouseCapacity: 50.0,
        priceHistory: [128000, 130000, 132000, 131000, 140000],
        sellers: [
            { price: 140000, qty: 2 },
            { price: 139000, qty: 2 },
            { price: 138000, qty: 2 },
            { price: 137000, qty: 1 },
            { price: 136000, qty: 1 },
            { price: 135000, qty: 1 },
            { price: 134000, qty: 1 },
            { price: 133000, qty: 1 },
            { price: 132000, qty: 1 },
            { price: 131000, qty: 1 }
        ]
    },
    // Add more items as needed
];

// TODO: Render item list, item details, price history chart, and buy/sell form
// TODO: Add event listeners for item selection and buy/sell actions

document.addEventListener('DOMContentLoaded', () => {
    // Render user info
    document.getElementById('balance-info').textContent = `Balance: ${userInfo.balance.toLocaleString()} gold`;
    document.getElementById('warehouse-info').textContent = `Warehouse: ${userInfo.warehouseCapacity} / ${userInfo.warehouseMax} VT`;

    // Render item list
    const itemList = document.getElementById('item-list');
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.onclick = () => selectItem(item.id);
        itemList.appendChild(li);
    });

    // Select first item by default
    if (items.length > 0) selectItem(items[0].id);
});

function selectItem(itemId) {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    document.getElementById('item-name').textContent = item.name;
    document.getElementById('item-stats').innerHTML = `
        <div>In Stock: ${item.inStock}</div>
        <div>Base Price: ${item.basePrice.toLocaleString()} gold</div>
        <div>Warehouse Capacity: ${item.warehouseCapacity} VT</div>
    `;
    // TODO: Render price history and sellers table, and buy/sell form
}
