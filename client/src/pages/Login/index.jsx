import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import styles from './login.module.css';

const Login = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post('/api/auth/login', formData);
      setCurrentUser(data);
      sessionStorage.setItem('user', data);
      history.push('/');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Welcome Back</h2>
        <div className={styles.username}>
          <label>Username</label>
          <input
            type="text"
            onChange={handleChange}
            name="username"
            autoComplete="off"
          />
        </div>
        <div className={styles.password}>
          <label>Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            autoComplete="off"
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <p>
          Don't have an account? <Link to="/signup">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
