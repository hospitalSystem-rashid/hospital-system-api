const Appointment = require("../model/Appointment");
const Patient = require("../model/Patient");
const User = require("../model/User");

// create appointment
// PATH POST /api/appointments
exports.createAppointment = async (req, res) => {
    try {
        const {patient, doctor} = req.body;

        const patientExists = await Patient.findById(patient);
        if (!patientExists)
            return res.status(404).json({message: "Patient not found..."});

        const doctorExists = await User.findById(doctor);
        if (!doctorExists)
            return res.status(404).json({message: "Doctor not found..."});

        const appointment = await Appointment.create(req.body);

        res.status(201).json({
            message: "Appointment created successfully",
            appointment
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// get all appointments
// PATH GET /api/appointments
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("patient")
            .populate("doctor", "name role");

        res.status(200).json(appointments);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// get single appointment
// PATH GET /api/appointments/:id
exports.getAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate("patient")
            .populate("doctor", "name role");

        if (!appointment)
            return res.status(404).json({message: "Appointment not found..."});

        res.status(200).json(appointment);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// get appointments by patient
// PATH GET /api/appointments/patient/:patientId
exports.getAppointmentsByPatient = async (req, res) => {
    try {
        const appointments = await Appointment.find({patient: req.params.patientId})
            .populate("patient")
            .populate("doctor", "name role");

        res.status(200).json(appointments);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// get appointments by doctor
// PATH GET /api/appointments/doctor/:doctorId
exports.getAppointmentsByDoctor = async (req, res) => {
    try {
        const appointments = await Appointment.find({doctor: req.params.doctorId})
            .populate("patient")
            .populate("doctor", "name role");

        res.status(200).json(appointments);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// update appointment
// PATH PUT /api/appointments/:id
exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        ).populate("patient").populate("doctor", "name role");

        if (!appointment)
            return res.status(404).json({message: "Appointment not found..."});

        res.status(200).json({
            message: "Appointment updated successfully",
            appointment
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// delete appointment
// PATH DELETE /api/appointments/:id
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!appointment)
            return res.status(404).json({message: "Appointment not found..."});

        res.status(200).json({message: "Appointment deleted successfully..."});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};
