const Patient = require("../model/Patient");

//create patient
exports.createPerson = async (req, resp) => {
    try {
        const patient = new Patient();
        await patient.save();

        res.status(201).json({message: "Patient created", patient});

    } catch (e) {
        resp.status(400).json({message: e.message})
    }
};

// get all patients
exports.getPatients = async (req, resp) => {
    try {
        const patients = await Patient.find();

        res.status(200).json(patients);
    } catch (e) {
        resp.status(400).json({message: e.message})
    }
};

// get one patient details
exports.getPatient = async (req, resp) => {
    try {
        const patient = await Patient.findById(req.params.id);

        res.status(200).json(patient);
    } catch (e) {
        resp.status(400).json({message: e.message})
    }
};

//update patient
exports.updatePatient = async (req, resp) => {
    try {
        const patient = Patient.findByIdAndUpdate(
            req.params.id, req.body, {new: true}
        );

        if (!patient) return res.status(404).json({message: "Patient not found"});

        res.status(200).json({message: "Patient updated", patient});

    } catch (e) {
        resp.status(400).json({message: e.message})
    }
};

//delete patient
exports.deletePatient = async (req, resp) => {
    try {
        const patient = Patient.findByIdAndDelete(
            req.params.id
        );

        if (!patient) return res.status(404).json({message: "Patient not found"});

        res.status(200).json({message: "Patient Deleted"});

    } catch (e) {
        resp.status(400).json({message: e.message})
    }
};