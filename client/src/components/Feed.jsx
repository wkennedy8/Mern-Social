import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import FeedHeader from './FeedHeader';
import Post from './Post';
import axios from 'axios';

const Feed = () => {
  const { loading, currentUser } = useContext(AppContext);
  const [feed, setFeed] = useState([]);

  const getFeed = async () => {
    try {
      const { data } = await axios.get(`/api/users/feed/${currentUser?._id}`, {
        withCredentials: true
      });
      setFeed(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    // console.log('hit');
    getFeed();
    // eslint-disable-next-line
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
