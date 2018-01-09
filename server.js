var express = require("express"),
    app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log("Listening on port ", port);