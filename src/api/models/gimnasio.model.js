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
//*Validación

gymSchema.pre("save", function(req, res, next){
    if(!validationEmail(this.email)){
       console.log({code: 403, message: "Invalid email"})
       return next();
    }
   if(!validationPassword(this.password)){
        console.log({code: 403, message: "Invalid password"})
        return next();
   }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
}) 





const Gym = mongoose.model('gym',gymSchema)

module.exports = Gym