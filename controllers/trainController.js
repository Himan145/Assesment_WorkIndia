const db = require("../config/db");

const getAvailableTrains = async (req, res) => {
    try {
        const { source, destination } = req.query;
        const [trains] = await db.execute("SELECT * FROM trains WHERE source = ? AND destination = ?", 
                                          [source, destination]);
        res.json({ trains });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addTrain = async (req, res) => {
    try {
        const { train_name, source, destination, total_seats } = req.body;
        await db.execute(
            "INSERT INTO trains (train_name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)", 
            [train_name, source, destination, total_seats, total_seats]
        );
        res.status(201).json({ message: "Train added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAvailableTrains, addTrain };
