import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await conversationModel.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]); // to save parallely

    res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    console.log("IDS=",senderId,receiverId);
    const conversation = await conversationModel.findOne({
        participants: {
          $all: [senderId, receiverId]
        },
      }).populate("messages");
  console.log("CONVR",conversation);
    if(!conversation)
    {
        res.status(201).json([]);
    }
    res.status(200).json(conversation.messages);
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
