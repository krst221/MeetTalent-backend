const Mail = require('../models/mail.model');
const User = require('../models/user.model');

const getMail = async (req, res) => {
    try {
        const MailInfo = await Mail.findById(req.body);
        return res.status(200).json(MailInfo);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const sendMail = async (req, res) => {
    try {
        const { receive, send, title, text } = req.body;
        let userSend = await User.findById(send).populate('inbox').populate('outbox');
        let userReceive = await User.findOne({email: receive}).populate('inbox').populate('outbox');
        const mail = new Mail ({user_send: userSend._id, user_receive: userReceive._id, title: title, text: text});
        const newMail = await mail.save();
        userSend = await User.updateOne({_id: userSend._id}, {$push: {outbox: newMail._id}});
        userReceive = await User.updateOne({_id: userReceive._id}, {$push: {inbox: newMail._id}});
        if (!newMail) {
            return res.status(404).json({"message": "Mail not found"});
        }
            return res.status(200).json(newMail);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteMail = async (req, res) => {
    try {
        const {_id, user_send} = req.body;
        let userSend = await User.findById(user_send);
        userSend = await User.updateOne({_id: userSend._id}, {$pull: {inbox: _id}}, {$pull: {outbox: _id}})
        const mail = await Mail.findByIdAndDelete(_id);
        return res.status(200).json(userSend);
    } catch (error) {
        return res.status(500).json(error)
    }
};

module.exports = { getMail, sendMail, deleteMail }



