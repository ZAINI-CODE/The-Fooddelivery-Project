// Home/dashboard page script
// Currently simple – can be extended later if you add dynamic content.

document.addEventListener('DOMContentLoaded', () => {
  // Example: if user is logged in, show greeting
  try {
    const rawUser = localStorage.getItem('fd_user');
    if (rawUser) {
      const user = JSON.parse(rawUser);
      const locationText = document.getElementById('header-location-text');
      if (locationText) {
        locationText.textContent = `Welcome back, ${user.name}`;
      }
    }
  } catch (e) {
    console.warn('Failed to read user from storage', e);
  }
});