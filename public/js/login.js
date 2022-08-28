const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById('#login-username').value.trim();
  const password = document.getElementById('#login-password').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in.');
    }
  }
};

document.querySelector('input[name="submit"]').addEventListener('submit', loginFormHandler);
