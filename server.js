'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Todo = require('./model/todo');

var app = express();
var router = express.Router();

mongoose.connect('vishal:vintu123@ds115214.mlab.com:15214/vishalvintu');
 var port = process.env.API_PORT || 3001;




//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'api is working'});
});


router.route('/todos').get(function(req, res) {

    Todo.find(function(err, todos) {
        if (err)
            res.send(err);

        res.json(todos)
    });
})

    .post(function(req, res) {
        var todo = new Todo();

        todo.title = req.body.title;
        todo.text = req.body.text;
        todo.save(function(err) {
            if (err)
                res.send(err);
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);

                res.json(todos)
            });
        });
    })

router.route('/todos/:todo_id')

.put(function (req, res) {
    Todo.findById(req.params.todo_id, function(err, todos) {
        if (err)
            res.send(err);

        (req.body.title) ? todo.title = req.body.title : null;
        (req.body.text) ? todo.text = req.body.text : null;

        todo.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'todo has been updated' });
        });
    });
})

    .delete(function(req, res) {

        Todo.remove({ _id: req.params.todo_id }, function(err, todo) {
            if (err)
                res.send(err);
            res.json({ message: 'todo has been deleted' })
        })
    });



app.use('/api', router);

app.listen(port, function() {
    console.log(`api running on port ${port}`);
});