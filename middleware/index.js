// var Campground = require("../models/campground");
let Truck   = require("../models/truck");
// var Comment = require("../models/comment");
var User    = require("../models/user");

//all the middleware goes here
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){  //try adding user as a param
    if(req.isAuthenticated()){
        // req.flash("success", "Welcome back to Midnight Food Vice "+ user.username);     // + user.username);
        // req.flash("success", "Welcome to YelpCamp " + user.username);
        return next();
    }    
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
}


middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //does user own campground?
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found.");
                res.redirect("back");
            }  else  {
                //cant compare directly because one is object, other is string so use mongoose built-in function
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Sorry, Only campground creator can edit or delete.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }   
}

middlewareObj.checkTruckOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //does user own truck?
        Truck.findById(req.params.id, function(err, foundTruck){
            if(err || !foundTruck){
                req.flash("error", "Truck not found.");
                res.redirect("back");
            }  else  {
                //cant compare directly because one is object, other is string so use mongoose built-in function
                if(foundTruck.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Sorry, Only truck owner can edit or delete.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }   
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //does user own campground?
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found.");
                res.redirect("back");
            }  else  {
                //cant compare directly because one is object, other is string so use mongoose built-in function
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }   
}

var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

module.exports = middlewareObj;