const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  category: String,
  firstname: String,
  othernmaes: String,
  username: { type: String, required: [true, 'Name cannot be empty'] },
  emailAddress: { type: String, required: [true, 'Name cannot be empty'] },
  phoneNumber: Number,
  dateOfBirth: Number,
  password: String,
});
userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', userSchema);
module.exports = User;
