const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//* Esquema
const Schema = mongoose.Schema


const UserSchema = new Schema({

//Name entra como email/username para logear

    name: {type: String, required: true},
    job: {type: String, required: true},
    picture: {type: String, required: true, default: 'https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'},
    email: {type: String, required: true},
    location: {city: {type: String, required: true}, zip: {type: Number}, detail: {type: String}},
    age: {type: Number},
    phone: {type: String},
    password: {type: String, required: true},
    studies: [{degree: {type: String}, location: {type: String}, type: {type: String}}],
    tags: [{type: String}],
    inbox: [{type: Schema.Types.ObjectId, ref: "Message"}],
    outbox: [{type: Schema.Types.ObjectId, ref: "Message"}],
    offers: [{type: Schema.Types.ObjectId, ref: "Offer"}],
},{
    timestamps: true
}
    
);

const User = mongoose.model('User', UserSchema)

module.exports = User