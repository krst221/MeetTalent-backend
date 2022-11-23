const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//* Esquema
const Schema = mongoose.Schema


const CompanySchema = new Schema({

    name: {type: String, required: true},
    ID: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    offers: [{type: Schema.Types.ObjectId, ref: "Offer"}],
},{
    timestamps: true
}
    
);

const Company = mongoose.model('Company', CompanySchema)

module.exports = Company