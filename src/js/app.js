// Main application logic

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializeStorage();
  setupRouter();
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
});

// Router setup
function setupRouter() {
  // Set default route
  if (!window.location.hash) {
    window.location.hash = '#/';
  }
}

function handleRoute() {
  const hash = window.location.hash;
  const app = document.getElementById('app');
  
  // Check authentication for admin routes
  if (hash.startsWith('#/admin') && hash !== '#/admin/login') {
    if (!sessionStorage.getItem('admin_authenticated')) {
      window.location.hash = '#/admin/login';
      return;
    }
  }
  
  if (hash === '#/' || hash === '') {
    renderCustomerMenu(app);
  } else if (hash === '#/admin/login') {
    renderAdminLogin(app);
  } else if (hash === '#/admin') {
    renderAdminPanel(app);
  }
}

// Customer Menu Page
function renderCustomerMenu(app) {
  const sellerInfo = getSellerInfo();
  const menuItems = getMenuItems();
  const categories = getCategories().sort((a, b) => a.order - b.order);
  const currentDate = formatDate(new Date());
  
  const dailySpecials = menuItems.filter(item => item.isDailySpecial && item.available);
  
  app.innerHTML = `
    <div class="menu-header">
      <div class="menu-header-content">
        <div style="flex: 1;">
          <h1>${sellerInfo.name}</h1>
          <div class="menu-header-tagline">${sellerInfo.tagline}</div>
          <div class="menu-header-date">
            ${icons.clock}
            <span>${currentDate}</span>
          </div>
        </div>
        <a href="#/admin/login">
          <button class="btn btn-secondary btn-sm">
            ${icons.settings}
            Admin
          </button>
        </a>
      </div>
    </div>
    
    <div class="menu-content">
      ${dailySpecials.length > 0 ? `
        <div class="menu-section">
          <h2 class="menu-section-title">⭐ Today's Specials</h2>
          <div class="space-y-3">
            ${dailySpecials.map(item => createMenuItemHTML(item)).join('')}
          </div>
        </div>
      ` : ''}
      
      ${categories.map(category => {
        const categoryItems = menuItems.filter(item => item.categoryId === category.id);
        if (categoryItems.length === 0) return '';
        
        return `
          <div class="menu-section">
            <h2 class="menu-section-title">${category.name}</h2>
            <div class="space-y-3">
              ${categoryItems.map(item => createMenuItemHTML(item)).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
    
    <div class="contact-footer">
      <div class="contact-footer-content">
        <p class="contact-footer-text">Ready to order?</p>
        <div class="contact-buttons">
          <button class="btn btn-blue" onclick="window.open('${sellerInfo.messenger}', '_blank')">
            ${icons.messageCircle}
            Message Us
          </button>
          <button class="btn btn-primary" onclick="window.location.href='tel:${sellerInfo.phone}'">
            ${icons.phone}
            Call Now
          </button>
        </div>
      </div>
    </div>
  `;
}

// Admin Login Page
function renderAdminLogin(app) {
  app.innerHTML = `
    <div class="admin-login-container">
      <div class="card login-card">
        <div class="card-header text-center">
          <div class="login-icon">
            ${icons.lock}
          </div>
          <h2 class="card-title">Admin Login</h2>
          <p class="card-description">Enter your password to access the admin panel</p>
        </div>
        <div class="card-content">
          <form id="loginForm" class="space-y-4">
            <div class="form-group">
              <label class="label">Password</label>
              <input type="password" id="password" class="input" placeholder="Enter admin password">
              <div id="loginError" class="error-message hidden"></div>
              <p class="helper-text">Default password: admin123</p>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              Login
            </button>
            <a href="#/">
              <button type="button" class="btn btn-outline" style="width: 100%;">
                Back to Menu
              </button>
            </a>
          </form>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('loginError');
    
    if (checkAdminPassword(password)) {
      sessionStorage.setItem('admin_authenticated', 'true');
      window.location.hash = '#/admin';
    } else {
      errorEl.textContent = 'Incorrect password';
      errorEl.classList.remove('hidden');
    }
  });
  
  document.getElementById('password').addEventListener('input', () => {
    document.getElementById('loginError').classList.add('hidden');
  });
}

