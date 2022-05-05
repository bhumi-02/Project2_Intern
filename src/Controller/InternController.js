const mongoose = require("mongoose");
const CollegeModels = require("../models/CollegeModels");
const InternModels = require("../models/InternModels");

const createIntern = async function (req, res) {
    try {
      let data = req.body;
      console.log(data);
      if (!data.name) {
        return res
          .status(400)
          .send({ status: false, msg: "plz enter valid Name" });
      }
      if (Object.keys(data.name).length == 0 || data.name.length == 0) {
        return res.status(400).send({ status: false, msg: "plz enter Name" });
      }
      if (!data.email) {
        return res
          .status(400)
          .send({ status: false, data: "EmailId is required" });
      }
      if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email)) {
        return res
          .status(400)
          .send({ status: false, data: "plz enter a valid Email" });
      }
      if (!data.mobile) {
        return res
          .status(400)
          .send({ status: false, data: "mobile No. is required" });
      }
      if(!/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(data.mobile)){
          return res.status(400).send({status:false, data:"mobile number ir valid"})
      }
      let college_id = data.collegeId;
      console.log(college_id)
      if (!college_id) {
        return res
          .status(400)
          .send({ status: false, data: "collegeId is required" });
      }
      if (Object.keys(college_id).length == 0 || college_id.length == 0) {
        return res
          .status(400)
          .send({ status: false, data: "enter a valid collegeId" });
      }
      console.log(college_id);
      let collegeDetail = await CollegeModels.find({_id:data.collegeId});
      //console.log(collegeDetail);
      console.log(data)
      if (!collegeDetail) {
        return res
          .status(404)
          .send({ status: false, data: "No such college exists" });
      }
      let saved = await InternModels.create(data)
      console.log(saved)
      res.status(201).send({ status: true, data: saved });
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

module.exports.createIntern = createIntern;
module.exports.CollegeDetails = CollegeDetails;
