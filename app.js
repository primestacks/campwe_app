const express       =       require('express'), 
      app           =       express(),
      request       =       require('request'),
      bodyParser    =       require('body-parser'),
      port          =       process.env.PORT || 5000, 
      mongoose      =       require('mongoose'),
      requireStack  =       require('require-stack'),
      methodOverride=       require('method-override'),
      expressSanitizer =    require('express-sanitizer'),
      expressSession =  require('express-session'),
      passport          =   require('passport'),
      localStrategy     =   require('passport-local'),
      multer            =   require("multer"),
      path              =   require("path"),
      passportLocalMongoose = require('passport-local-mongoose'),
      User = require('./models/user');
      
// Routes
var campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments"),
    indexRoutes          = require("./routes/index");

    //   Passport 
      app.use(expressSession({
        secret: 'This is the config code for passport local',
        resave: false,
        saveUninitialized: false
      }));
      
      app.use(passport.initialize());
      app.use(passport.session());
      passport.use(new localStrategy(User.authenticate()))
      passport.serializeUser(User.serializeUser());
      passport.deserializeUser(User.deserializeUser());
      
// exporting models
// var seedDB = require("./seeds");
var Campground = require('./models/campgrounds');
var Comment = require('./models/comment');

mongoose.connect('mongodb://localhost:27017/campwe-db', 
{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true
});
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// SEED DATABASE 
// seedDB();

app.listen(port, function(req, res){
    console.log(`CampWe server has started at Port ${port}`);
})