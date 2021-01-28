const Post = require('../db/models/post'),
  cloudinary = require('cloudinary').v2;

// ***********************************************//
// Create a post
// ***********************************************//
exports.createPost = async (req, res) => {
  try {
    let image;
    if (req.files) {
      const res = await cloudinary.uploader.upload(
        req.files.image.tempFilePath
      );
      image = res.secure_url;
    }

    const post = await new Post({ ...req.body, image, user: req.user._id });
    await post.save();
    console.log(post);
    req.user.posts.push(post._id);
    await req.user.save();
    res.status(200).json(post);

    // try {
    //   const response = await cloudinary.uploader.upload(
    //     req.files.avatar.tempFilePath
    //   );
    //   req.user.avatar = response.secure_url;
    //   await req.user.save();
    //   res.json(response);
    // } catch (error) {
    //   res.status(400).json({ error: error.message });
    // }
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
