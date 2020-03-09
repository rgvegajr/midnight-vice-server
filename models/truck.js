const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema({
   truck_id: Number,
   name: String,
   address: String,
   zipcode: Number,
   hours: {
      Mon: String,
      Tue: String,
      Wed: String,
      Thu: String,
      Fri: String,
      Sat: String,
      Sun: String
   },
   phone_number: String,
   email_address: String,
   website_url: String,
   image_url: String,
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

