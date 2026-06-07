const express = require("express");
const router = express.Router();

const {
    createAppointment,
    getAppointments,
    getAppointment,
    getAppointmentsByPatient,
    getAppointmentsByDoctor,
    updateAppointment,
    deleteAppointment
} = require("../controller/AppointmentsController");

router.post("/", createAppointment);

router.get("/", getAppointments);
router.get("/:id", getAppointment);
router.get("/patient/:patientId", getAppointmentsByPatient);
router.get("/doctor/:doctorId", getAppointmentsByDoctor);

router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
