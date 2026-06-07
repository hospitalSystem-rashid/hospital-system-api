const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema({

    patient: {type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true},
    type: {type: String, enum: ["OPD", "IPD", "pharmacy", "lab"], required: true},
    items: [
        {
            name: String,
            price: Number,
            quantity: Number,
            total: Number
        }
    ],
    totalAmount: {type: Number, required: true},
    paidAmount: {type: Number, default: 0},
    paymentStatus: {type: String, enum: ['unpaid', 'paid', 'partially-paid'], default: "unpaid"}

}, {timestamps: true});

module.exports = mongoose.model("Billing", BillingSchema);