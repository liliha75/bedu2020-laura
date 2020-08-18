const mongoose = require('mongoose')
mongoose.connect(
    process.env.DATABASE_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  

const PetSchema = new mongoose.Schema({
    name: { 
      type: String,
      required: true
    },
    age: Number,
    vaccines: {
      type: [
        { appliedAt: Date, name: String },
      ],
      validate: [
        {
          // Here we use normal `function` definition instead of `=>` because of the use of `this`
          validator: function (value) {
            if (value.length > 0 && (this.type != 'cat' && this.type != 'dog')) {
              return false
            }
            return true
          },
          message: 'Vaccine can only be on dogs and cats'
        }
      ]
    },
    type: {
      type: String,
      required: true,
      enum: ['cat', 'dog', 'fish', 'tiger', 'turtle'] // All types that are supported
    },
    tank: Object
  })
  const Pet = mongoose.model('Pet', PetSchema)
  module.exports = Pet

