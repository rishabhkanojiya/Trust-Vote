const express = require("express");
const asyncHandler = require("express-async-handler");
const TweetHandler = require("../handler/tweet.handler");
const { getOrUpdateCache } = require("../utils/cache.utils");
const { validate } = require("../utils/route.utils");
const { query } = require("express-validator");

const router = new express.Router();

router.get(
  "/tweets",
  query("hashtag")
    .exists()
    .withMessage("Hashtag can't be Undefined")
    .isString()
    .withMessage("Hashtag field value should be a string"),
  validate,
  asyncHandler(getOrUpdateCache(TweetHandler.getAllTweets))
);

router.get(
  "/analyze-tweets",
  query("hashtag")
    .exists()
    .withMessage("Hashtag can't be Undefined")
    .isString()
    .withMessage("Hashtag field value should be a string"),
  validate,
  asyncHandler(getOrUpdateCache(TweetHandler.analyzeAllTweets))
);

module.exports = router;
