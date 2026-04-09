// Reusable component functions

// Icon SVG templates
const icons = {
  clock: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  settings: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m-6-6h6m6 0h6m-9.5 9.5l4.5-4.5m0 9l-4.5-4.5m4.5-4.5l4.5-4.5m-13.5 0l4.5 4.5"></path></svg>',
  messageCircle: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
  phone: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
  star: '<svg class="icon icon-fill" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
  plus: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
  pencil: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',
  trash: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
  eye: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
  lock: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
  logOut: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>',
  home: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
  checkCircle: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
  xCircle: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
  gripVertical: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>',
};

// Create menu item HTML
function createMenuItemHTML(item) {
  return `
    <div class="menu-item ${!item.available ? 'sold-out' : ''}">
      ${item.isDailySpecial ? `
        <div class="menu-item-special-badge">
          ${icons.star}
        </div>
      ` : ''}
      <div class="menu-item-content">
        ${item.imageUrl ? `
          <img src="${item.imageUrl}" alt="${item.name}" class="menu-item-image">
        ` : ''}
        <div class="menu-item-details">
          <div class="menu-item-header">
            <div>
              <div class="menu-item-name">${item.name}</div>
              ${item.isDailySpecial ? '<div class="menu-item-special-text">Daily Special</div>' : ''}
            </div>
            <span class="badge ${item.available ? 'badge-success' : 'badge-secondary'}">
              ${item.available ? 'Available' : 'Sold Out'}
            </span>
          </div>
          <div class="menu-item-description">${item.description}</div>
          <div class="menu-item-price">₱${item.price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  `;
}

// Create modal overlay
function createModal(content, options = {}) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal ${options.large ? 'modal-large' : ''}">
      ${content}
    </div>
  `;
  
  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
  
  document.body.appendChild(modal);
  return modal;
}

function closeModal(modal) {
  modal.remove();
}

// Show confirmation dialog
function confirmDialog(message) {
  return confirm(message);
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

// Get status badge class
function getStatusBadgeClass(status) {
  const classes = {
    pending: 'badge-yellow',
    preparing: 'badge-blue',
    ready: 'badge-green',
    completed: 'badge-gray',
    cancelled: 'badge-red',
  };
  return classes[status] || 'badge-secondary';
}

// Get status icon
function getStatusIcon(status) {
  switch (status) {
    case 'ready':
    case 'completed':
      return icons.checkCircle;
    case 'cancelled':
      return icons.xCircle;
    default:
      return icons.clock;
  }
}

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = type === 'success' ? 'success-message' : 'error-message';
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.top = '1rem';
  toast.style.right = '1rem';
  toast.style.zIndex = '100';
  toast.style.animation = 'slideUp 0.3s';
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
