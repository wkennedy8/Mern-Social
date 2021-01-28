import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

const Logout = () => {
  const { currentUser } = useContext(AppContext);
  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`/api/users/logout/${currentUser._id}`);
      sessionStorage.removeItem('user');
      alert(data.message);
      // window.location is needed to remove user from nav
      window.location = '/login';
    } catch (error) {
      alert(error.message);
    }
  };

  return <li onClick={handleLogout}>Logout</li>;
};

export default Logout;
