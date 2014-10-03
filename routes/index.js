var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET hello world page. */
router.get('/helloworld', function(req, res){
  res.render('helloworld', { title: 'Hello, World!' })
  });
  
/* GET Add Task page. */
router.get('/addTask', function(req, res){
  res.render('addTask', { title: 'Add Task!' })
  });

  /* POST to Add User Service */
router.post('/addtask', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var taskName = req.body.taskname;
    var taskOwner = req.body.ownername;

    // Set our collection
    var collection = db.get('taskcollection');

    // Submit to the DB
    collection.insert({
        "taskname" : taskName,
        "taskOwner" : taskOwner
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("tasklist");
            // And forward to success page
            res.redirect("tasklist");
        }
    });
});
  
  /* GET Task list page. */
router.get('/tasklist', function(req, res) {
    var db = req.db;
    var collection = db.get('taskcollection');
    collection.find({},{},function(e,docs){
        res.render('tasklist', {
            "tasklist" : docs
        });
    });
});
module.exports = router;
