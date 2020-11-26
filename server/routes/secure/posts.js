const router = require('express').Router();
const { createPost, getAllPosts } = require('../../controllers/posts');

router.post('/', createPost);
router.get('/', getAllPosts);

module.exports = router;
