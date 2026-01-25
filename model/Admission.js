const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true},

    bedNum: {type: Date, required: true},
    ward: {type: String, required: true},
    admissionDate: {type: Date, default: Date.now},
    dischargeDate: {type: String},

    progressNotes: [{
        note: String,
        date: {type: Date, default: Date.now}
    }
    ]

}, {timestamps: true});

module.exports = mongoose.model("Admission", AdmissionSchema);