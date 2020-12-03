import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Paper, Typography } from '@material-ui/core';
import { AiOutlineLike } from 'react-icons/ai';
import { Accordion, Button } from 'react-bootstrap';
import axios from 'axios';

const Post = ({ post }) => {
  const { setLoading, currentUser } = useContext(AppContext);

  const handleLike = async (id) => {
    setLoading(true);
    try {
      await axios.put(`/api/posts/${id}`);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const checkIfLiked = () => {
    return post.likes.some(({ _id }) => _id === currentUser?._id);
  };
  console.log(post);
  return (
    <div style={{ width: 500 }}>
      <Paper className="mt-4">
        <Typography>{post.body}</Typography>
        <Typography>
          {' '}
          - <Link to={`/users/${post.user._id}`}>{post.user.username}</Link>
        </Typography>
        <Accordion>
          <Typography>
            {post.likes.length}
            <AiOutlineLike
              onClick={() => handleLike(post._id)}
              className={checkIfLiked() ? 'green' : ''}
            />
          </Typography>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Comments
          </Accordion.Toggle>
          {post.comments.map((comment, i) => {
            return (
              <Accordion.Collapse eventKey="0" key={i}>
                <Typography>
                  {comment.body} -{' '}
                  <Link to={`/users/${comment?.user?._id}`}>
                    {comment?.user?.username}
                  </Link>
                </Typography>
              </Accordion.Collapse>
            );
          })}
        </Accordion>
      </Paper>
    </div>
  );
};

export default Post;
