const Url = require("../models/Url");

module.exports = {
  redirection: async (req, res) => {
    try {
      const url = await Url.findOne({ urlId: req.params.urlId });
      if (url) {
        console.log(url);

        url.save();
        return res.redirect(url.origUrl);
      } else {
        res.status(404).json("Not found");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("server error");
    }
  },
};
