
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
      } else return false;

    } catch (err) {
      console.error('Error getting the refresh token.', err);
      return false;
    }
  }
}

export default isLoggedIn;