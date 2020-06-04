const express = require('express');
var device = require('express-device');

var router = express.Router();

router.use(device.capture());

router.get('/', function(req, res, next) {

     console.log(req.device.type.toUpperCase());

     res.render('auto');
});

router.get('/:proj', function(req, res) {
    console.log(req.device.type.toUpperCase());
    if (req.params.proj == "kinematics") {
        res.render('autoKin');
    } else {
        res.render(req.params.proj);
    }
});

router.get('/kinematics', function(req, res, next) {

    console.log(req.device.type.toUpperCase());

});

router.get('/kinematics/:proj', function(req, res, next) {

    console.log(req.device.type.toUpperCase());

    res.render(req.params.proj);
});

module.exports = router;
