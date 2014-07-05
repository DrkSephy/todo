var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');

mongoose.connect('mongodb://DrkSephy:seph1025@novus.modulusmongo.net:27017/yvurOr2y');

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));                 // log every request to the console
    app.use(express.bodyParser());                  // pull information from html in POST
});

// Define our TODO model
var Todo = mongoose.model('Todo', {
    text: String
});

app.listen(8080);
console.log("App listening on port 8080");