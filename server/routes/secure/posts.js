const router = require('express').Router();
const {
  createPost,
  getAllPosts,
  likePost
} = require('../../controllers/posts');

router.post('/', createPost);
router.get('/', getAllPosts);
router.put('/:id', likePost);

module.exports = router;
