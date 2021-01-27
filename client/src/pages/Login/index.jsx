import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

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
    <div>
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" onChange={handleChange} name="username" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" onChange={handleChange} name="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <Link to="/signup">Need an Account? Sign Up</Link>
    </div>
  );
};

export default Login;
