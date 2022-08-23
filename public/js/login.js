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
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('#signup-username').value.trim();
    const password = document.getElementById('#signup-password').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .getElementById('login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .getElementById('signup-form')
    .addEventListener('submit', signupFormHandler);
  