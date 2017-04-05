var express = require('express');
var icloud = require("find-my-iphone").findmyphone;
icloud.apple_id = "";
icloud.password = "";

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/api/get-my-phone-location', function (req, res, next) {
    icloud.getDevices(function (error, devices) {
        var device;

        if (error) {
            res.status(401).send(error);
        }
        //pick a device with location and findMyPhone enabled 
        devices.forEach(function (d) {
            if (device == undefined && d.location && d.lostModeCapable) {
                device = d;
            }
        });

        if (device) {

            icloud.getLocationOfDevice(device, function (err, location) {
                console.log(location);
                res.send(location);
            });
        } else {
            res.status(401).send('Device not found');
        }
    });
});

module.exports = router;
