const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  movie: {
    type: String,
    required: true,
  },
  watched: {
    type: Boolean,
    required: true,
  },
  recommend: {
    type: Boolean,
    required: true,
  },
  // recommend: {
  //   type: Number, default: 0,
  //   required: true,
  // },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Movie', MovieSchema)
