import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { TiDeleteOutline } from 'react-icons/ti';
import { AppContext } from '../../context/AppContext';
import styles from './createPost.module.css';

const CreatePost = () => {
  const { loading, setLoading } = useContext(AppContext);
  const fileInput = useRef();
  const [formData, setFormData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFiles = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };

  const handleImage = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePictureRemoval = () => {
    setPreviewImage(null);
    setFormData({ ...formData, image: null });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      setLoading(true);
      const post = new FormData();
      post.append('image', formData.image);
      post.set('caption', formData.caption);
      await axios.post('/api/posts', post);
      form.reset();
      setPreviewImage(false);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.createPostContainer}>
      <header>
        <h1 className={styles.heading}>Create Post</h1>
      </header>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="file"
            ref={fileInput}
            accept="image/jpg, image/jpeg"
            multiple
            style={{ display: 'none' }}
            onChange={handleImage}
          />
          <textarea
            className={styles.textBox}
            type="text"
            name="caption"
            placeholder="Write something here..."
            onChange={handleChange}
          />
          {loading && <p>Uploading...</p>}
          {previewImage && (
            <div className={styles.previewImageContainer}>
              <img
                src={previewImage}
                alt="userSelection"
                className={styles.previewImage}
              />
              <TiDeleteOutline onClick={handlePictureRemoval} />
            </div>
          )}
          <div className={styles.buttonGroup}>
            <button className={styles.addPhotos} onClick={handleFiles}>
              Add Photos
            </button>
            <button
              className={
                formData?.caption || formData?.image
                  ? styles.postButtonSubmit
                  : styles.postButton
              }
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
