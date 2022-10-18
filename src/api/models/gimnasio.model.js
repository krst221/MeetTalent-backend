const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { validationPassword, validationEmail } = require('../../validators/validation');
//* Esquema
const Schema = mongoose.Schema


const gymSchema = new Schema({

//Name entra como email/username para logear

    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    region: {type: String, required: true},
    type: {type: String, required: true},
    pokemons: [{type: Schema.Types.ObjectId, ref: "pokemon"}]
    
},{
    timestamps: true
}
    
);

const Gym = mongoose.model('Gym', gymSchema)

module.exports = Gym