document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('⛔ No token found. Redirecting to login.');
    window.location.href = 'login.html';
    return;
  }

  const user = parseJwt(token);
  document.getElementById('welcomeMessage').textContent = `Welcome, ${user.username}!`;

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('👋 You have been logged out.');
    window.location.href = 'login.html';
  });
});

// Helper function to decode JWT
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Invalid token:', err);
    return {};
  }
}
