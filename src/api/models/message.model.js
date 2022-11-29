const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//* Esquema
const Schema = mongoose.Schema


const MessageSchema = new Schema({
    
    user_send: {type: Schema.Types.ObjectId, ref: "User"},
    user_receive: {type: Schema.Types.ObjectId, ref: "User"},
    text: {type: String, required: true},
},{
    timestamps: true
}
    
);

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message