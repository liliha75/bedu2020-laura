const mongoose = require('mongoose')

{ useNewUrlParser: true, useUnifiedTopology:true}

)


const PetSchema = new mongoose.Schema(
    {
        name:String,
        age:Number,
        vaccines:Array,
        tank:Object
    }
)

const Pet = mongoose.model('Pet', PetSchema)

module.exports = Pet