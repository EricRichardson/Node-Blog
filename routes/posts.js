var express = require("express");
var router = express.Router();
var Post = require("../models/post");

router.get('/new', function(req, res){
  res.render('posts/new', {errors: {}, post: {}, title: "New Post"});
})

router.post('/', function(req, res){
  var post = new Post({title: req.body.title, body: req.body.body});
  post.save(function(err, post){
    if(err){
      console.log(err);
      res.render("posts/new", {errors: err.errors, post: req.body})
    } else {
      res.redirect("posts/" + post._id);
    }
  })
})

router.get('/:id', function(req, res, next){
  Post.findOne({_id: req.params.id}, function(err, post){
    if(err){
      err.status = 404;
      next(err, req, res)
    } else {
      res.render("posts/show", {post: post})
    }
  });
})

router.get('/', function(req, res, next){
  Post.find({}, function(err, posts){
    if(err){
      err.status = 404;
      next(err, req, res);
    } else {
      res.render("posts/index", {posts: posts, title: 'All Posts'})
    }
  })
})

router.get('/:id/edit', function(req, res, next){
  Post.findOne({_id: req.params.id}, function(err, post){
    if (err){
      err.status = 404;
      next(err, req, res);
    } else {
      res.render("posts/edit", {post: post, errors: {}, title: 'Edit Post'})
    }
  })
})

router.patch('/:id', function(req, res, next){
  Post.findOne({_id: req.params.id}, function(err, post){
    if (err){
      err.status = 404;
      next(err, req, res);
    } else {
      post.update({title: req.body.title , body: req.body.body}, function(err, post){
        if(err){
          res.render("posts/edit", {post: post, errors: err.errors})
        } else {
          res.redirect("posts/" + post.id)
        }
      });
    }
  })
})

router.delete('/:id', function(req, res, next){
  Post.remove({_id: req.params.id}, function(err){
    if (err) {
      err.status = 404;
      next(err, req, res)
    } else {
      res.redirect("posts/")
    }
  })
})

module.exports = router
