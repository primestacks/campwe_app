var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing")
})

// AUTH ROUTES
router.get("/register", function(req, res){
    res.render("register")
})
// Sign up logic handled here
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username}, {emailAddress: req.body.emailAddress});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register")
        }
        User.authenticate("local")(req, res, function(){
            res.redirect("/login")
        })
    })
})
// Login form and logic
router.get("/login", function(req, res){
    res.render("login", {currentUser: req.user});
})
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }),  function(req, res){})

// Logout
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
})

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;