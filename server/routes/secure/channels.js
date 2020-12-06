const router = require('express').Router(),
  { createChannel, getChannels } = require('../../controllers/channels');

router.post('/', createChannel);
router.get('/', getChannels);

module.exports = router;
