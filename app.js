var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Camp = require("./models/camp");
var Comment = require("./models/comment");
var seedDB = require("./seeds");



mongoose.connect("mongodb://qeymax2:sallam2100@ds029675.mlab.com:29675/myawesomeyelpcamp");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

seedDB();  
    
app.get("/", function (req, res) {
    res.render("home");
});

app.get("/camps", function (req, res) {
    Camp.find({},function (err, camps) {
        if (err) {
            sconsole.log(err);
        } else {
            res.render("camps/index", { camps: camps });
        }
    })
    
    
});

app.post("/camps", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var des = req.body.description;
    Camp.create({
    name: name,
    image: image,
    description : des
    }, function (err, camp) {
    if (err) {
        console.log(err);
    } else {
        res.redirect("/camps");
    }
    });
    
});

app.get("/camps/new", function (req, res) {
    res.render("camps/new");
});

app.get("/camps/:id", function (req, res) {
    Camp.findById(req.params.id).populate("comments").exec(function (err, camp) {
        if (err) {
            console.log(err);
        } else {
            res.render("camps/show", { camp: camp });
        }
    });
});




//------------------------


app.get("/camps/:id/comments/new", function (req, res) {
    Camp.findById(req.params.id, function (err, camp) {
        res.render("comments/new.ejs" , {camp : camp});
    }); 
});

app.post("/camps/:id/comments", function (req, res) {
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

app.listen(3000, function () {
    console.log("started");
});