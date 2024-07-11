
const isLoggedIn = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return true;
  } else {
    try {
      const response = await fetch('http://localhost:5000/refresh', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        return true;
      }
    } catch (err) {
      console.error('Error checking refresh token:', err);
    }
  }
}

export default isLoggedIn;