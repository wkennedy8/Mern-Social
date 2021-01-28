import React from 'react';
import { useHistory } from 'react-router-dom';
import Logout from '../Logout';
const Dropdown = () => {
  const history = useHistory();
  return (
    <ul>
      <li onClick={() => history.push('/profile')}>Profile</li>
      <li onClick={() => history.push('/search')}>Search</li>
      <Logout />
    </ul>
  );
};

export default Dropdown;
