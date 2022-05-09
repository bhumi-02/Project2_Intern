const mongoose = require("mongoose");
const collegeModel = require("../models/CollegeModels");

const College = async function (req, res) {
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
    if (!/^([a-zA-Z]+)$/.test(name)) {
      return res
        .status(401)
        .send({ status: false, msg: "Please enter a valid name" });
    }
    let checkName = await collegeModel.find({ name });
    if (checkName.length != 0) {
      return res.status(400).send({
        status: false,
        msg: "name is already exits",
      });
    }
    if (!fullName) {
      return res
        .status(400)
        .send({ status: false, message: "fullName is required" });
    }
    if (!logoLink) {
      return res
        .status(400)
        .send({ status: false, message: "plz giving the logoLink" });
    }
    if (
      !/(http|ftp|https|www):\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
        logoLink
      )
    ) {
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
module.exports.College = College;
