var express = require("express");
var router  = express.Router();
var Truck = require("../models/truck");
var middleware = require("../middleware");
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

// INDEX - show all trucks
//trucks - name, image
router.get("/", function(req, res){
    //get all trucks from DB
    Truck.find({}, function(err, allTrucks){
        if(err){
            console.log(err);
        }  else  {
            res.render("trucks/index", {trucks: allTrucks});
        }
    });
});

//CREATE - add new truck to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let foodCategory = req.body.foodCategory;
  let address = req.body.address;
  let hours = req.body.hours;
  let website = req.body.website;
  let image = req.body.image;
  let currentLocation = req.body.currentLocation;
  let owner = {
      id: req.user._id,
      username: req.user.username
  };

//   geocoder.geocode(req.body.location, function (err, data) {
//     if (err || !data.length) {
//       req.flash('error', 'Invalid address');
//       return res.redirect('back');
//     }
//     var lat = data[0].latitude;
//     var lng = data[0].longitude;
//     var location = data[0].formattedAddress;
//     var newTruck = {name: name, image: image, description: desc, owner:owner, location: location, lat: lat, lng: lng};
//     // Create a new campground and save to DB
//     Truck.create(newTruck, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to trucks page
//             console.log(newlyCreated);
//              req.flash("success", "New Truck Added!");
//             res.redirect("/trucks");
//         }
//     });
//   });
  let newTruck = {name: name, foodCategory: foodCategory, address: address, hours: hours, website: website, image: image, currentLocation: currentLocation, owner: owner};
  // Create a new campground and save to DB
  Truck.create(newTruck, function(err, newlyCreated){
      if(err){
          console.log(err);
      } else {
          //redirect back to trucks page
          console.log(newlyCreated);
           req.flash("success", "New Truck Added!");
          res.redirect("/trucks");
      }
  });
});

//NEW - show new truck form
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("trucks/new"); 
    
});

//SHOW
router.get("/:id", function(req, res){
    //show additional truck info page
    Truck.findById(req.params.id).populate("comments").exec(function(err, foundTruck){
        if(err || !foundTruck){
            req.flash("error", "Truck not found.");
            res.redirect("back");
        }  else  {
//            console.log(foundCampground);
            //render show template with that campground
           res.render("trucks/show", {truck: foundTruck});
        }
    });
});

//edit truck route (show form)
router.get("/:id/edit", middleware.checkTruckOwnership, function(req, res){
   Truck.findById(req.params.id, function(err, foundTruck){
                    res.render("trucks/edit", {truck: foundTruck});
    });
});

// UPDATE Truck ROUTE
router.put("/:id", middleware.checkTruckOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.truck.lat = data[0].latitude;
    req.body.truck.lng = data[0].longitude;
    req.body.truck.location = data[0].formattedAddress;

    Truck.findByIdAndUpdate(req.params.id, req.body.truck, function(err, truck){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/trucks/" + truck._id);
        }
    });
  });
});

// DESTROY truck route
router.delete("/:id", middleware.checkTruckOwnership, function(req, res){
    Truck.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/trucks");
        }  else  {
            req.flash("success", "Truck deleted!");
            res.redirect("/trucks");
        }
    });
});

//middleware moved to middleware/index.js

module.exports = router;