// Admin Panel Page
let currentTab = 'menu';

function renderAdminPanel(app) {
  app.innerHTML = `
    <div class="admin-header">
      <div class="admin-header-content">
        <h1>Admin Panel</h1>
        <div class="flex gap-2">
          <a href="#/">
            <button class="btn btn-secondary btn-sm">
              ${icons.home}
              View Menu
            </button>
          </a>
          <button class="btn btn-secondary btn-sm" onclick="handleLogout()">
            ${icons.logOut}
            Logout
          </button>
        </div>
      </div>
    </div>
    
    <div class="admin-content">
      <div class="tabs">
        <div class="tab-list">
          <button class="tab ${currentTab === 'menu' ? 'active' : ''}" onclick="switchTab('menu')">
            Menu Items
          </button>
          <button class="tab ${currentTab === 'categories' ? 'active' : ''}" onclick="switchTab('categories')">
            Categories
          </button>
          <button class="tab ${currentTab === 'orders' ? 'active' : ''}" onclick="switchTab('orders')">
            Orders
          </button>
          <button class="tab ${currentTab === 'settings' ? 'active' : ''}" onclick="switchTab('settings')">
            Settings
          </button>
        </div>
      </div>
      
      <div id="tabContent"></div>
    </div>
  `;
  
  renderTabContent();
}

window.handleLogout = function() {
  sessionStorage.removeItem('admin_authenticated');
  window.location.hash = '#/admin/login';
};

window.switchTab = function(tab) {
  currentTab = tab;
  renderTabContent();
  
  // Update active tab
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
};

function renderTabContent() {
  const content = document.getElementById('tabContent');
  
  switch (currentTab) {
    case 'menu':
      renderMenuManagement(content);
      break;
    case 'categories':
      renderCategoryManagement(content);
      break;
    case 'orders':
      renderOrderManagement(content);
      break;
    case 'settings':
      renderSettingsManagement(content);
      break;
  }
}

