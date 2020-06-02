const express = require('express');
const fs = require('fs');
var device = require('express-device');

var router = express.Router();

router.use(device.capture());

router.get('/', function(req, res) {

    var data = JSON.parse(fs.readFileSync
    ("./data.json" , "utf-8"));

    console.log(req.device.type.toUpperCase());

    res.render('index',
        {
            title: 'Mathieu Labourier',
            contactList: data["contactList"],
            scholarList: data["scholarList"],
            achievList: data["achievList"],
            projectList: data["projectList"],
            SskillFList: data["aboutList"]["SskillFList"],
            spareTimeActivities: data["aboutList"]["spareTimeActivities"],
            languages: data["aboutList"]["languages"],
            mobile: req.device.type.toUpperCase()
    });
});

module.exports = router;
