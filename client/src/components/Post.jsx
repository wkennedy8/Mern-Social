import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { AiOutlineLike } from 'react-icons/ai';

const Post = ({ post }) => {
  console.log(post);
  return (
    <div style={{ width: 500 }}>
      <Paper className="mt-4">
        <Typography>{post.body}</Typography>
        {/* <Typography> - {post.owner.username}</Typography> */}
        <AiOutlineLike />
      </Paper>
    </div>
  );
};

export default Post;
