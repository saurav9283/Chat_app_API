const express = require('express');

const { addMessage, getMessages } = require('../controllers/messagesControler');
const router = express.Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

module.exports = router;