const express = require("express");
const router = express.Router();
const CollegeController = require("../Controller/CollegeController");
const InternController = require("../Controller/InternController");


router.post("/functionup/College", CollegeController.College);
router.post("/functionup/Intern", InternController.Intern);
router.get("/functionup/CollegeDetails", InternController.CollegeDetails);



module.exports = router;