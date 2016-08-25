var express = require("express");
var router = express.Router();
var Camp = require("../models/camp");
var Comment = require("../models/comment");

router.get("/camps/:id/comments/new", isLoggedIn, function (req, res) {
    Camp.findById(req.params.id, function (err, camp) {
        res.render("comments/new.ejs" , {camp : camp});
    }); 
});

router.post("/camps/:id/comments",isLoggedIn, function (req, res) {
    Camp.findById(req.params.id, function (err, camp) {
        if (err) {
            
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    
                } else {
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect("/camps/" + camp._id);
                }
            });
        }
    }); 
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;