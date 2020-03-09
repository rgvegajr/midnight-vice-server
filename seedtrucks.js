var mongoose = require("mongoose");

let truckdata = [
    {
        truck_id:"1",
        name: "Monster Bite Food Truck",
        address: "3401 NW 42ND AVE, MIAMI, FL",
        zipcode: "33142",
        hours: {
              Mon: "5PM-12AM",
              Tue: "5PM-12AM",
              Wed: "5PM-12AM",
              Thu: "5PM-12AM",
              Fri: "5PM-12AM",
              Sat: "5PM-12AM",
              Sun: "5PM-12AM"
           },
           phone_number: "(305) 833-9400",
           email_address: "info@monsterbiteworld.com",
           website_url: "http://monsterbiteworld.com/",
           image_url: "https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/18813537_1886045305002733_8989076578903023305_n.jpg?_nc_cat=101&_nc_sid=dd9801&_nc_ohc=_0pIMm7wfq4AX-gMo8x&_nc_ht=scontent-mia3-1.xx&oh=69a7f23a3985e26b8ad2b43bf01c9aa4&oe=5E984127",
           currentLocation: "",
           owner: {
              id: {
                 type: mongoose.Schema.Types.ObjectId,
                 ref: "User"
              },
           username: ""
           }
        }
]

function seedDB(){
    Truck.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed trucks!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
        });
             //add a few campgrounds
        data.forEach(function(seed){
            Truck.create(seed, function(err, truck){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a truck");
                        //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                });
            });
        });
};
 
module.exports = seedDB;  