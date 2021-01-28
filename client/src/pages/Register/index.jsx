import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import styles from './register.module.css';

const SignUp = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post('/api/auth/register', formData);
      setCurrentUser(data);
      sessionStorage.setItem('user', data);
      history.push('/');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Welcome</h2>
        <div className={styles.username}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            onChange={handleChange}
            name="username"
            id="username"
            autoComplete="off"
          />
        </div>
        <div className={styles.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            id="email"
            autoComplete="off"
          />
        </div>
        <div className={styles.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            id="password"
            autoComplete="off"
          />
        </div>
        <div>
          <button type="submit">Create Account</button>
        </div>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
