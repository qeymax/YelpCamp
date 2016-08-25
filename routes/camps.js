var express = require("express");
var router = express.Router();
var Camp = require("../models/camp");
var Comment = require("../models/comment");


router.get("/camps", function (req, res) {
    Camp.find({},function (err, camps) {
        if (err) {
            sconsole.log(err);
        } else {
            res.render("camps/index", { camps: camps});
        }
    })
    
    
});


router.get("/camps/new",isLoggedIn, function (req, res) {
    res.render("camps/new");
});

router.post("/camps",isLoggedIn, function (req, res) {
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



router.get("/camps/:id", function (req, res) {
    Camp.findById(req.params.id).populate("comments").exec(function (err, camp) {
        if (err) {
            console.log(err);
        } else {
            res.render("camps/show", { camp: camp });
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