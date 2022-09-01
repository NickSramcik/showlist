const mongoose = require('mongoose')

const ShowSchema = new mongoose.Schema({
  show: {
    type: String,
    required: true,
  },
  watched: {
    type: Boolean,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Show', ShowSchema)
