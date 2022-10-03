const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { 
    type: String,
    lowercase: true,
    match: /.+@.+\..+/,
    unique: true,
    required: true
  },
  name: {
    type: String,
    minlength: [6, '{VALUE} is too short'],
    maxlength: [64, '{VALUE} is too long'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)