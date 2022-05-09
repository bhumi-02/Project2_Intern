const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
     
    },
    mobile: {
      type: Number,
      trim: true,
      unique: true,
      required: [true, "mobile number is required"],
    },
    collegeId: {
      type: ObjectId,
      ref: 'College',
      required: [true, "please enter a collegeId "],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intern", internSchema);