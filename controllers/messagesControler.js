const MessageModel = require("../model/MessageModel");


module.exports.addMessage = async (req, res, next) => {
  try {
      const { from, to, message } = req.body;
      const data = await MessageModel.create({
          message: { text: message },
          users: [from, to],
          sender: from,
      });
      
      if (data) {
          return res.json(data);
      } else {
          return res.json({ msg: "Failed to add message to the database" });
      }
  } catch (error) {
      next(error);
  }
};


module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await MessageModel.find({
      users: {
        $all: [from, to],
      },
      
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};