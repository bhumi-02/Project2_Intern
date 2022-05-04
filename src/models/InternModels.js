const { default: mongoose } = require("mongoose");
const CollegeModels = require("./CollegeModels");
const ObjectId = mongoose.Schema.Types.ObjectId
 require('mongoose-type-email')

const InternSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    college_id:{
        type:ObjectId,
        required:true,
        ref:"College",
        trim:true,
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.model('Intern', InternSchema)
