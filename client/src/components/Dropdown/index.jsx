import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useHistory } from 'react-router-dom';
import Logout from '../Logout';
const Dropdown = () => {
  const { currentUser } = useContext(AppContext);
  const history = useHistory();
  return (
    <ul>
      <li onClick={() => history.push(`/users/${currentUser?._id}`)}>
        Profile
      </li>
      <li onClick={() => history.push('/search')}>Search</li>
      <Logout />
    </ul>
  );
};

export default Dropdown;
