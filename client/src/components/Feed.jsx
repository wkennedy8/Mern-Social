import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import FeedHeader from './FeedHeader';
import Post from './Post';
import axios from 'axios';

const Feed = () => {
  const { loading } = useContext(AppContext);
  const [feed, setFeed] = useState([]);

  const getFeed = async () => {
    try {
      const { data } = await axios.get('/api/users/feed', {
        withCredentials: true
      });
      setFeed(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, [loading]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <FeedHeader />
      {feed.map((post) => {
        return (
          <div key={post._id}>
            <Post post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
