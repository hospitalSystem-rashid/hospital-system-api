const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Middlewares
app.use(express.json());

// Import Routes
const userRoutes = require("./route/userRouts");
const admissionRoutes = require("./route/AdmissionRoute");
const appointmentRoutes = require("./route/AppointmentsRoute");
const billingRoutes = require("./route/BillingRoute");
const labRoutes = require("./route/LabTestRoute");
const medicalRecordRoutes = require("./route/MedicalRecordRoute");
const medicineRoutes = require("./route/MedicineRoute");
const patientRoutes = require("./route/PatientRoute");
const prescriptionRoutes = require("./route/PrescriptionRoute");

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("DB Connection Error:", err));

// ---------------------
//   API ROUTES INDEX
// ---------------------

// /api/users → userRoutes
app.use("/api/users", userRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/lab", labRoutes);
app.use("/medical-record", medicalRecordRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// ---------------------
//   ROOT ENDPOINT
// ---------------------
app.get("/", (req, res) => {
    res.send("Hospital Management System API Running");
});

// ---------------------
//   START SERVER
// ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));