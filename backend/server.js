const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/notes", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM notes");
  res.json(rows);
});

app.post("/notes", async (req, res) => {
  const { text } = req.body;
  await db.query("INSERT INTO notes (text) VALUES (?)", [text]);
  res.json({ message: "Note added" });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});