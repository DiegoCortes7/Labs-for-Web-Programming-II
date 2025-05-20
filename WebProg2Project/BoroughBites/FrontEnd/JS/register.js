document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    const msg = document.getElementById('message');
    if (response.ok) {
      msg.textContent = '✅ Registered successfully!';
      msg.style.color = 'green';
      localStorage.setItem('token', data.token); // Save token
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    } else {
      msg.textContent = '❌ ' + data.error;
      msg.style.color = 'red';
    }
  } catch (err) {
    console.error('Error during registration:', err);
    document.getElementById('message').textContent = '❌ Registration failed.';
  }
});