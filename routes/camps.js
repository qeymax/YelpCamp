var express = require("express");
var router = express.Router();
var Camp = require("../models/camp");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//show all camps
router.get("/camps", function (req, res) {
    Camp.find({},function (err, camps) {
        if (err) {
            sconsole.log(err);
        } else {
            res.render("camps/index", { camps: camps});
        }
    })    
});

//show form for adding new camp
router.get("/camps/new",middleware.isLoggedIn, function (req, res) {
    res.render("camps/new");
});
//add new camp
router.post("/camps",middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var des = req.body.description;
    Camp.create({
    name: name,
    image: image,
    description: des,
    author: {
        id: req.user._id,
        username: req.user.username
    }
    }, function (err, camp) {
    if (err) {
        console.log(err);
    } else {
        res.redirect("/camps");
    }
    });
    
});


//show a camp
router.get("/camps/:id", function (req, res) {
    Camp.findById(req.params.id).populate("comments").exec(function (err, camp) {
        if (err) {
            console.log(err);
        } else {
            res.render("camps/show", { camp: camp });
        }
    });
});


//show form for editting a camp
router.get("/camps/:id/edit", middleware.checkCampOwnership, function (req, res) {
    Camp.findById(req.params.id, function (err, camp) {
        res.render("camps/edit", { camp: camp });
    });
});
//update a camp
router.put("/camps/:id",middleware.checkCampOwnership, function (req, res) {
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, function (err, camp) {
        if (err) {
            res.redirect("/camps");
        } else {
            req.flash("success", "Camp upated successfully.");
            res.redirect("/camps/" + req.params.id);
       }
   }) 
});
//delete camp
router.delete("/camps/:id",middleware.checkCampOwnership, function (req, res) {
    Camp.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/camps");
        } else {
            req.flash("success", "Camp deleted successfully.");
            res.redirect("/camps");
        }
    })
});


module.exports = router;