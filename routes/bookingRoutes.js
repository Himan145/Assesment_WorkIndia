const express = require("express");
const { bookSeat } = require("../controllers/bookingController");
const { authenticateUser } = require("../middleware/auth");
const router = express.Router();

router.post("/book", authenticateUser, bookSeat);

module.exports = router;
