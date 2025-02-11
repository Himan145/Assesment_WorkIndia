const db = require("../config/db");

const bookSeat = async (req, res) => {
    try {
        const { train_id } = req.body;
        const user_id = req.user.id;

        const [train] = await db.execute("SELECT available_seats FROM trains WHERE id = ?", [train_id]);

        if (train.length === 0) return res.status(404).json({ error: "Train not found" });
        if (train[0].available_seats <= 0) return res.status(400).json({ error: "No seats available" });

        await db.execute("UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?", [train_id]);
        await db.execute("INSERT INTO bookings (user_id, train_id) VALUES (?, ?)", [user_id, train_id]);

        res.json({ message: "Seat booked successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { bookSeat };
