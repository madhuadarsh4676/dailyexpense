// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const MONGODB_URI = "mongodb://localhost:27017/Expense";

// const userSchema = new mongoose.Schema({
//   full_name: { type: String, required: true },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     index: { unique: true },
//   },
//   password: { type: String, required: true },
//   confirm_password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected successfully!");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   }
// };

// connectDB(); // Connect to the database

// // Login endpoint
// app.get("/login/:username", async (req, res) => {
//   try {
//     const { username } = req.params;
//     if (!username) {
//       return res.status(400).json({ error: "Username is required" });
//     }

//     const user = await User.findOne({ email: username });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({
//       email: user.email,
//       password: user.password,
//     });
//   } catch (error) {
//     console.error("Error fetching data from users collection:", error);
//     res.status(500).json({ error: "Couldn't fetch the data" });
//   }
// });

// // Create user endpoint
// app.post("/users", async (req, res) => {
//   const { full_name, email, password, confirm_password } = req.body;

//   if (password !== confirm_password) {
//     return res.status(400).json({ message: "Passwords do not match" });
//   }

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(409).json({ message: "Email already exists" });
//     }

//     const newUser = new User({ full_name, email, password, confirm_password });
//     const savedUser = await newUser.save();
//     console.log("User created successfully:", savedUser);
//     res.json({ message: "User created successfully!", user: savedUser });
//   } catch (err) {
//     console.error("Error creating user:", err);
//     res.status(500).json({ message: "Error creating user" });
//   }
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server listening on port ${port}`));
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Expense")
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch(() => {
    console.log("Failed");
  });

const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("collection", newSchema);

module.exports = collection;
