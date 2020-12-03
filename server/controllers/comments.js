const Comment = require('../db/models/comment');
const Post = require('../db/models/post');
// ***********************************************//
// Create a post
// ***********************************************//
exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({ user: req.user._id, ...req.body });
    await comment.save();
    const post = await Post.findById(req.params.postId);
    post.comments.push(comment._id);
    await post.save();
    await post
      .populate({ path: 'comments likes', select: 'body username' })
      .execPopulate();
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// ***********************************************//
// Get all comments for a post
// ***********************************************//
exports.getAllComments = async (req, res) => {
  try {
    const comments = Comment.find();
    res.status(200).json(comments);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
