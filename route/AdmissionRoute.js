const express = require("express");
const router = express.Router();

const {
    createAdmission,
    getAdmissions,
    getAdmission,
    updateAdmission,
    deleteAdmission
} = require("../controller/AdmissionController");


router.get("/", getAdmissions);
router.get("/:id", getAdmission);
router.put("/:id", updateAdmission);
router.delete("/:id", deleteAdmission);

module.exports = router;
