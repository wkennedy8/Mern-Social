const User = require('../db/models/user');
// ***********************************************//
// Create a user
// ***********************************************//
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({
      username,
      email,
      password
    });

    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// ***********************************************//
// Login a user
// ***********************************************//
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// ***********************************************//
// Logout a user
// ***********************************************//
exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(({ token }) => {
      return token !== req.cookies.jwt;
    });
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'Logged out' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ***********************************************//
// Get current user details
// ***********************************************//
exports.getCurrentUser = async (req, res) => {
  await req.user.populate('following', 'username').execPopulate();
  await req.user.populate('followers', 'username').execPopulate();
  await req.user.populate('posts').execPopulate();
  res.json(req.user);
};

// ***********************************************//
// Get all users
// ***********************************************//
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('posts');
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
// ***********************************************//
// Get specific user
// ***********************************************//
exports.getSpecificUser = async (req, res) => {
  try {
    const user = await (
      await User.findById(req.params.id).populate({
        path: 'followers following',
        select: 'username'
      })
    ).execPopulate();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// ***********************************************//
// Follow a user
// ***********************************************//
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findOne({ _id: req.params.id });
    //If my id is already included in the followers array, remove it by filter (thus unfollowing)
    if (userToFollow.followers.includes(req.user._id)) {
      userToFollow.followers = userToFollow.followers.filter((id) => {
        return id.toString() !== req.user._id.toString();
      });

      await userToFollow.save();
      // Filter OUT the userToFollow's id from the people i am "following"
      req.user.following = req.user.following.filter((id) => {
        return id.toString() !== userToFollow._id.toString();
      });
      await req.user.save();
      return res.status(200).json({
        message: `You have unfollowed ${userToFollow.username}`
      });
    }

    userToFollow.followers.push(req.user._id);
    await userToFollow.save();
    req.user.following.push(userToFollow._id);
    await req.user.save();
    res
      .status(200)
      .json({ message: `You are now following ${userToFollow.username}` });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// ***********************************************//
// Get Feed
// ***********************************************//
exports.getFeed = async (req, res) => {
  //Populate users "following".
  //And then from the "following" populate the username and posts
  //And then from the "posts", populate those posts
  //And then from the "posts", populate the comments
  try {
    let array = [];
    const feed = await req.user
      //This populates my OWN posts with only the "body", "title", "createdAt" fields
      .populate({
        path: 'posts',
        populate: {
          path: 'comments likes user',
          select: 'username body createdAt user',
          populate: { path: 'user', select: 'username' }
        }
        // populate: { path: 'user', select: 'username' }
      })
      // This populates the posts of the people I am following
      .populate({
        path: 'following',
        select: 'username posts',
        populate: {
          path: 'posts',
          populate: {
            path: 'comments likes',
            select: 'username body createdAt user',
            populate: { path: 'user', select: 'username' }
          }
        }
      })
      .execPopulate();
    feed.following.forEach((doc) =>
      doc.posts.forEach((post) => {
        array.push(post);
      })
    );
    let feedArray = [...feed.posts, ...array];
    feedArray.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(feedArray);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
