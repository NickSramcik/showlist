const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Movie = require("./Movie");
const User = require("./User");

const WatchlistSchema = new mongoose.Schema({
  name: { type: String },
  ownerID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  creatorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //Mongoose Multiple Foreign Key
  //https://mongoosejs.com/docs/populate.html
  //https://mongoosejs.com/docs/documents.html
  membersID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  adminsID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  moviesID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);
