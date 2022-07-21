var express = require("express");
var router = express.Router();
var methodOverride = require('method-override');
var Campground = require("../models/campgrounds");
var multer = require("multer");
path   =   require("path"),
// Campgrounds routes


router.use(methodOverride('_method'));
// Multer image upload configuration
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/');
//     },

//     // By default, multer removes file extensions so let's add them back
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

router.get("/", function(req, res){
    // Get all campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("Something went wrong", err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    })
    // render the campgrounds in a template
});

router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    } 
    var newCampgrounds = {name: name, image: image, description: description, author: author};
    // Create a new campgroud and save to database
    // req.body.campground.description = req.sanitize(req.body.campground.description);
    Campground.create(newCampgrounds, function(err, newlyCreatedcampground){
        if(err){
            res.render("new");
            console.log(err);
        } else{
            // redirect back to the campgrounds page
            // console.log(newlyCreatedcampground);
            res.redirect("/campgrounds"); 
        }
    }) 
})

router.get("/new", isLoggedIn, function(req, res){
    // create a new campground
    res.render("campgrounds/new");
})

// The show page that shows more information about a particular camppground
router.get("/:id", function(req, res){
    // find the campground with the provided id
   Campground.findById(req.params.id).populate("comments").exec(function(err, found_campground){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/show", {campground: found_campground})
       }
   }); 
})

// EDIT CAMPGROUND
router.get("/:id/edit", isLoggedIn, function(req, res){
    // req.body.campground.description = req.sanitize(req.body.campground.description);
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            res.redirect("/campgrounds")
        } else{
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    })
})
// UPDATE ROUTE
router.put("/:id", isLoggedIn, (req, res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
        if(err){
            res.redirect("/campgrounds")
        } else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})
// DELETE ROUTE
router.delete("/:id", function(req, res){
   Campground.findByIdAndRemove(req.params.id, (err, deleted)=>{
       if(err){
           res.redirect("/campgrounds/" + req.params.id)
       } else{
           res.redirect("/campgrounds")
       }
   }) 
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
