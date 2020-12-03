const router = require('express').Router();
const {
  getCurrentUser,
  getAllUsers,
  followUser,
  logoutUser,
  getFeed,
  getSpecificUser
} = require('../../controllers/users');

router.get('/me', getCurrentUser);
router.get('/:id', getSpecificUser);
router.get('/', getAllUsers);
router.get('/feed/:id', getFeed);
router.put('/:id', followUser);
router.post('/logout/:id', logoutUser);

module.exports = router;
