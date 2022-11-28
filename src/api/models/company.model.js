const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//* Esquema
const Schema = mongoose.Schema


const CompanySchema = new Schema({

    name: {type: String, required: true},
    ID: {type: String, required: true},
    location: {city: {type: String, required: true}, zip: {type: Number}, detail: {type: String}},
    isCompany: {type: Boolean, required: true, default: true},
    picture: {type: String, required: true, default: 'https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'},
    email: {type: String, required: true},
    password: {type: String, required: true},
    offers: [{type: Schema.Types.ObjectId, ref: "Offer"}],
},{
    timestamps: true
}
    
);

const Company = mongoose.model('Company', CompanySchema)

module.exports = Company