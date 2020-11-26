import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Paper, Avatar } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const FeedHeader = () => {
  const { currentUser, setLoading } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    try {
      await axios.post(
        '/api/posts',
        { body: e.target.elements.post.value },
        { withCredentials: true }
      );
      form.reset();
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="mt-4 " style={{ width: 500 }}>
      <Paper className="d-flex align-items-center pl-4" style={{ height: 100 }}>
        <Avatar
          alt="profilePic"
          src={currentUser?.user?.avatar}
          className="mr-2"
        />
        <Form
          onSubmit={handleSubmit}
          style={{ width: '100%' }}
          className="mr-4"
        >
          <Form.Control type="text" placeholder="Make a post..." id="post" />
        </Form>
      </Paper>
    </div>
  );
};

export default FeedHeader;
