const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//* Esquema
const Schema = mongoose.Schema


const OfferSchema = new Schema({

    title: {type: String, required: true},
    vacancies: {type: Number, required: true},
    language: {type: String, required: true},
    location: {type: String, required: true},
    startdate: {type: Date},
    processnum: {type: Number},
    inscribed: {type: Number},
    processing: {type: Number},
    finalists: {type: Number},
    sector: {type: String, required: true},
    description: {type: String, required: true},
    hackathon: {type: Schema.Types.ObjectId, ref: "Hackathon"},
    userList: [{type: Schema.Types.ObjectId, ref: "User"}],
},{
    timestamps: true
}
    
);

const Offer = mongoose.model('Offer', OfferSchema)

module.exports = Offer