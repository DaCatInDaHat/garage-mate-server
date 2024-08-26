const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)