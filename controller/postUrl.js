const shortid = require("shortid");
const utils = require("../utils");
const Url = require("../models/Url");
const httpResponse = require("../utils");
module.exports = {
  healthCheck: (req, res) => {
    res.send("hi");
  },
  postUrl: async (req, res) => {
    const { origUrl } = req.body;
    const base = `shortUrl`;

    const urlId = shortid.generate();
    if (utils.validateUrl(origUrl)) {
      try {
        let url = await Url.findOne({ origUrl });
        if (url) {
          console.log("here1?");
          httpResponse.httpResponse(
            res,
            200,
            true,
            "Url has been shortened",
            url.shortUrl
          );
        } else {
          const shortUrl = `${base}/${urlId}`;
          url = new Url({
            origUrl,
            shortUrl,
            urlId,
            date: new Date(),
          });

          await url.save();
          httpResponse.httpResponse(
            res,
            200,
            true,
            "Url has been shortened",
            url.shortUrl
          );
        }
      } catch (err) {
        httpResponse.httpResponse(res, 500, false, "Server error", origUrl);
      }
    } else {
      httpResponse.httpResponse(
        res,
        400,
        false,
        "Invalid Original Url",
        origUrl
      );
    }
  },
};
