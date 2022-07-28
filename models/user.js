const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  category: String,
  firstname: String,
  lastname: String,
  username: String,
  phoneNumber: Number,
  dateOfBirth: Number,
  password: String
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;
