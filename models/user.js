const mongoose                = require("mongoose");
const passportLocalMongoose   = require("passport-local-mongoose");

//schema setup

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);