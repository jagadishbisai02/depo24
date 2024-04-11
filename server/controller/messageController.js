const Messages = require("../models/messagemodel");
const Conversation = require('../models/conversation')

module.exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants:{
        $all: [senderId, recieverId]
      }
    })

    if (!conversation){
      conversation = await Conversation.create({
        participants:[senderId, recieverId]
      })
    }else{
      const newMessage = new Messages({
        senderId,
        recieverId,
        message
      })
      if(newMessage){
        conversation.messages.push(newMessage._id)
      }else{
        res.status(201).json(newMessage)
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addMessage = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
