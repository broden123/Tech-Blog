const { Post } = require("../models");

const postdata = [
  // todo
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
