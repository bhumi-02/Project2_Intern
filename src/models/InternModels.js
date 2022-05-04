const { default: mongoose } = require("mongoose");
require('mongoose-type-email')

const InternSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    collegeId:{
        
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
