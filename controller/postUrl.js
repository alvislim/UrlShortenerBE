const shortid = require("shortid");
const utils = require("../utils");
const Url = require("../models/Url");

module.exports = {
  healthCheck: (req, res) => {
    res.send("hi");
  },
  postUrl: async (req, res) => {
    console.log("HERE", req.body.url);
    const { origUrl } = req.body;
    const base = `http://localhost:3333`;

    const urlId = shortid.generate();
    if (utils.validateUrl(origUrl)) {
      try {
        let url = await Url.findOne({ origUrl });
        if (url) {
          res.json(url);
        } else {
          const shortUrl = `${base}/${urlId}`;

          url = new Url({
            origUrl,
            shortUrl,
            urlId,
            date: new Date(),
          });

          await url.save();
          res.json(url);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
      }
    } else {
      res.status(400).json("Invalid Original Url");
    }
  },
};
