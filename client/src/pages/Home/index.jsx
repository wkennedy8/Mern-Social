import React from 'react';
import CreatePost from '../../components/CreatePost';
import MenuCard from '../../components/MenuCard';
import styles from './home.module.css';
import Feed from '../../components/Feed';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.container}>
        <CreatePost className={styles.mainContents} />
        <Feed />
      </div>
      <MenuCard className={styles.sidebarProfile} />
    </div>
  );
};

export default Home;
