import express from "express";
const app = express();
app.use(express.json());
import mysql from "mysql2";
import cors from "cors";

const port = 5000;

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "movigo",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err.stack);
    return;
  }
  console.log("Connected to the database");
});

app.post("/api/signup", (req, res) => {
  const { email, password, tel, name } = req.body;
  const query = `INSERT INTO users (email, password, name, tel) VALUES (?, ?, ?, ?)`;
  db.query(query, [email, password, name, tel], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving user data" });
      return;
    }
    res.json({ message: "User registered successfully" });
  });
});

app.post("/api/signin", (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ?`;
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error checking user" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const storedPassword = result[0].password;
    if (storedPassword !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "User signed in successfully",
      user: {
        id: result[0].id,
        email: result[0].email,
        password: result[0].password,
        name: result[0].name,
        tel: result[0].tel,
      },
    });
  });
});

app.post("/api/wishlist", (req, res) => {
  console.log("Request body : ", req.body);
  const { userId, movieId, movieTitle, posterUrl } = req.body;
  const query = `INSERT INTO wishlists (user_id, movie_id, movie_title, poster_url) VALUES (?, ?, ?, ?)`;
  db.query(query, [userId, movieId, movieTitle, posterUrl], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error adding to wishlist" });
    }
    res.json({ message: "Movie added to wishlist" });
  });
});

app.get("/api/wishlist/:userId", (req, res) => {
  const { userId } = req.params;
  const query = `SELECT * FROM wishlists WHERE user_id = ?`;
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching wishlist" });
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
