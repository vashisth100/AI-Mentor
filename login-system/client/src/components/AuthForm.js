import { useState } from 'react';
import './AuthForm.css';
import API from '../api';

function AuthForm() {
  const [isLogin, setIsLogin]   = useState(true);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState('');

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setError('');
    setSuccess('');
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const res = await API.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setSuccess('Logged in successfully! 🎉');

      } else {
        await API.post('/auth/register', { email, password });
        setSuccess('Account created! You can now login. 🎉');

        setTimeout(() => {
          setIsLogin(true);
          setEmail('');
          setPassword('');
          setSuccess('');
        }, 2000);
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">

      {/* Tabs */}
      <div className="tabs">
        <button
          className={isLogin ? 'tab active' : 'tab'}
          onClick={handleSwitch}
        >
          Login
        </button>
        <button
          className={isLogin ? 'tab' : 'tab active'}
          onClick={handleSwitch}
        >
          Register
        </button>
      </div>

      <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
      <p className="subtitle">
        {isLogin ? 'Login to your account' : 'Sign up for free'}
      </p>

      <div className="form">
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {success && <p className="success-text">{success}</p>}
        {error   && <p className="error-text">{error}</p>}

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
      </div>

      <p className="switch-text">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span className="switch-link" onClick={handleSwitch}>
          {isLogin ? 'Register' : 'Login'}
        </span>
      </p>

    </div>
  );
}

export default AuthForm;
