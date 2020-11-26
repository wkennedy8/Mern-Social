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
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

channelSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'sender'
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
