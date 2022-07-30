// require('dotenv').config()
const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const mongoose = require('mongoose');
const requireStack = require('require-stack');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const localStrategy = require('passport-local');

const User = require('./models/user');

// Routes
let campgroundRoutes = require('./routes/campgrounds');
let commentRoutes = require('./routes/comments');
let indexRoutes = require('./routes/index');

// Mongo DB Configoration 
// New connection string
// mongodb+srv://admin-campe:<password>@cluster0.lqidu.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://admin-campe:Text-12345@cluster0.lqidu.mongodb.net/campwe-db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
	autoIndex: true,
});

// Local connection string
// mongoose.connect('mongodb://localhost:27017/campwe-db', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true,
// 	useFindAndModify: false,
// 	autoIndex: true,
// });
mongoose.set('useFindAndModify', false);

	//   Passport session setup
app.use(session({
		secret: 'This is the config code for passport local',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());
// passport.use(new localStrategy(User.authenticate()));
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Google strategy
// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:5000/auth/google/campwe"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// exporting models
// var seedDB = require("./seeds");
var Campground = require('./models/campgrounds');
var Comment = require('./models/comment');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// SEED DATABASE
// seedDB();

if (port == null || port == "") {
  port = 5000;
}

app.listen(port, function (req, res) {
	console.log(`CampWe server has started at Port ${port} successfully`);
});
