// Storage utilities for managing data in localStorage

const STORAGE_KEYS = {
  MENU_ITEMS: 'menu_items',
  CATEGORIES: 'categories',
  ORDERS: 'orders',
  SELLER_INFO: 'seller_info',
  ADMIN_PASSWORD: 'admin_password',
};

// Default data
const defaultCategories = [
  { id: '1', name: 'Main Dishes', order: 1 },
  { id: '2', name: 'Rice & Sides', order: 2 },
  { id: '3', name: 'Appetizers', order: 3 },
];

const defaultMenuItems = [
  {
    id: '1',
    name: 'Chicken Adobo',
    description: 'Classic Filipino chicken braised in soy sauce, vinegar, and garlic',
    price: 85,
    available: true,
    categoryId: '1',
    isDailySpecial: true,
    imageUrl: 'https://images.unsplash.com/photo-1742666208520-8739462e8cb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMGFkb2JvJTIwY2hpY2tlbnxlbnwxfHx8fDE3NzM2NzQ1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '2',
    name: 'Garlic Fried Rice',
    description: 'Fragrant rice stir-fried with garlic and vegetables',
    price: 35,
    available: true,
    categoryId: '2',
    isDailySpecial: false,
    imageUrl: 'https://images.unsplash.com/photo-1581184953987-5668072c8420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMHJpY2UlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc3MzY3NDU5MHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '3',
    name: 'Pork Sisig',
    description: 'Sizzling chopped pork with onions, chili peppers, and calamansi',
    price: 95,
    available: false,
    categoryId: '1',
    isDailySpecial: false,
    imageUrl: 'https://images.unsplash.com/photo-1646821195934-fb7ddb6166ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JrJTIwc2lzaWclMjBmaWxpcGlub3xlbnwxfHx8fDE3NzM2NzQ1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '4',
    name: 'Beef Caldereta',
    description: 'Tender beef stew in tomato sauce with potatoes and bell peppers',
    price: 110,
    available: true,
    categoryId: '1',
    isDailySpecial: false,
    imageUrl: 'https://images.unsplash.com/photo-1758762972966-c7d0eecd09d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwc3RldyUyMGFzaWFufGVufDF8fHx8MTc3MzY3NDU5MHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '5',
    name: 'Lumpiang Shanghai',
    description: 'Crispy Filipino spring rolls filled with seasoned pork and vegetables',
    price: 60,
    available: true,
    categoryId: '3',
    isDailySpecial: false,
    imageUrl: 'https://images.unsplash.com/photo-1598404148538-f0bc11a5515c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBsdW1waWElMjBzcHJpbmclMjByb2xsc3xlbnwxfHx8fDE3NzM2NzQ1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const defaultSellerInfo = {
  name: "Nanay's Kitchen",
  tagline: "Home-cooked Filipino Meals",
  phone: "+63 912 345 6789",
  messenger: "https://m.me/nanayskitchen"
};

// Initialize storage with default data
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MENU_ITEMS)) {
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(defaultMenuItems));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    const sampleOrders = [
      {
        id: Date.now().toString(),
        customerName: 'Juan Dela Cruz',
        customerPhone: '+63 917 123 4567',
        items: [
          { menuItemId: '1', menuItemName: 'Chicken Adobo', quantity: 2, price: 85 },
          { menuItemId: '2', menuItemName: 'Garlic Fried Rice', quantity: 2, price: 35 },
        ],
        totalAmount: 240,
        status: 'pending',
        createdAt: new Date().toISOString(),
        notes: 'Extra garlic please!'
      },
      {
        id: (Date.now() - 3600000).toString(),
        customerName: 'Maria Santos',
        customerPhone: '+63 918 765 4321',
        items: [
          { menuItemId: '4', menuItemName: 'Beef Caldereta', quantity: 1, price: 110 },
          { menuItemId: '5', menuItemName: 'Lumpiang Shanghai', quantity: 1, price: 60 },
        ],
        totalAmount: 170,
        status: 'preparing',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: (Date.now() - 7200000).toString(),
        customerName: 'Pedro Reyes',
        customerPhone: '+63 919 111 2222',
        items: [
          { menuItemId: '1', menuItemName: 'Chicken Adobo', quantity: 3, price: 85 },
        ],
        totalAmount: 255,
        status: 'completed',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      }
    ];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(sampleOrders));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SELLER_INFO)) {
    localStorage.setItem(STORAGE_KEYS.SELLER_INFO, JSON.stringify(defaultSellerInfo));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD)) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, 'admin123');
  }
}

// Menu Items
function getMenuItems() {
  const data = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
  return data ? JSON.parse(data) : defaultMenuItems;
}

function saveMenuItem(item) {
  const items = getMenuItems();
  const index = items.findIndex(i => i.id === item.id);
  if (index >= 0) {
    items[index] = item;
  } else {
    items.push(item);
  }
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
}

function deleteMenuItem(id) {
  const items = getMenuItems().filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
}

// Categories
function getCategories() {
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return data ? JSON.parse(data) : defaultCategories;
}

function saveCategory(category) {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === category.id);
  if (index >= 0) {
    categories[index] = category;
  } else {
    categories.push(category);
  }
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
}

function deleteCategory(id) {
  const categories = getCategories().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
}

// Orders
function getOrders() {
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return data ? JSON.parse(data) : [];
}

function saveOrder(order) {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === order.id);
  if (index >= 0) {
    orders[index] = order;
  } else {
    orders.push(order);
  }
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

function deleteOrder(id) {
  const orders = getOrders().filter(o => o.id !== id);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

// Seller Info
function getSellerInfo() {
  const data = localStorage.getItem(STORAGE_KEYS.SELLER_INFO);
  return data ? JSON.parse(data) : defaultSellerInfo;
}

function saveSellerInfo(info) {
  localStorage.setItem(STORAGE_KEYS.SELLER_INFO, JSON.stringify(info));
}

// Admin Auth
function checkAdminPassword(password) {
  const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
  return password === stored;
}

function updateAdminPassword(newPassword) {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPassword);
}
