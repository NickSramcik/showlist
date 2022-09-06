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
  deleted: {
    type: Boolean,
    required: true,
  },
  // recommend: {
  //   type: Number, default: 0,
  //   required: true,
  // },
  title: {
    type: String,
    require:false
  },
  image: {
    type: String, 
    required:false
  },
  userId: {
    type: String,
    required: true
  },
  movieInfo: {
    type:String, 
    require: false
  }
})

module.exports = mongoose.model('Movie', MovieSchema)
