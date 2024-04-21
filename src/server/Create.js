// server.js
import express from "express";
import { Collection } from "D:/WEBSITE/My-expense-app/Expense/src/Dbconnect"; // Adjust the path as necessary

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST route to create new documents
app.post("/api/create", async (req, res) => {
  const { full_name, email, password, confirm_password } = req.body;

  try {
    // Create a new document using the Collection model
    const newDocument = new Collection({
      full_name,
      email,
      password,
      confirm_password,
    });

    // Save the new document to the database
    await newDocument.save();

    // Send response indicating successful creation
    res
      .status(201)
      .json({ message: "Document created successfully", data: newDocument });
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
