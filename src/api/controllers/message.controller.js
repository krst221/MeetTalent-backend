const Message = require('../models/message.model');
const User = require('../models/user.model');

const getMessage = async (req, res) => {
    try {
        const MessageInfo = await Message.findById(req.body.id);
        return res.status(200).json(MessageInfo);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const sendMessage = async (req, res) => {
    try {
        const { receive, send, title, text } = req.body;
        let userSend = await User.findById(send).populate('inbox').populate('outbox');
        let userReceive = await User.findOne({eMessage: receive}).populate('inbox').populate('outbox');
        const Message = new Message ({user_send: userSend._id, user_receive: userReceive._id, title: title, text: text});
        const newMessage = await Message.save();
        userSend = await User.updateOne({_id: userSend._id}, {$push: {outbox: newMessage._id}});
        userReceive = await User.updateOne({_id: userReceive._id}, {$push: {inbox: newMessage._id}});
        if (!newMessage) {
            return res.status(404).json({"message": "Message not found"});
        }
            return res.status(200).json(newMessage);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteMessage = async (req, res) => {
    try {
        const {_id, user_send} = req.body;
        let userSend = await User.findById(user_send);
        userSend = await User.updateOne({_id: userSend._id}, {$pull: {inbox: _id}}, {$pull: {outbox: _id}})
        const Message = await Message.findByIdAndDelete(_id);
        return res.status(200).json(userSend);
    } catch (error) {
        return res.status(500).json(error)
    }
};

module.exports = { getMessage, sendMessage, deleteMessage }



