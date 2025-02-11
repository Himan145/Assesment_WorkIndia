const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
                         [name, email, hashedPassword, role]);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0 || !await bcrypt.compare(password, users[0].password)) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: users[0].id, role: users[0].role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser };
