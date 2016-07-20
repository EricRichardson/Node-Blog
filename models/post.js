var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {type: String, required: true},
  body: {type: String}
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
