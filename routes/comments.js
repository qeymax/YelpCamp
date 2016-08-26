var express = require("express");
var router = express.Router();
var Camp = require("../models/camp");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//show form for adding a new comment
router.get("/camps/:id/comments/new", middleware.isLoggedIn, function (req, res) {
    Camp.findById(req.params.id, function (err, camp) {
        res.render("comments/new.ejs" , {camp : camp});
    }); 
});
//add new comment
router.post("/camps/:id/comments",middleware.isLoggedIn, function (req, res) {
    Camp.findById(req.params.id, function (err, camp) {
        if (err) {
            
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect("/camps/" + camp._id);
                }
            });
        }
    }); 
});
//show form for editting a comment
router.get("/camps/:id/comments/:comment_id/edit",middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            res.redirect("back");
        }
        res.render("comments/edit" , { camp_id: req.params.id , comment : comment});
    });
});
//update a comment
router.put("/camps/:id/comments/:comment_id",middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, comment) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment Updated successfully.");
            res.redirect("/camps/" + req.params.id);
        }
        
    });
});
//delete a comment
router.delete("/camps/:id/comments/:comment_id",middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        req.flash("success", "comment deleted successfully.");
        res.redirect("/camps/" + req.params.id);
    }); 
});


module.exports = router;