const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//* Esquema
const Schema = mongoose.Schema


const MailSchema = new Schema({

//Name entra como email/username para logear

    user_send: {type: Schema.Types.ObjectId, ref: "User"},
    user_receive: {type: Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true},
    text: {type: String, required: true},
},{
    timestamps: true
}
    
);

const Mail = mongoose.model('Mail', MailSchema)

module.exports = Mail