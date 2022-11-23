const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//* Esquema
const Schema = mongoose.Schema


const HackathonSchema = new Schema({

    title: {type: String, required: true},
    startdate: {type: Date},
    enddate: {type: Date},
    description: {type: String, required: true},
    offer: {type: Schema.Types.ObjectId, ref: "Offer"},
},{
    timestamps: true
}
    
);

const Hackathon = mongoose.model('Hackathon', HackathonSchema)

module.exports = Hackathon