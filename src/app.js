// const express = require("express");
import express from "express";

// import { Express } from "express";
// const collection = require("./mongo");
// import { Collection as Expense } from "./mongo";
import { Collection as Expense } from "../mongo"; // Adjust the path as necessary

// const cors = require("cors");
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.find({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});

app.post("/CreateAc", async (req, res) => {
  const { email, password } = req.body;
  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await collection.find({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("notexist");
  }
});
app.listen(5000, () => {
  console.log("post connected");
});

// const express = require("express");
// // import { findOne, insertOne } from "./mongo";
// import cors from "cors";
// const collection = require("./mongo");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const app = express();
// import express from "express";
// import bodyParser from "body-parser";
// import { Collection } from "./mongo.js"; // Importing Collection model as a named export
// import cors from "cors";

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// app.get("/", cors(), (req, res) => {
//   res.send("Hello World!");
// });
// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await Collection.find({});
//     res.json(users);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.get("/api/users/:email", async (req, res) => {
//   const email = req.params.email;

//   try {
//     const user = await Collection.findOne({ email });
//     if (user) {
//       res.json(user.full_name);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.post("/", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await Collection.findOne({ email: email }); // Using Collection model
//     if (user) {
//       res.json("exist");
//     } else {
//       res.json("notexist");
//     }
//   } catch (e) {
//     console.error("Error:", e);
//     res.status(500).json("error");
//   }
// });

// app.post("/CreateAc", async (req, res) => {
//   const { full_name, email, password, confirm_password } = req.body;
//   const data = {
//     full_name: full_name,
//     email: email,
//     password: password,
//     confirm_password: confirm_password,
//   };

//   try {
//     if (!full_name || !email || !password || !confirm_password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await Collection.findOne({ email: email }); // Using Collection model
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     await Collection.create(data); // Using create function to insert document
//     res.json("created");
//   } catch (e) {
//     console.error("Error:", e);
//     res.status(500).json("error");
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// // MongoDB connection
// mongoose
//   .connect("mongodb://localhost:27017/Expense", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// // Define Schema
// const expenseSchema = new mongoose.Schema({
//   option: String,
//   amount: Number,
// });

// const Expense = mongoose.model("Expense", expenseSchema);

// // Routes
// app.get("/", cors(), (req, res) => {
//   res.send("Hello World!");
// });

// app.post("/api/expenses", async (req, res) => {
//   const { option, amount } = req.body;
//   try {
//     const newExpense = new Expense({ option, amount });
//     await newExpense.save();
//     res.status(201).json(newExpense);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// app.get("/api/expenses", async (req, res) => {
//   try {
//     const expenses = await Expense.find({});
//     res.json(expenses);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// // server.js

// // Your existing server code...

// app.post("/CreateAc", async (req, res) => {
//   const { full_name, email, password, confirm_password } = req.body;

//   try {
//     if (!full_name || !email || !password || !confirm_password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await Expense.findOne({ email: email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const newExpense = new Expense({
//       full_name,
//       email,
//       password,
//       confirm_password,
//     });
//     await newExpense.save();

//     res.status(201).json("created");
//   } catch (e) {
//     console.error("Error:", e);
//     res.status(500).json("error");
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await Expense.findOne({ email: email, password: password });
//     if (user) {
//       res.json("success");
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (e) {
//     console.error("Error:", e);
//     res.status(500).json("error");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
