import React, { useState, useContext } from 'react';
import { login_user, register_user } from '../api/endpoints';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    email: '', 
    name: '', 
    password: '', 
    password_confirmation: '' 
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await login_user(loginData.email, loginData.password);
      login(user, token);
      alert('Login successful!');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await register_user(
        signupData.name, 
        signupData.email, 
        signupData.password, 
        signupData.password_confirmation
      );
      // Automatically log in the user after successful registration
      login(user, token);
      alert('Registration successful! You are now logged in.');
    } catch (err) {
      const errorMessage = err.response?.data?.errors 
        ? err.response.data.errors.join(', ') 
        : 'Error signing up. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="auth-container" style={{ justifyContent: 'space-around' }}>
      {/* Sign In */}
      <form onSubmit={handleLoginSubmit} className="auth-box">
        <h2 className="auth-title">Sign In</h2>
        <div className="auth-field">
          <label>Email:</label>
          <input
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
          />
        </div>
        <div className="auth-field">
          <label>Password:</label>
          <input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="auth-btn">Log In</button>
      </form>

      {/* Sign Up */}
      <form onSubmit={handleSignupSubmit} className="auth-box">
        <h2 className="auth-title">Sign Up</h2>
        <div className="auth-field">
          <label>Email:</label>
          <input
            type="email"
            value={signupData.email}
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            required
          />
        </div>
        <div className="auth-field">
          <label>Name:</label>
          <input
            type="text"
            value={signupData.name}
            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
            required
          />
        </div>
        <div className="auth-field">
          <label>Password:</label>
          <input
            type="password"
            value={signupData.password}
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            required
          />
        </div>
        <div className="auth-field">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={signupData.password_confirmation}
            onChange={(e) => setSignupData({ ...signupData, password_confirmation: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="auth-btn">Register</button>
      </form>
    </div>
  );
};

export default Login;
