const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema({
   name: String,
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
   phoneNumber: String,
   website: String,
   image: String,
   currentLocation: String,
   owner: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
   username: String,
   }
});

module.exports = mongoose.model("Truck", truckSchema);