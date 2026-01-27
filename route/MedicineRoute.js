const express = require("express")
const router = express.Router();

const {
    addMedicine,
    getMedicine,
    getMedicines,
    updateMedicine,
    deleteMedicine

} = require("../controller/MedicineController");

router.post("/medicine", addMedicine);
router.get("/medicine", getMedicines);
router.get("/medicine/:id", getMedicine);

router.put("/medicine/:id", updateMedicine);

router.delete("/medicine/:id", deleteMedicine);

module.exports = router;
