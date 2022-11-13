const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//* Esquema
const Schema = mongoose.Schema


const UserSchema = new Schema({

//Name entra como email/username para logear

    name: {type: String, required: true},
    picture: {type: String, required: true, default: 'https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'},
    email: {type: String, required: true},
    password: {type: String, required: true},
    inbox: [{type: Schema.Types.ObjectId, ref: "Mail"}],
    outbox: [{type: Schema.Types.ObjectId, ref: "Mail"}]
},{
    timestamps: true
}
    
);

const User = mongoose.model('User', UserSchema)

module.exports = User