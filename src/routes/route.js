const express = require("express");
const router = express.Router();
const CollegeController = require("../Controller/CollegeController");
const InternController = require("../Controller/InternController");


router.post("/functionup/createCollege", CollegeController.createCollege);
router.post("/functionup/createIntern", InternController.createIntern);
router.get("/functionup/CollegeDetails", InternController.CollegeDetails);



module.exports = router;