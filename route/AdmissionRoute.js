const express = require("express");
const router = express.Router();

const {
    createAdmission,
    getAdmissions,
    getAdmission,
    getAdmissionsByPatient,
    updateAdmission,
    addProgressNote,
    deleteAdmission
} = require("../controller/AdmissionController");

router.post("/", createAdmission);

router.get("/", getAdmissions);
router.get("/:id", getAdmission);
router.get("/patient/:patientId", getAdmissionsByPatient);

router.put("/:id", updateAdmission);
router.put("/:id/progress", addProgressNote);

router.delete("/:id", deleteAdmission);

module.exports = router;
