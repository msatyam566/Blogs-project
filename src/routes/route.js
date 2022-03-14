const express = require('express');
const router = express.Router();
//const CowinController= require("../controllers/cowinController")
//const assignmentController = require("../controllers/assignmentController")
const Fbusercontroller = require("../controllers/Fbusercontroller")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/createfbUser",Fbusercontroller.createfbUser)
router.post("/loginUser",Fbusercontroller.fbloginUser)





//router.get("/cowin/states", CowinController.getStates)
//router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
//router.get("/cowin/getByPin", CowinController.getByPin)
//router.get("/cowin/getBydistrictid", CowinController.getBydistrictId)
//router.get("/cowin/getweather", assignmentController.getweather)
//router.post("/cowin/getOtp", CowinController.getOtp)
//router.get("/getSortedCities", assignmentController.getSortedcities)



module.exports = router;