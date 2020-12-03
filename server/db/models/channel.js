const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
      }
    ],
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
