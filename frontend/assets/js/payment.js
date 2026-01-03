// Payment Page Logic

// Check if user is logged in
function checkAuth() {
  const user = localStorage.getItem('fd_user');
  if (!user) {
    window.location.href = 'login.html?redirect=payment.html';
    return false;
  }
  return true;
}

// Check cart
const cart = getCart();
if (cart.length === 0) {
  window.location.href = 'restaurants.html';
}

// DOM Elements
const locationText = document.getElementById('location-text');
const currentLocationRow = document.getElementById('current-location-row');
const editAddressBtn = document.getElementById('edit-address-btn');
const addressForm = document.getElementById('address-form');
const locationMap = document.getElementById('location-map');
const missingStreetPrompt = document.getElementById('missing-street-prompt');

const deliveryOptions = document.querySelectorAll('input[name="delivery-type"]');
const scheduledPicker = document.getElementById('scheduled-picker');

const personalDetailsForm = document.getElementById('personal-details-form');
const saveDetailsBtn = document.getElementById('save-details-btn');
const fullnameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const mobileInput = document.getElementById('mobile');

const tipChips = document.querySelectorAll('.tip-chip-btn');
const customTipInput = document.getElementById('custom-tip');
const saveTipPref = document.getElementById('save-tip-pref');

const placeOrderBtn = document.getElementById('place-order-btn');

const summaryItems = document.getElementById('summary-items');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryDeliveryFee = document.getElementById('summary-delivery-fee');
const summaryServiceFee = document.getElementById('summary-service-fee');
const summaryTip = document.getElementById('summary-tip');
const tipRow = document.getElementById('tip-row');
const summaryTotal = document.getElementById('summary-total');
const restaurantName = document.getElementById('restaurant-name');

// State
let state = {
  address: null,
  addressLabel: null,
  deliveryType: 'standard',
  deliveryDate: null,
  deliveryTime: null,
  personalDetails: null,
  tip: 0,
  subtotal: 0,
  deliveryFee: 150,
  serviceFee: 50
};

// Load saved data
function loadSavedData() {
  // Load address
  const savedAddress = localStorage.getItem('fd_delivery_address');
  if (savedAddress) {
    try {
      const addr = JSON.parse(savedAddress);
      state.address = addr;
      displaySavedAddress(addr);
    } catch (e) {
      console.error('Failed to load address:', e);
    }
  }

  // Load personal details from user
  const user = localStorage.getItem('fd_user');
  if (user) {
    try {
      const userData = JSON.parse(user);
      if (fullnameInput) fullnameInput.value = userData.name || '';
      if (emailInput) emailInput.value = userData.email || '';
      if (mobileInput && userData.phone) mobileInput.value = userData.phone;
      
      state.personalDetails = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone || ''
      };
      
      validatePersonalDetails();
    } catch (e) {
      console.error('Failed to load user data:', e);
    }
  }

  // Load tip preference
  const savedTip = localStorage.getItem('fd_tip_preference');
  if (savedTip) {
    state.tip = parseInt(savedTip);
    updateTipDisplay();
  }
}

// Display saved address
function displaySavedAddress(addr) {
  if (locationText) {
    locationText.textContent = addr.label ? `${addr.label} - ${addr.street}` : addr.street || 'Lahore';
  }
  
  if (missingStreetPrompt && addr.street) {
    missingStreetPrompt.style.display = 'none';
  }
  
  // Pre-fill form fields
  if (addressForm) {
    document.getElementById('street').value = addr.street || '';
    document.getElementById('floor').value = addr.floor || '';
    document.getElementById('notes').value = addr.notes || '';
    
    // Select label chip
    const labelChip = document.querySelector(`.label-chip[data-label="${addr.label}"]`);
    if (labelChip) {
      document.querySelectorAll('.label-chip').forEach(b => b.classList.remove('active'));
      labelChip.classList.add('active');
    }
  }
}

// Show address form (always visible in new design)
function showAddressForm() {
  // Form is always visible, just focus on first input
  const streetInput = document.getElementById('street');
  if (streetInput) {
    streetInput.focus();
  }
}

// Address form submission
if (addressForm) {
  addressForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const street = document.getElementById('street').value.trim();
    const floor = document.getElementById('floor').value.trim();
    const notes = document.getElementById('notes').value.trim();
    
    const activeLabel = document.querySelector('.label-chip.active');
    const label = activeLabel ? activeLabel.dataset.label : 'Other';
    
    if (!street) {
      showToast('Please enter a street address');
      return;
    }
    
    state.address = { street, floor, notes, label };
    localStorage.setItem('fd_delivery_address', JSON.stringify(state.address));
    
    displaySavedAddress(state.address);
    
    // Hide missing street prompt
    if (missingStreetPrompt) {
      missingStreetPrompt.style.display = 'none';
    }
    
    checkFormCompletion();
    showToast('Address saved successfully');
  });
}

