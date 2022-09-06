const passport = require("passport");
const validator = require("validator");
const Movie = require("../models/Movie");

module.exports = {
  getStats: async (req, res) => {
    try {
      const uniqueItems = await Movie.countDocuments({
        deleted: false,
      });
      res.render("stats.ejs", {
        countUnique: uniqueItems,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
