const express = require("express");
const { getAvailableTrains, addTrain } = require("../controllers/trainController");
const { authenticateAdmin } = require("../middleware/auth");
const router = express.Router();

router.get("/available_seat_trains", getAvailableTrains);
router.post("/addtrains", authenticateAdmin, addTrain);

module.exports = router;
