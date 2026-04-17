// import dotenv from "dotenv";
// dotenv.config(); // 🔥 MUST BE FIRST
 
// import express from "express";
// import cors from "cors";
// import db from './db.js'
 
// const app = express();
 
// // app.use(cors());
// app.use(cors({ origin: "*" }));
// app.use(express.json());
 
// app.get("/notes", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM notes");
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
 
// app.post("/notes", async (req, res) => {
//   try {
//     const { text } = req.body;
 
//     if (!text) {
//       return res.status(400).json({ error: "Text is required" });
//     }
 
//     await db.query("INSERT INTO notes (text) VALUES (?)", [text]);
//     res.json({ message: "Note added" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
 
// // ✅ Initialize DB
// async function initDB() {
//   try {
//     console.log("DB_USER:", process.env.DB_USER); // 🔍 debug
 
//     await db.query(`
//       CREATE TABLE IF NOT EXISTS notes (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         text VARCHAR(255)
//       )
//     `);
 
//     console.log("Table 'notes' is ready");
//   } catch (err) {
//     console.error("Error creating table:", err);
//   }
// }
 
// initDB().then(() => {
//   app.listen(3000, () => {
//     console.log("Backend running on port 3000");
//   });
// });
import dotenv from "dotenv";
dotenv.config(); // 🔥 MUST BE FIRST

import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

/**
 * ✅ HEALTH CHECK ENDPOINT (VERY IMPORTANT)
 * ALB will call this instead of hitting DB
 */
app.get("/", (req, res) => {
  res.status(200).send("App is running");
});

/**
 * GET NOTES
 */
app.get("/notes", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM notes");
    res.json(rows);
  } catch (err) {
    console.error("GET /notes error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * ADD NOTE
 */
app.post("/notes", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    await db.query("INSERT INTO notes (text) VALUES (?)", [text]);
    res.json({ message: "Note added" });
  } catch (err) {
    console.error("POST /notes error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ Initialize DB safely
 */
async function initDB() {
  try {
    console.log("Connecting to DB...");
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_USER:", process.env.DB_USER);

    await db.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text VARCHAR(255)
      )
    `);

    console.log("✅ Table 'notes' is ready");
  } catch (err) {
    console.error("❌ Error creating table:", err.message);
  }
}

/**
 * ✅ Start server AFTER DB init attempt
 */
initDB().finally(() => {
  app.listen(3000, () => {
    console.log("🚀 Backend running on port 3000");
  });
});