import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import FeedCard from '../FeedCard';
import axios from 'axios';
import styles from './feed.module.css';
const Feed = () => {
  const { currentUser, loading } = useContext(AppContext);
  const [feed, setFeed] = useState([]);
  const getFeed = async () => {
    const { data } = await axios.get(`/api/users/feed/${currentUser?._id}`);
    setFeed(data);
  };
  useEffect(() => {
    getFeed();
  }, [loading]);
  return (
    <div className={styles.postContainer}>
      {feed.map((post) => (
        <FeedCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
