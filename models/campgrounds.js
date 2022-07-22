var mongoose = require('mongoose');

// Schema setups
var campgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name cannot be empty'],
  },
  image: String,
  description: {
    type: String,
    requiered: [true, 'write a descrisption of your camp site'],
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});
var Campground = mongoose.model('Campground', campgroundSchema);
module.exports = Campground;
