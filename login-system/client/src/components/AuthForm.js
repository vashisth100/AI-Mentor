import { useState } from 'react';
import './AuthForm.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true); 

  return (
    <div className="card">
      <div className="tabs">
        <button
          className={isLogin ? 'tab active' : 'tab'}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={isLogin ? 'tab' : 'tab active'}
          onClick={() => setIsLogin(false)}
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
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <button className="btn-primary">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </div>

      {/* Switch mode link */}
      <p className="switch-text">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span
          className="switch-link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Register' : 'Login'}
        </span>
      </p>

    </div>
  );
}

export default AuthForm;