document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const responseMessage = document.getElementById('responseMessage');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // stop the page from reloading

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        responseMessage.style.color = 'green';
        responseMessage.textContent = '✅ Login successful!';
        // Store token in localStorage
        localStorage.setItem('token', data.token);

        // Redirect to dashboard after short delay so user sees message
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000); // 1 second delay
      } else {
        responseMessage.style.color = 'red';
        responseMessage.textContent = data.error || '❌ Login failed';
      }
    } catch (err) {
      responseMessage.style.color = 'red';
      responseMessage.textContent = '⚠️ Network error';
      console.error('Login error:', err);
    }
  });
});