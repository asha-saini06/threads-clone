import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

async function sendMessage(req, res) {
    try {
        const { recipientId, message } = req.body; // recipientId is the id of the user who will receive the message
        const senderId = req.user._id; // get the id of the user who sent the message

        let conversation = await Conversation.findOne({ // check if there is a conversation between the two users
            participants: { $all: [senderId, recipientId] },
        });

        // if there is no conversation, create a new one
        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, recipientId],
                lastMessage: {
                    text: message,
                    sender: senderId,
                },
            });
            await conversation.save();
        }

        // if there is a conversation, send the message
        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message,
        });

        // update the conversation with the new message
        await Promise.all([
            newMessage.save(), // save the new message to the database
            conversation.updateOne({  // update the conversation with the new message and the last message
                lastMessage: {
                    text: message,
                    sender: senderId,
                },
            }),
        ]);

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMessages(req, res) {
    const { otherUserId } = req.params; // otherUserId is the id of the user who will receive the message 
    const userId = req.user._id;    // get the id of the user who sent the message

    try {
        // find the conversation between the two users
        const conversation = await Conversation.findOne({
            participants: { $all: [userId, otherUserId] }, // check if the conversation exists
        })

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        const messages = await Message.find({
            conversationId: conversation._id, // find the messages in the conversation
        }).sort({ createdAt: 1 }) // sort the messages 
        res.status(200).json(messages); // return the messages to the frontend

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}

async function getConversations(req, res) {
    const userId = req.user._id; // get the id of the user who sent the message

    try {
        const conversations = await Conversation.find({ participants: userId }).populate({
            path: "participants", // populate the participants field in the conversation model
            select: "username profilePic" // select only the username and profilePic fields
        }); // find the conversations where the user is a participant

        // remove the current user from the participants array
        conversations.forEach((conversation) => {
            conversation.participants = conversation.participants.filter(
                (participant) => participant._id.toString() !== userId.toString()
            );
        });

        res.status(200).json(conversations); // return the conversations to the frontend
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export { sendMessage, getMessages, getConversations };