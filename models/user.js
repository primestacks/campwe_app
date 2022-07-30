const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  category: String,
  firstname: String,
  lastname: String,
  username: String,
  phoneNumber: Number,
  dateOfBirth: Number,
  password: String,
  // fullName: `${firstname} ${lastname}` 
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;
