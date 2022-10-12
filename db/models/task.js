const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
    minlength: [1, '{VALUE} is too short'],
    maxlength: [255, '{VALUE} is too long'],
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Task', taskSchema)