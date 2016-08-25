var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    Camp            = require("./models/camp"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

var campRoutes      = require("./routes/camps"),
    commentRoutes   = require("./routes/comments"),
    indexRoutes     = require("./routes/index");

mongoose.connect("mongodb://qeymax2:sallam2100@ds029675.mlab.com:29675/myawesomeyelpcamp");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

seedDB();  


//Passport config
app.use(require("express-session")({
    secret: "this is the secret !!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//---------------------


app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});
    
//use routes
app.use(campRoutes);
app.use(commentRoutes);
app.use(indexRoutes);



app.listen(3000, function () {
    console.log("started");
});