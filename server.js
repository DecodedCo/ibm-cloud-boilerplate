const express = require("express");
const session = require("express-session");
const passport = require("passport");
const WebAppStrategy = require("bluemix-appid").WebAppStrategy;
const app = express();
const CALLBACK_URL = "/ibm/bluemix/appid/callback";
app.use(session({
  secret: "c85320d9ddb90c13f4",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new WebAppStrategy());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.get(CALLBACK_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME));
app.get("/protected", passport.authenticate(WebAppStrategy.STRATEGY_NAME), function(req, res) {
  res.json(req.user);
});

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log("Listening on port ", port);