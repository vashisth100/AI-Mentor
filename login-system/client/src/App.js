import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (err) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn
        ? <Dashboard onLogout={handleLogout} />
        : <AuthForm onLoginSuccess={handleLoginSuccess} />
      }
    </div>
  );
}

export default App;