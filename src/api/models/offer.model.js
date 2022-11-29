const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//* Esquema
const Schema = mongoose.Schema


const OfferSchema = new Schema({

    title: {type: String, required: true},
    vacancies: {type: Number, required: true},
    language: {type: String, required: true},
    location: {city: {type: String, required: true}, country: {type: String, required: true}},
    conditions: {requisites: {type: String, required: true}, salary: {type: String, required: true}, shift: {type: String, required: true}, contract: {type: String, required: true}, availability: {type: String, required: true}},
    startdate: {type: Date, default: new Date()},
    processnum: {type: Number, default: 0},
    inscribed: {type: Number, default: 0},
    processing: {type: Number, default: 0},
    finalists: {type: Number, default: 0},
    sector: {type: String, required: true},
    description: {type: String, required: true},
    company: {type: Schema.Types.ObjectId, ref: "Company", required: true},
    users: [{type: Schema.Types.ObjectId, ref: "User"}],
},{
    timestamps: true
}
    
);

const Offer = mongoose.model('Offer', OfferSchema)

module.exports = Offer