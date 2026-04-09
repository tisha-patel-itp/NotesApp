// import dotenv from "dotenv"
// dotenv.config();

// const express = require("express");
// const cors = require("cors");
// const db = require("./db");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/notes", async (req, res) => {
//   try{
//   const [rows] = await db.query("SELECT * FROM notes");
//   res.json(rows);
//   }
//   catch(err){
//     res.status(500).json({error:err.message})
//   }
// });

// app.post("/notes", async (req, res) => {
//   try{
//   const { text } = req.body;
//   await db.query("INSERT INTO notes (text) VALUES (?)", [text]);
//   res.json({ message: "Note added" });
//   }catch(err){
//     res.status(500).json({error:err.message})
//   }

// });

// app.listen(3000, () => {
//   console.log("Backend running on port 3000");
// });
import dotenv from "dotenv";
dotenv.config(); // 🔥 MUST BE FIRST
 
import express from "express";
import cors from "cors";
import db from './db.js'
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
app.get("/notes", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM notes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
app.post("/notes", async (req, res) => {
  try {
    const { text } = req.body;
 
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
 
    await db.query("INSERT INTO notes (text) VALUES (?)", [text]);
    res.json({ message: "Note added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
// ✅ Initialize DB
async function initDB() {
  try {
    console.log("DB_USER:", process.env.DB_USER); // 🔍 debug
 
    await db.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text VARCHAR(255)
      )
    `);
 
    console.log("Table 'notes' is ready");
  } catch (err) {
    console.error("Error creating table:", err);
  }
}
 
initDB().then(() => {
  app.listen(3000, () => {
    console.log("Backend running on port 3000");
  });
});