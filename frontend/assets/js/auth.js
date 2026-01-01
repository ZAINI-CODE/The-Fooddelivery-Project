// URL of backend API
const API_BASE_URL = 'http://localhost:5000';

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageEl = document.getElementById('auth-message');
const closeBtn = document.getElementById('close-modal');
const signupBtn = document.getElementById('signup-btn');

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

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        showMessage(data.message || 'Login failed.', 'error');
        return;
      }

      // Save user to localStorage
      localStorage.setItem('fd_user', JSON.stringify(data.user));

      showMessage('Login successful! Redirecting...', 'success');

      // Redirect to dashboard/home (index.html)
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 800);
    } catch (err) {
      console.error(err);
      showMessage('Server error. Please try again.', 'error');
    }
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

// Sign up button: for now, just go to register.html
if (signupBtn) {
  signupBtn.addEventListener('click', () => {
    window.location.href = 'register.html';
  });
}

// Optional: fake social buttons (just show an alert)
document.querySelectorAll('.btn-facebook, .btn-google, .btn-apple').forEach(
  (btn) => {
    btn.addEventListener('click', () => {
      alert('Social login is not implemented in this demo.');
    });
  }
);