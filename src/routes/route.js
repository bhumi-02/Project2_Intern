const express = require("express");
const router = express.Router();
const CollegeController = require("../Controller/CollegeController");
const InternController = require("../Controller/InternController");


router.post("/createCollege", CollegeController.createCollege);
router.post("/createIntern", InternController.createIntern);


module.exports = router;