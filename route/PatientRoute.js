const express = require("express");
const router = express.Router();

const {
    createPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
} = require("../controller/PatientController");

router.post("/", createPatient);
router.get("/", getPatients);
router.get("/:id", getPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

module.exports = router;
