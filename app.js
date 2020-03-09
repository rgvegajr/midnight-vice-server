require("dotenv").config();

let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Truck       = require("./models/truck"),
    // Campground  = require("./models/campground"),
    // Comment     = require("./models/comment"),
    User        = require("./models/user"), 
    seedDB      = require("./seedtrucks");
    

//requiring routes
// let //commentRoutes    = require("./routes/comments"),
    // campgroundRoutes = require("./routes/campgrounds"),
let truckRoutes      = require("./routes/trucks"),
    indexRoutes      = require("./routes/index");

//mongoose and mongo database init
let url = process.env.DATABASEURL || "mongodb://localhost/foodtrucks"
mongoose.connect(url);    
//mongoose.connect("mongodb://localhost/yelp_camp_v12");
//mongoose.connect("mongodb://rv:simba1@ds251622.mlab.com:51622/yelpcamp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//passport configuration
app.use(require("express-session")({
    secret: "Once again Simba wins cutest dog",
    resave:  false,
    saveUninitialized:  false
}));

//passport setup, using localstrategy
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//routes
app.use("/", indexRoutes);
// app.use("/campgrounds", campgroundRoutes);
app.use("/trucks", truckRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);

//listen
PORT = 4500;
app.listen(PORT, function(){
    console.log("The Midnight Food Vice Server is running on port" + PORT);
});
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("The Midnight Food Vice Server is running");
// });