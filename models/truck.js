const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   location: String,
   lat: Number,
   lng: Number,
   owner: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
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