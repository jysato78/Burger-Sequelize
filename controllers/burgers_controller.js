var express = require("express");

var router = express.Router();
var db = require("../models");
var app = express();
// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  
    db.Burger.findAll({}).then(function(data) {
      var hbsObject = { burgers: data };
      res.render("index", hbsObject);
    });
  
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  return db.Burger.create(req.body)
  .then(function(burger) {
      res.redirect("/burgers");
    })
  });


// put route -> back to index
router.put("/burgers/:id", function(req, res) {
  return db.Burger.update({
    devoured: req.body.devoured
  }, {
      where: {
        id: req.params.id
      }
    }).then(function() {
      res.redirect("/burgers");
    });  
 
});

module.exports = router;
