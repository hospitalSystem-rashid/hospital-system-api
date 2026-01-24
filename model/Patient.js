const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    patient_id: {type: String, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String},
    gender: {type: String,},
    dob: {type: String},
    address: {type: String},
    contact: {type: String},
    medicalHistory: [{type: String}],
    documents: [
        {fileName: String, fileUrl: String, uploadedDate: Date}
    ]

}, {timestamps: true});

module.exports = mongoose.model("Patient", PatientSchema);