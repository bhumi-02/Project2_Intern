const mongoose = require("mongoose");
const CollegeModels = require("../models/CollegeModels");
const InternModels = require("../models/InternModels");

const Intern = async function (req, res) {
  try {
    let data = req.body;
    console.log(data);
    if (!data) {
      return res
        .status(400)
        .send({ status: false, massege: "plz enter a valid data" });
    }
    if (Object.keys(data).length == 0 || data.length == 0) {
      return res
        .status(400)
        .send({ status: false, massege: "plz enter a valid data" });
    }
    if (!data.name) {
      return res
        .status(400)
        .send({ status: false, message: "plz enter valid Name" });
    }
    if (Object.keys(data.name).length == 0 || data.name.length == 0) {
      return res.status(400).send({ status: false, msg: "plz enter Name" });
    }
    if (!data.email) {
      return res
        .status(400)
        .send({ status: false, message: "EmailId is required" });
    }
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email)) {
      return res
        .status(400)
        .send({ status: false, message: "plz enter a valid Email" });
    }
    let checkemailExist = await InternModels.find({ email: data.email });
    if (checkemailExist.length != 0) {
      return res
        .status(400)
        .send({ status: false, data: "email already exist" });
    }
    if (!data.mobile) {
      return res
        .status(400)
        .send({ status: false, message: "Mobile No. is required" });
    }
    if (
      !/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(
        data.mobile
      )
    ) {
      return res
        .status(400)
        .send({ status: false, message: "Mobile No is required" });
    }
    let checkmobileExist = await InternModels.find({ mobile: data.mobile });
    if (checkmobileExist.length != 0) {
      return res
        .status(400)
        .send({ status: false, data: "mobile already exist" });
    }
    if (!data.collegeName) {
      return res
        .status(400)
        .send({ status: false, message: "collegeId is required" });
    }
    let collegeName = await CollegeModels
      .find({ name: req.body.collegeName })
      .select({ _id: true });
    console.log(collegeName);
    if (collegeName.length == 0) {
      return res
        .status(400)
        .send({ status: false, massege: "No any such college" });
    }
    if (Object.keys(collegeName).length == 0 || collegeName.length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "enter a valid collegeName" });
    }

    let saved = await InternModels.create({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      collegeId: collegeName[0],
    });
    let name = saved.name;
    let email = saved.email;
    let mobile = saved.mobile;
    let collegeId = saved.collegeId;
    let isDeleted = saved.isDeleted;
    res
      .status(201)
      .send({
        status: true,
        data: { isDeleted, name, email, mobile, collegeId },
      });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.massege });
  }
};


// Get
const CollegeDetails = async function (req, res) {
  try {
    const data = req.query.collegeName;
    const details = await CollegeModels.findOne({
      name: data,
      isDeleted: false,
    });
    if (!details) {
      return res
        .status(400)
        .send({ error: "Data provided is not present in college DB" });
    }
    const data2 = await InternModels.find({
      collegeId: details._id,
      isDeleted: false,
    }).select({ name: 1, email: 1, mobile: 1 });
    if (!data2) {
      return res
        .status(400)
        .send({ error: "Data provided is not present in college DB" });
    }
    const getData = {
      name: details.name,
      fullName: details.fullName,
      logoLink: details.logoLink,
      interests: data2,
    };

    return res.status(200).send({status: true, Data: getData });
  } catch (err) {
    return res.status(500).send({ ERROR: err.message });
  }
};

module.exports.Intern = Intern;
module.exports.CollegeDetails = CollegeDetails;
