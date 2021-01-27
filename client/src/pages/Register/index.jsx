import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

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
    <div>
      <h2 className="mb-4">Welcome</h2>
      <form style={{ width: 300 }} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            onChange={handleChange}
            name="username"
            id="username"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" onChange={handleChange} name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            id="password"
          />
        </div>
        <div>
          <button type="submit">Create Account</button>
        </div>
      </form>
      <Link className="mt-4" to="/login">
        Already have an account? Login
      </Link>
    </div>
  );
};

export default SignUp;
