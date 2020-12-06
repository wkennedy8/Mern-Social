const Channel = require('../db/models/channel'),
  Message = require('../db/models/message');

exports.createMessage = async (req, res) => {
  try {
    const message = new Message({ sender: req.user._id, ...req.body });
    await message.save();
    const conversation = await Channel.findById(req.params.id);
    conversation.messages.push(message._id);
    await conversation.save();
    res.status(200).json(message);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
