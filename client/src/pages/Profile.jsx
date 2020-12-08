import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Profile = ({ match, history }) => {
  const [user, setUser] = useState(null);
  const { setLoading, currentUser, loading } = useContext(AppContext);
  const { id } = match.params;

  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/users/${id}`, {
        withCredentials: true
      });
      setUser(data);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [id, loading]);

  const handleFollow = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(`/api/users/${id}`, {
        withCredentials: true
      });
      alert(data.message);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const followCheck = () => {
    return user?.followers.some(({ _id }) => _id === currentUser?._id);
  };

  const handleClick = () => {
    history.push(`/chat/${user._id}`);
  };
  return (
    <div>
      <Button variant="" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <h1>{user?.username}'s Profile</h1>
      <Button onClick={handleFollow}>
        {followCheck() ? 'Unfollow' : 'Follow'}
      </Button>
      <Button onClick={handleClick}>Send Message</Button>
    </div>
  );
};

export default Profile;
