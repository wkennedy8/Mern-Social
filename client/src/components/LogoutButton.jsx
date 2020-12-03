import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const LogoutButton = () => {
  const { currentUser } = useContext(AppContext);
  const history = useHistory();
  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`/api/users/logout/${currentUser._id}`);
      sessionStorage.removeItem('user');
      alert(data.message);
      history.push('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
