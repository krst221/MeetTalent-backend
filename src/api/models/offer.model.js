const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//* Esquema
const Schema = mongoose.Schema


const OfferSchema = new Schema({

    title: {type: String, required: true},
    vacancies: {type: Number, required: true},
    language: {type: String, required: true},
    location: {city: {type: String, required: true}, country: {type: String, required: true}},
    conditions: {salary: {type: Number, required: true}, shift: {type: String, required: true}, contract: {type: String, required: true}},
    startdate: {type: Date},
    processnum: {type: Number, default: 0},
    inscribed: {type: Number, default: 0},
    processing: {type: Number, default: 0},
    finalists: {type: Number, default: 0},
    sector: {type: String, required: true},
    description: {type: String, required: true},
    company: {type: Schema.Types.ObjectId, ref: "Company", required: true},
    hackathon: {type: Schema.Types.ObjectId, ref: "Hackathon"},
    users: [{type: Schema.Types.ObjectId, ref: "User"}],
},{
    timestamps: true
}
    
);

const Offer = mongoose.model('Offer', OfferSchema)

module.exports = Offer