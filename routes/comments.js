var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");

// =======================
// COMMENT ROUTES STARTS HERE
// =======================
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else{
            res.render("comments/new", {campground: campground});
        }
    })
})

// Handling logic that creates a new comment
router.post("/", isLoggedIn, function(req, res){
    // look up campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else{
               // create a comment
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    console.log(err)
                    res.redirect("/campgrounds")
                } else{
                    // add user id and username to to comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.author.created = req.user.created;
                    // save comment to database
                    newComment.save();
                    campground.comments.push(newComment);
                    campground.save();
                    console.log(newComment);
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
 
    // connect comment to campground
    // redirect to campground show page
})
// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;