const mongoose = require("mongoose");
const collegeModel = require("../models/CollegeModels");

const createCollege = async function (req, res) {
  try {
    let { name, fullName, logoLink } = req.body;
    const requestBody = req.body;
    if (Object.keys(requestBody).length == 0) {
     return res.status(400).send({
        status: false,
        msg: "Invalid request parameters. Please provide college details",
      });
    }
    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    }
    if (!fullName) {
      return res
        .status(400)
        .send({ status: false, message: "fullName is required" });
    }
    if (!logoLink) {
      return res
        .status(400)
        .send({ status: false, message: "logoLink is required" });
    }

    let data = await collegeModel.create(req.body);
    return res.status(201).send({ status: true, data: data });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
module.exports.createCollege = createCollege;
