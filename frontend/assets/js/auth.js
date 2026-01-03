// URL of backend API
const API_BASE_URL = 'http://localhost:5000';

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageEl = document.getElementById('auth-message');
const closeBtn = document.getElementById('close-modal');
const signupBtn = document.getElementById('signup-btn');
const googleLoginBtn = document.getElementById('google-login-btn');

// Get redirect URL from query params
const urlParams = new URLSearchParams(window.location.search);
const redirectUrl = urlParams.get('redirect') || 'index.html';

// Handle login submit
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageEl.textContent = '';
    messageEl.className = 'auth-message';

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showMessage('Please enter email and password.', 'error');
      return;
    }

    // Simple demo login - just save user data
    const user = {
      email: email,
      name: email.split('@')[0],
      loginMethod: 'email'
    };
    
    localStorage.setItem('fd_user', JSON.stringify(user));
    showMessage('Login successful! Redirecting...', 'success');

    // Redirect to original page or home
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 800);
  });
}

// Google Login (Simulated)
if (googleLoginBtn) {
  googleLoginBtn.addEventListener('click', () => {
    // Simulate Google login - in production, use Google OAuth
    const googleUser = {
      email: 'user@gmail.com',
      name: 'Google User',
      loginMethod: 'google'
    };
    
    localStorage.setItem('fd_user', JSON.stringify(googleUser));
    showMessage('Logged in with Google! Redirecting...', 'success');
    
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 800);
  });
}

function showMessage(msg, type) {
  messageEl.textContent = msg;
  messageEl.className = `auth-message ${type}`;
}

// Close button: go back to home
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

// Sign up button: go to register
if (signupBtn) {
  signupBtn.addEventListener('click', () => {
    window.location.href = 'register.html';
  });
}