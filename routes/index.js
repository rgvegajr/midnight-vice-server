var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");


// //home - welcome, signup
// router.get("/", function(req, res){
//    res.render("landing");
// });

// //home - welcome, signup
// router.get("/", function(req, res){
//     res.render("campgrounds");
//  });

//home - welcome, signup
router.get("/", function(req, res){
    res.render("trucks");
 });


//================
//   Auth Routes
//================
//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle user signup
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        //log user in and redirect to secret page
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Midnight Food Vice " + user.username + "!!");
            // res.redirect("/campgrounds");
            res.redirect("/trucks");
        });
    });
});

//login in route (form and logic)
//render login form
router.get("/login", function(req, res){
    res.render("login");
});

//login logic with middleware - runs before the callback
router.post("/login", passport.authenticate("local", 
{
    // successRedirect: "/campgrounds",
    successRedirect: "/trucks",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Welcome back to Midnight Food Vice!!"
}), function(req, res){
});

//log out route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out!");
    // res.redirect("/campgrounds");
    res.redirect("/trucks");
});


module.exports = router;