// Label chip selection
document.querySelectorAll('.label-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.label-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Edit address button
if (editAddressBtn) {
  editAddressBtn.addEventListener('click', showAddressForm);
}

// Map click simulation (update location text on map click)
if (locationMap) {
  locationMap.addEventListener('load', () => {
    // Simulate location selection from map
    // In a real implementation, this would use a geocoding API
  });
}

// Delivery options
deliveryOptions.forEach(option => {
  option.addEventListener('change', (e) => {
    state.deliveryType = e.target.value;
    
    if (state.deliveryType === 'scheduled') {
      scheduledPicker.style.display = 'block';
      
      // Set default date (tomorrow)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      document.getElementById('delivery-date').value = tomorrow.toISOString().split('T')[0];
      document.getElementById('delivery-date').min = tomorrow.toISOString().split('T')[0];
    } else {
      scheduledPicker.style.display = 'none';
    }
  });
});

// Personal details validation
function validatePersonalDetails() {
  const name = fullnameInput.value.trim();
  const email = emailInput.value.trim();
  const mobile = mobileInput.value.trim();
  
  const isValid = name && email && mobile && 
    email.includes('@') && 
    mobile.match(/^(\+92|0)?[0-9]{10}$/);
  
  if (saveDetailsBtn) {
    saveDetailsBtn.disabled = !isValid;
    saveDetailsBtn.classList.toggle('btn-secondary', !isValid);
    saveDetailsBtn.classList.toggle('btn-primary', isValid);
  }
  
  return isValid;
}

[fullnameInput, emailInput, mobileInput].forEach(input => {
  if (input) {
    input.addEventListener('input', () => {
      validatePersonalDetails();
      checkFormCompletion();
    });
  }
});

// Save personal details
if (saveDetailsBtn) {
  saveDetailsBtn.addEventListener('click', () => {
    const name = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const mobile = mobileInput.value.trim();
    
    state.personalDetails = { name, email, phone: mobile };
    
    // Update user in localStorage
    const user = JSON.parse(localStorage.getItem('fd_user') || '{}');
    user.name = name;
    user.email = email;
    user.phone = mobile;
    localStorage.setItem('fd_user', JSON.stringify(user));
    
    showToast('Personal details saved');
    checkFormCompletion();
  });
}

// Tip selection
tipChips.forEach(chip => {
  chip.addEventListener('click', () => {
    tipChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    
    state.tip = parseInt(chip.dataset.tip);
    customTipInput.value = '';
    
    updateTipDisplay();
    updateOrderSummary();
  });
});

// Custom tip
if (customTipInput) {
  customTipInput.addEventListener('input', () => {
    tipChips.forEach(c => c.classList.remove('active'));
    state.tip = parseInt(customTipInput.value) || 0;
    
    updateTipDisplay();
    updateOrderSummary();
  });
}

function updateTipDisplay() {
  // Update active chip
  tipChips.forEach(chip => {
    if (parseInt(chip.dataset.tip) === state.tip) {
      chip.classList.add('active');
    }
  });
}

// Check form completion
function checkFormCompletion() {
  const hasAddress = state.address && state.address.street;
  const hasDetails = state.personalDetails && 
    state.personalDetails.name && 
    state.personalDetails.email && 
    state.personalDetails.phone;
  
  const canPlaceOrder = hasAddress && hasDetails;
  
  if (placeOrderBtn) {
    placeOrderBtn.disabled = !canPlaceOrder;
  }
}

// Update order summary
function updateOrderSummary() {
  // Calculate subtotal
  state.subtotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  
  // Render items
  if (summaryItems) {
    summaryItems.innerHTML = cart.map(item => `
      <div class="summary-item">
        <div>
          <div class="summary-item-name">${item.qty} × ${item.name}</div>
        </div>
        <div class="summary-item-price">Rs. ${(item.price * item.qty).toFixed(0)}</div>
      </div>
    `).join('');
  }
  
  // Update totals
  if (summarySubtotal) summarySubtotal.textContent = `Rs. ${state.subtotal.toFixed(0)}`;
  if (summaryDeliveryFee) summaryDeliveryFee.textContent = `Rs. ${state.deliveryFee.toFixed(0)}`;
  if (summaryServiceFee) summaryServiceFee.textContent = `Rs. ${state.serviceFee.toFixed(0)}`;
  
  // Update tip
  if (state.tip > 0) {
    tipRow.style.display = 'flex';
    summaryTip.textContent = `Rs. ${state.tip.toFixed(0)}`;
  } else {
    tipRow.style.display = 'none';
  }
  
  // Calculate total
  const total = state.subtotal + state.deliveryFee + state.serviceFee + state.tip;
  if (summaryTotal) summaryTotal.textContent = `Rs. ${total.toFixed(0)}`;
  
  // Set restaurant name (from first item or default)
  if (restaurantName && cart.length > 0) {
    restaurantName.textContent = 'Your Restaurant';
  }
}

// Place order
if (placeOrderBtn) {
  placeOrderBtn.addEventListener('click', () => {
    if (!state.address || !state.personalDetails) {
      showToast('Please complete all required fields');
      return;
    }
    
    // Save tip preference if checked
    if (saveTipPref && saveTipPref.checked) {
      localStorage.setItem('fd_tip_preference', state.tip.toString());
    }
    
    // Create order
    const total = state.subtotal + state.deliveryFee + state.serviceFee + state.tip;
    const order = {
      orderId: 'ORD' + Date.now(),
      items: cart,
      subtotal: state.subtotal,
      deliveryFee: state.deliveryFee,
      serviceFee: state.serviceFee,
      tip: state.tip,
      total: total,
      timestamp: new Date().toISOString(),
      address: state.address,
      personalDetails: state.personalDetails,
      deliveryType: state.deliveryType,
      deliveryDate: state.deliveryDate,
      deliveryTime: state.deliveryTime,
      status: 'pending'
    };
    
    // Save order
    localStorage.setItem('fd_current_order', JSON.stringify(order));
    
    // Add to order history
    try {
      const orders = JSON.parse(localStorage.getItem('fd_orders') || '[]');
      orders.push(order);
      localStorage.setItem('fd_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save order history:', e);
    }
    
    // Clear cart
    clearCart();
    
    // Redirect to track order
    showToast('Order placed successfully!');
    setTimeout(() => {
      window.location.href = `track-order.html?orderId=${order.orderId}`;
    }, 1000);
  });
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (!checkAuth()) return;
  
  loadSavedData();
  updateOrderSummary();
  checkFormCompletion();
  
  // Edit address button
  if (editAddressBtn) {
    editAddressBtn.addEventListener('click', showAddressForm);
  }
});
