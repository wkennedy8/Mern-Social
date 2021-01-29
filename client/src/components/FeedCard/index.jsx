import React from 'react';
import { Link } from 'react-router-dom';
import styles from './feedCard.module.css';

const FeedCard = ({ post }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.postHeader}>
        <div className={styles.profilePicture}>
          <img
            src={
              post.user.avatar ||
              'https://files.willkennedy.dev/social_media_app/default-image.png'
            }
            alt="user"
          />
        </div>
        <div className={styles.userDetails}>
          <Link to={`/users/${post.user._id}`}>{post.user.username}</Link>
          <p>{post.createdAt}</p>
        </div>
      </div>
      <p className={styles.caption}>{post.caption}</p>
      <div className={styles.imageContainer}>
        <img src={post.image} alt={post.caption} />
      </div>
      <div className={styles.postActions}>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default FeedCard;
