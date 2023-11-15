const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const getAuth = require("../utils/auth");

// get all posts
router.get("/", async (req, res) => {
  try {
    const PostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["comment_body"],
        },
      ],
    });
    const Posts = PostData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      Posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one post
router.get("/post/:id", getAuth, async (req, res) => {
  try {
    const PostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const Post = PostData.get({ plain: true });

    res.render("Post", {
      ...Post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get dashboard
router.get("/dashboard", getAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      where: [
        {
          user_id: req.session.user_id,
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get comments for a post
router.get("/comment/:id", getAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: { all: true, nested: true },
      where: [
        {
          id: req.params.id,
        },
      ],
    });

    const commentData = await Comment.findAll({
      include: {
        all: true,
        nested: true,
      },

      where: [
        {
          post_id: req.params.id,
        },
      ],
    });
    const postsData = postData.map((description) =>
      description.get({ plain: true })
    );
    const commentsData = commentData.map((comment) =>
      comment.get({ plain: true })
    );

    res.render("comment", {
      postsData,
      commentsData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err, { message: "No comment with that Id found!" });
  }
});

//new post page render
router.get("/newpost", getAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: { all: true, nested: true },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("newpost", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// post post
router.post("/newpost", getAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      post_body: req.body.post_body,
      user_id: req.session.user_id,
    });
    if (!postData) {
      res.status(404).json({ message: "Could not create post" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post comment
router.post("/comment/:id", getAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment_body: req.body.comment_body,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err, { message: "No post with that Id found!" });
  }
});

//update post by id path page render
router.get("/update/:id", getAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      where: [
        {
          id: req.params.id,
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("update", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update post
router.put("/update/:id", getAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        post_body: req.body.post_body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!postData) {
      res.status(404).json({ message: "No blogpost found with that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
router.delete("/delete/:id", getAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletePost) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.all("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

//signup
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Export
module.exports = router;
