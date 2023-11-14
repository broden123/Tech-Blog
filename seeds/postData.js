const { Post } = require("../models");

const reviewdata = [
  // todo
];

const seedPosts = () => Post.bulkCreate(reviewdata);

module.exports = seedPosts;
