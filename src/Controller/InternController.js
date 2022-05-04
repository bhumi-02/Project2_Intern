const mongoose = require('mongoose');
const InternModels = require('../models/InternModels');

const createIntern = async function(req,res) {
    try {
        let { name, mobile, email, collegeName } = req.body
        const requestBody = req.body;
        if (Object.keys(requestBody).length == 0) {
            return res.status(400).send({
                status: false,
                msg: "Invalid request parameters. Please provide Intern details",
            });
        }

        if (!name) {
            return res
                .status(400)
                .send({ status: false, message: "name is required" });
        }
        if (!mobile) {
            return res
                .status(400)
                .send({ status: false, message: "Mobile is required" });
        }
        if (!email) {
            return res.status(400).send({
                status: false,
                message: " email is required",
            })
        }
        if (!collegeName) {
            return res
                .status(400)
                .send({ status: false, message: "collegeName is required" });
        }
        let emailValidation = await InternModels.findOne({ email: email })
        if (emailValidation) {
            return res.status(400).send({ status: false, data: "This Email has been registered already" })
        }
        // let findCollege = await InternModels.findById({college_id})
        // if(findCollege) {
        //     return res.status(400).send({status:false, data:"No Such college exists"})
        // }
        
        let data = await InternModels.create(req.body)
        return res.status(201).send({ status: true, data: data })

    }
    catch (err) {
        // console.log("This is the error 1", err.message)
        res.status(500).send({ status: false, data: err.message });
      }
    };
  



module.exports.createIntern = createIntern