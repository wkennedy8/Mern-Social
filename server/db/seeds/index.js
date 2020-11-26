if (process.env.NODE_ENV !== 'production') require('dotenv').config();
require('../config');
const mongoose = require('mongoose');

const User = require('../models/user'),
  Post = require('../models/post'),
  Channel = require('../models/channel'),
  Message = require('../models/message'),
  Comment = require('../models/comment');

const dbReset = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
  await User.countDocuments({}, function (err, count) {
    console.log('Number of users:', count);
  });
  await Post.countDocuments({}, function (err, count) {
    console.log('Number of posts:', count);
  });
  await Channel.countDocuments({}, function (err, count) {
    console.log('Number of channels:', count);
  });
  await Message.countDocuments({}, function (err, count) {
    console.log('Number of messages:', count);
  });
  await Comment.countDocuments({}, function (err, count) {
    console.log('Number of comments:', count);
  });
};

dbReset();
