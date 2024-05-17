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
    const base = process.env.DOMAIN_URL;

    const urlId = shortid.generate();
    if (utils.validateUrl(origUrl)) {
      try {
        let url = await Url.findOne({ origUrl });
        if (url) {
          httpResponse.httpResponse(res, 200, true, "Url has been shortened", {
            short: url.shortUrl,
            long: origUrl,
          });
        } else {
          const shortUrl = `${base}/${urlId}`;
          url = new Url({
            origUrl,
            shortUrl,
            urlId,
            date: new Date(),
          });

          await url.save();
          httpResponse.httpResponse(res, 200, true, "Url has been shortened", {
            short: url.shortUrl,
            long: origUrl,
          });
        }
      } catch (err) {
        httpResponse.httpResponse(res, 500, false, "Server Error", origUrl);
      }
    } else {
      httpResponse.httpResponse(
        res,
        400,
        false,
        "An error occurred creating the short URL; please check input",
        origUrl
      );
    }
  },
};
