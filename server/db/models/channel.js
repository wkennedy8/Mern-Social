const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Direct Message'
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
