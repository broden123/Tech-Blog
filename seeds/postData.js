const { Post } = require("../models");

const postdata = [
  {
    title: "Shrek 2",
    post_body: "I like it",
    user_id: 1,
  },
  {
    title: "New Site",
    post_body: "Please Join",
    user_id: 1,
  },
  {
    title: "It's late",
    post_body: "My log in isnt working",
    user_id: 1,
  },
  {
    title: "Hello",
    post_body: "World",
    user_id: 1,
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