// Menu Management Tab
function renderMenuManagement(container) {
  const menuItems = getMenuItems();
  const categories = getCategories();
  
  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="card-title">Menu Items</h2>
            <p class="card-description">Manage your menu items, prices, and availability</p>
          </div>
          <button class="btn btn-primary" onclick="openMenuItemDialog()">
            ${icons.plus}
            Add Item
          </button>
        </div>
      </div>
      <div class="card-content">
        <div class="item-list">
          ${menuItems.length === 0 ? '<p class="empty-state">No menu items yet. Add your first item!</p>' : 
            menuItems.map(item => {
              const category = categories.find(c => c.id === item.categoryId);
              return `
                <div class="item-card">
                  ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" class="item-image">` : ''}
                  <div class="item-details">
                    <div class="item-title">
                      ${item.name}
                      ${item.isDailySpecial ? icons.star : ''}
                    </div>
                    <div class="item-description">${item.description}</div>
                    <div class="item-meta">
                      <span class="item-price">₱${item.price.toFixed(2)}</span>
                      <span class="item-category">${category?.name || 'Unknown'}</span>
                    </div>
                  </div>
                  <div class="item-actions">
                    <button class="btn btn-sm ${item.available ? 'btn-primary' : 'btn-secondary'}" 
                            onclick="toggleAvailability('${item.id}')">
                      ${item.available ? 'Available' : 'Sold Out'}
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="editMenuItem('${item.id}')">
                      ${icons.pencil}
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="deleteMenuItemConfirm('${item.id}')">
                      ${icons.trash}
                    </button>
                  </div>
                </div>
              `;
            }).join('')
          }
        </div>
      </div>
    </div>
  `;
}

window.toggleAvailability = function(id) {
  const item = getMenuItems().find(i => i.id === id);
  if (item) {
    item.available = !item.available;
    saveMenuItem(item);
    renderMenuManagement(document.getElementById('tabContent'));
  }
};

window.deleteMenuItemConfirm = function(id) {
  if (confirmDialog('Are you sure you want to delete this menu item?')) {
    deleteMenuItem(id);
    renderMenuManagement(document.getElementById('tabContent'));
  }
};

window.editMenuItem = function(id) {
  const item = getMenuItems().find(i => i.id === id);
  if (item) {
    openMenuItemDialog(item);
  }
};

window.openMenuItemDialog = function(item = null) {
  const categories = getCategories();
  const isEdit = !!item;
  
  const modalContent = `
    <div class="modal-header">
      <h2 class="modal-title">${isEdit ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
      <p class="modal-description">Fill in the details for the menu item</p>
    </div>
    <div class="modal-body">
      <form id="menuItemForm" class="space-y-4">
        <div class="form-group">
          <label class="label">Name *</label>
          <input type="text" id="itemName" class="input" value="${item?.name || ''}" placeholder="e.g., Chicken Adobo" required>
        </div>
        <div class="form-group">
          <label class="label">Description *</label>
          <textarea id="itemDescription" class="textarea" placeholder="Describe the dish..." required>${item?.description || ''}</textarea>
        </div>
        <div class="grid grid-2 gap-3">
          <div class="form-group">
            <label class="label">Price (₱) *</label>
            <input type="number" id="itemPrice" class="input" value="${item?.price || ''}" step="0.01" placeholder="0.00" required>
          </div>
          <div class="form-group">
            <label class="label">Category *</label>
            <select id="itemCategory" class="select" required>
              ${categories.map(cat => `
                <option value="${cat.id}" ${item?.categoryId === cat.id ? 'selected' : ''}>${cat.name}</option>
              `).join('')}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="label">Image URL</label>
          <input type="url" id="itemImageUrl" class="input" value="${item?.imageUrl || ''}" placeholder="https://...">
          <p class="helper-text">Optional: Add an image URL for the dish</p>
        </div>
        <div class="switch-container">
          <label class="label" style="margin: 0;">Available for order</label>
          <label class="switch">
            <input type="checkbox" id="itemAvailable" ${item?.available !== false ? 'checked' : ''}>
            <span class="switch-slider"></span>
          </label>
        </div>
        <div class="switch-container" style="background-color: #fef3c7;">
          <div class="flex items-center gap-2">
            ${icons.star}
            <label class="label" style="margin: 0;">Mark as Daily Special</label>
          </div>
          <label class="switch">
            <input type="checkbox" id="itemSpecial" ${item?.isDailySpecial ? 'checked' : ''}>
            <span class="switch-slider"></span>
          </label>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline" onclick="closeCurrentModal()">Cancel</button>
      <button type="button" class="btn btn-primary" onclick="saveMenuItemForm('${item?.id || ''}')">Save</button>
    </div>
  `;
  
  window.currentModal = createModal(modalContent, { large: true });
};

window.saveMenuItemForm = function(itemId) {
  const form = document.getElementById('menuItemForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  const menuItem = {
    id: itemId || Date.now().toString(),
    name: document.getElementById('itemName').value,
    description: document.getElementById('itemDescription').value,
    price: parseFloat(document.getElementById('itemPrice').value),
    categoryId: document.getElementById('itemCategory').value,
    imageUrl: document.getElementById('itemImageUrl').value,
    available: document.getElementById('itemAvailable').checked,
    isDailySpecial: document.getElementById('itemSpecial').checked,
  };
  
  saveMenuItem(menuItem);
  closeCurrentModal();
  renderMenuManagement(document.getElementById('tabContent'));
  showToast(itemId ? 'Menu item updated!' : 'Menu item added!');
};

window.closeCurrentModal = function() {
  if (window.currentModal) {
    closeModal(window.currentModal);
    window.currentModal = null;
  }
};

// Category Management Tab
function renderCategoryManagement(container) {
  const categories = getCategories().sort((a, b) => a.order - b.order);
  const menuItems = getMenuItems();
  
  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="card-title">Categories</h2>
            <p class="card-description">Organize your menu items into categories</p>
          </div>
          <button class="btn btn-primary" onclick="openCategoryDialog()">
            ${icons.plus}
            Add Category
          </button>
        </div>
      </div>
      <div class="card-content">
        <div class="space-y-2">
          ${categories.length === 0 ? '<p class="empty-state">No categories yet. Add your first category!</p>' :
            categories.map(category => {
              const itemCount = menuItems.filter(item => item.categoryId === category.id).length;
              return `
                <div class="item-card">
                  ${icons.gripVertical}
                  <div class="item-details" style="flex: 1;">
                    <div class="item-title">${category.name}</div>
                    <div class="item-description">${itemCount} item${itemCount !== 1 ? 's' : ''}</div>
                  </div>
                  <span style="font-size: 0.875rem; color: #6b7280;">Order: ${category.order}</span>
                  <div class="flex gap-2">
                    <button class="btn btn-outline btn-sm" onclick="editCategory('${category.id}')">
                      ${icons.pencil}
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="deleteCategoryConfirm('${category.id}')">
                      ${icons.trash}
                    </button>
                  </div>
                </div>
              `;
            }).join('')
          }
        </div>
      </div>
    </div>
  `;
}

window.editCategory = function(id) {
  const category = getCategories().find(c => c.id === id);
  if (category) {
    openCategoryDialog(category);
  }
};

window.deleteCategoryConfirm = function(id) {
  const menuItems = getMenuItems();
  const hasItems = menuItems.some(item => item.categoryId === id);
  
  if (hasItems) {
    alert('Cannot delete category that contains menu items. Please delete or move the items first.');
    return;
  }
  
  if (confirmDialog('Are you sure you want to delete this category?')) {
    deleteCategory(id);
    renderCategoryManagement(document.getElementById('tabContent'));
  }
};

window.openCategoryDialog = function(category = null) {
  const categories = getCategories();
  const isEdit = !!category;
  const maxOrder = Math.max(...categories.map(c => c.order), 0);
  
  const modalContent = `
    <div class="modal-header">
      <h2 class="modal-title">${isEdit ? 'Edit Category' : 'Add New Category'}</h2>
      <p class="modal-description">Create a category to group related menu items</p>
    </div>
    <div class="modal-body">
      <form id="categoryForm" class="space-y-4">
        <div class="form-group">
          <label class="label">Category Name *</label>
          <input type="text" id="categoryName" class="input" value="${category?.name || ''}" placeholder="e.g., Main Dishes" required>
        </div>
        <div class="form-group">
          <label class="label">Display Order *</label>
          <input type="number" id="categoryOrder" class="input" value="${category?.order || maxOrder + 1}" placeholder="1" required>
          <p class="helper-text">Lower numbers appear first in the menu</p>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline" onclick="closeCurrentModal()">Cancel</button>
      <button type="button" class="btn btn-primary" onclick="saveCategoryForm('${category?.id || ''}')">Save</button>
    </div>
  `;
  
  window.currentModal = createModal(modalContent);
};

window.saveCategoryForm = function(categoryId) {
  const form = document.getElementById('categoryForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  const category = {
    id: categoryId || Date.now().toString(),
    name: document.getElementById('categoryName').value,
    order: parseInt(document.getElementById('categoryOrder').value),
  };
  
  saveCategory(category);
  closeCurrentModal();
  renderCategoryManagement(document.getElementById('tabContent'));
  showToast(categoryId ? 'Category updated!' : 'Category added!');
};

// Order Management Tab
let orderFilter = 'all';

function renderOrderManagement(container) {
  const orders = getOrders().sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const filteredOrders = orderFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status === orderFilter);
  
  const today = new Date().toDateString();
  const todayOrders = orders.filter(order => 
    new Date(order.createdAt).toDateString() === today
  );
  
  const todayRevenue = todayOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, order) => sum + order.totalAmount, 0);
  
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  
  container.innerHTML = `
    <div class="space-y-4">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Today's Orders</div>
          <div class="stat-value">${todayOrders.length}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Today's Revenue</div>
          <div class="stat-value green">₱${todayRevenue.toFixed(2)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Pending Orders</div>
          <div class="stat-value yellow">${pendingCount}</div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="card-title">Orders</h2>
              <p class="card-description">View and manage customer orders</p>
            </div>
            <select class="select filter-select" onchange="filterOrders(this.value)">
              <option value="all" ${orderFilter === 'all' ? 'selected' : ''}>All Orders</option>
              <option value="pending" ${orderFilter === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="preparing" ${orderFilter === 'preparing' ? 'selected' : ''}>Preparing</option>
              <option value="ready" ${orderFilter === 'ready' ? 'selected' : ''}>Ready</option>
              <option value="completed" ${orderFilter === 'completed' ? 'selected' : ''}>Completed</option>
              <option value="cancelled" ${orderFilter === 'cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </div>
        </div>
        <div class="card-content">
          <div class="space-y-3">
            ${filteredOrders.length === 0 ? 
              `<p class="empty-state">${orderFilter === 'all' ? 'No orders yet' : `No ${orderFilter} orders`}</p>` :
              filteredOrders.map(order => `
                <div class="item-card">
                  <div class="item-details" style="flex: 1;">
                    <div class="flex items-center gap-2" style="margin-bottom: 0.25rem;">
                      <div class="item-title">${order.customerName}</div>
                      <span class="badge ${getStatusBadgeClass(order.status)}">
                        ${getStatusIcon(order.status)}
                        ${order.status}
                      </span>
                    </div>
                    <div class="item-description">${order.customerPhone}</div>
                    <div class="item-meta">
                      <span style="font-size: 0.875rem; color: #6b7280;">
                        ${order.items.length} item${order.items.length !== 1 ? 's' : ''}
                      </span>
                      <span class="item-price">₱${order.totalAmount.toFixed(2)}</span>
                      <span style="font-size: 0.75rem; color: #9ca3af;">
                        ${formatDateTime(order.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button class="btn btn-outline btn-sm" onclick="viewOrder('${order.id}')">
                      ${icons.eye}
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="deleteOrderConfirm('${order.id}')">
                      ${icons.trash}
                    </button>
                  </div>
                </div>
              `).join('')
            }
          </div>
        </div>
      </div>
    </div>
  `;
}

window.filterOrders = function(filter) {
  orderFilter = filter;
  renderOrderManagement(document.getElementById('tabContent'));
};

window.deleteOrderConfirm = function(id) {
  if (confirmDialog('Are you sure you want to delete this order?')) {
    deleteOrder(id);
    renderOrderManagement(document.getElementById('tabContent'));
  }
};

window.viewOrder = function(id) {
  const order = getOrders().find(o => o.id === id);
  if (!order) return;
  
  const modalContent = `
    <div class="modal-header">
      <h2 class="modal-title">Order Details</h2>
      <p class="modal-description">Order #${order.id}</p>
    </div>
    <div class="modal-body">
      <div class="space-y-4">
        <div class="grid grid-2 gap-4">
          <div>
            <label class="label" style="color: #6b7280;">Customer Name</label>
            <p style="font-weight: 500;">${order.customerName}</p>
          </div>
          <div>
            <label class="label" style="color: #6b7280;">Phone Number</label>
            <p style="font-weight: 500;">${order.customerPhone}</p>
          </div>
          <div>
            <label class="label" style="color: #6b7280;">Order Date</label>
            <p style="font-weight: 500;">${formatDateTime(order.createdAt)}</p>
          </div>
          <div>
            <label class="label" style="color: #6b7280;">Status</label>
            <select class="select" id="orderStatus" onchange="updateOrderStatus('${order.id}', this.value)">
              <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
              <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>Ready</option>
              <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
              <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="label" style="color: #6b7280;">Order Items</label>
          <div class="space-y-2" style="margin-top: 0.5rem;">
            ${order.items.map(item => `
              <div class="order-item">
                <div>
                  <div class="order-item-name">${item.menuItemName}</div>
                  <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                </div>
                <div class="order-item-price">₱${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        ${order.notes ? `
          <div>
            <label class="label" style="color: #6b7280;">Notes</label>
            <p style="margin-top: 0.25rem; padding: 0.75rem; background-color: #f9fafb; border-radius: 0.5rem;">
              ${order.notes}
            </p>
          </div>
        ` : ''}
        
        <div class="order-total">
          <span class="order-total-label">Total Amount</span>
          <span class="order-total-amount">₱${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" onclick="closeCurrentModal()">Close</button>
    </div>
  `;
  
  window.currentModal = createModal(modalContent, { large: true });
};

window.updateOrderStatus = function(orderId, status) {
  const order = getOrders().find(o => o.id === orderId);
  if (order) {
    order.status = status;
    saveOrder(order);
    showToast('Order status updated!');
  }
};

// Settings Management Tab
function renderSettingsManagement(container) {
  const sellerInfo = getSellerInfo();
  
  container.innerHTML = `
    <div class="space-y-4">
      <div id="settingsMessage"></div>
      
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Business Information</h2>
          <p class="card-description">Update your business details displayed on the menu</p>
        </div>
        <div class="card-content">
          <form id="sellerInfoForm" class="space-y-4">
            <div class="form-group">
              <label class="label">Business Name</label>
              <input type="text" id="businessName" class="input" value="${sellerInfo.name}" placeholder="Your Business Name">
            </div>
            <div class="form-group">
              <label class="label">Tagline</label>
              <input type="text" id="businessTagline" class="input" value="${sellerInfo.tagline}" placeholder="Your business tagline">
            </div>
            <div class="form-group">
              <label class="label">Phone Number</label>
              <input type="tel" id="businessPhone" class="input" value="${sellerInfo.phone}" placeholder="+63 XXX XXX XXXX">
            </div>
            <div class="form-group">
              <label class="label">Messenger Link</label>
              <input type="url" id="businessMessenger" class="input" value="${sellerInfo.messenger}" placeholder="https://m.me/yourbusiness">
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Security</h2>
          <p class="card-description">Change your admin panel password</p>
        </div>
        <div class="card-content">
          <form id="passwordForm" class="space-y-4">
            <div class="form-group">
              <label class="label">New Password</label>
              <input type="password" id="newPassword" class="input" placeholder="Enter new password">
            </div>
            <div class="form-group">
              <label class="label">Confirm Password</label>
              <input type="password" id="confirmPassword" class="input" placeholder="Confirm new password">
              <div id="passwordError" class="error-message hidden"></div>
            </div>
            <button type="submit" class="btn btn-primary">Change Password</button>
          </form>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Admin Access</h2>
          <p class="card-description">How to access the admin panel</p>
        </div>
        <div class="card-content">
          <div style="font-size: 0.875rem; color: #6b7280;">
            <p>To access the admin panel, navigate to:</p>
            <code style="display: block; background-color: #f3f4f6; padding: 0.5rem; border-radius: 0.25rem; margin: 0.5rem 0;">
              #/admin/login
            </code>
            <p style="margin-top: 1rem;">Or click the admin link from the customer menu page.</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('sellerInfoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const info = {
      name: document.getElementById('businessName').value,
      tagline: document.getElementById('businessTagline').value,
      phone: document.getElementById('businessPhone').value,
      messenger: document.getElementById('businessMessenger').value,
    };
    
    saveSellerInfo(info);
    showToast('Business information updated successfully!');
  });
  
  document.getElementById('passwordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorEl = document.getElementById('passwordError');
    
    if (newPassword.length < 6) {
      errorEl.textContent = 'Password must be at least 6 characters';
      errorEl.classList.remove('hidden');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      errorEl.textContent = 'Passwords do not match';
      errorEl.classList.remove('hidden');
      return;
    }
    
    updateAdminPassword(newPassword);
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    errorEl.classList.add('hidden');
    showToast('Password updated successfully!');
  });
  
  document.getElementById('newPassword').addEventListener('input', () => {
    document.getElementById('passwordError').classList.add('hidden');
  });
  
  document.getElementById('confirmPassword').addEventListener('input', () => {
    document.getElementById('passwordError').classList.add('hidden');
  });
}
