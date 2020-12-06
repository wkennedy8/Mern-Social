const Channel = require('../db/models/channel');

exports.createChannel = async (req, res) => {
  try {
    const { user } = req.body;
    const channel = new Channel({
      members: [user, req.user._id]
    });
    await channel.save();
    await channel
      .populate({ path: 'members', select: 'username' })
      .execPopulate();
    res.status(200).json(channel);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getChannels = async (req, res) => {
  try {
    const channels = await Channel.find()
      .where('members')
      .in(req.user._id)
      .populate({ path: 'members', select: 'username' })
      .exec();
    res.status(200).json(channels);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
