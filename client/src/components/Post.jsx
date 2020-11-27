import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { AiOutlineLike } from 'react-icons/ai';

const Post = ({ post }) => {
  return (
    <div style={{ width: 500 }}>
      <Paper className="mt-4">
        <Typography>{post.body}</Typography>
        <Typography> - {post.user}</Typography>
        <AiOutlineLike />
      </Paper>
    </div>
  );
};

export default Post;
