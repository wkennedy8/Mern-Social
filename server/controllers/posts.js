const Post = require('../db/models/post');

// ***********************************************//
// Create a post
// ***********************************************//
exports.createPost = async (req, res) => {
  try {
    const post = await new Post({ ...req.body, user: req.user.username });
    await post.save();
    req.user.posts.push(post._id);
    await req.user.save();
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// ***********************************************//
// Get all posts
// ***********************************************//
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// ***********************************************//
// like a posts
// ***********************************************//
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter((like) => {
        return like.toString() !== req.user._id.toString();
      });
      await post.save();
      return res.status(200).json({ message: 'You have unliked the post' });
    }
    post.likes.push(req.user._id);
    await post.save();
    await post.populate({ path: 'likes ', select: 'username' }).execPopulate();
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
