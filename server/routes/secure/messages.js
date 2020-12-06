const router = require('express').Router({ mergeParams: true }),
  { createMessage } = require('../../controllers/messages');

router.post('/', createMessage);

module.exports = router;
