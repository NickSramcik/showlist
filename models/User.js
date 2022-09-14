const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Watchlist = require("./Watchlist");

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  firstName: { type: String, unique: false },
  lastName: { type: String, unique: false },
  password: String,
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Create a personal watchlist after creation

UserSchema.post("save", function save(next) {
  const user = this;
  try {
    Watchlist.create({
      name: "My Watchlist",
      ownerID: user._id,
      ownerID: user._id,
      membersID: user._id,
      adminsID: user._id,
    });
    console.log("Watchlist has been added!");
    res.redirect("/watchlists");
  } catch (err) {
    console.log(err);
  }
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
