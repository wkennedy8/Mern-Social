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
