var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
//landing page --home
router.get("/", function (req, res) {
    res.render("home");
});

//show form for registering
router.get("/register", function (req, res) {
    res.render("register");
});
//register user
router.post("/register", function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to YelpCamp" + user.username );
            res.redirect("/camps"); 
        });
   }) 
});

//show form for logging in
router.get("/login", function (req, res) {
    res.render("login");
});
//log in
router.post("/login", passport.authenticate("local", {
    successRedirect: "/camps",
    failureRedirect: "/login"
}), function (req, res) {
    });

//logout
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You have been logged out successfully!");
    res.redirect("/camps");
});


module.exports = router;