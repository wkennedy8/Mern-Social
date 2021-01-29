import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useHistory } from 'react-router-dom';
import styles from './menuCard.module.css';

const MenuCard = () => {
  const history = useHistory();
  const { currentUser } = useContext(AppContext);
  return (
    <div className={styles.menuCard}>
      <div className={styles.userInfo}>
        <div className={styles.userPicture}>
          <img
            src={
              currentUser?.avatar ||
              'https://files.willkennedy.dev/social_media_app/default-image.png'
            }
            alt="user"
          />
        </div>
      </div>
      <h1>{currentUser?.username}</h1>
      <div className={styles.sidenav}>
        <ul>
          <li onClick={() => history.push(`/users/${currentUser?._id}`)}>
            View Profile
          </li>
          <li onClick={() => history.push('/search')}>Follow Others</li>
        </ul>
      </div>
    </div>
  );
};

export default MenuCard;
