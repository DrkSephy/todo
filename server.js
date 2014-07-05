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

// Build the API
// Get all todos
app.get('/api/todos', function(req, res){
    // Use mongoose to get all todos in the database
    Todo.find(function(err, todos){
        // If there is an error retrieving, send the error.
        if (err) 
            res.send(err)

        res.json(todos); // Return all todos in JSON format
    });
});

// Create todo and send back all todos after creation
app.post('/api/todos', function(req, res){
    // Create a todo, information comes from AJAX request from Angular Frontend
    Todo.create({
        text: req.body.text,
        done: false
    },  function(err, todo){
            if (err)
                res.send(err);

            // Get and return all the todos after you create another
            Todo.find(function(err, todos){
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

app.listen(8080);
console.log("App listening on port 8080");