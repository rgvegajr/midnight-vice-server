const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema({
   name: String,
   foodCategory: String,
   address: String,
   hours: {
      Mon: String,
      Tue: String,
      Wed: String,
      Thu: String,
      Fri: String,
      Sat: String,
      Sun: String
   },
   website: String,
   image: String,
   currentLocation: String,
   // lat: Number,
   // lng: Number,
   owner: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
   }// add below for comments
   // },
   // comments: [
   //    {
   //       type: mongoose.Schema.Types.ObjectId,
   //       ref: "Comment"
   //    }
   // ]
});

module.exports = mongoose.model("Truck", truckSchema);