import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { RiArrowDownSFill } from 'react-icons/ri';
import Dropdown from '../Dropdown';
import styles from './navigation.module.css';

const Navigation = () => {
  const { currentUser } = useContext(AppContext);
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <h1 className={styles.heading}>Fakebook</h1>
        {currentUser && (
          <div className={styles.user} onClick={() => setDropdown(!dropdown)}>
            <img
              className={styles.profileImage}
              src="https://files.willkennedy.dev/social_media_app/default-image.png"
              alt={`${currentUser.username} profilePic`}
            />
            <p>{currentUser.username}</p>
            <RiArrowDownSFill className={styles.dropdownArrow} />
            {dropdown && <Dropdown />}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
