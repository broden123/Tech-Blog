const getAuth = (req, res, next) => {
  console.log("getAuth middleware triggered. Session:", req.session);

  if (!req.session.logged_in) {
    console.log("Redirecting to /login");
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = getAuth;
