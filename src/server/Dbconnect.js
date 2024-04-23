import mongoose from "mongoose";
import express from "express";
import cors from "cors";
// import autoIncrement from "mongoose-auto-increment";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Expense", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB:", error);
  });

// Create a mongoose connection
const connection = mongoose.createConnection(
  "mongodb://localhost:27017/Expense",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Initialize auto-increment
// autoIncrement.initialize(connection);

// Define schemas and models

// Schema for login
const loginSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirm_password: { type: String, required: true },
});

// Login model
const Login = mongoose.model("Login", loginSchema);

// Schema for expenses
const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "Entertainment",
      "Education",
      "Movie",
      "Food",
      "Games",
      "Rent",
      "Cab",
      "Other",
    ],
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Login", required: true },
});

// Expense model
const Expense = mongoose.model("AddExpense", expenseSchema);

// Schema for bank accounts
const bankAccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  amount: { type: String, required: true },
  accountType: {
    type: String,
    enum: ["debit", "credit"],
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Login", required: true },
});

// Bank Account model
const BankAccount = mongoose.model("BankAccount", bankAccountSchema);

// Routes

// POST route for login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user with the provided email
    const user = await Login.findOne({ email: email });

    // If user exists
    if (user) {
      // Check if the provided password matches the stored password
      if (user.password === password) {
        // Password matches, authentication successful
        res.json({
          success: true,
          userId: user._id,
          full_name: user.full_name,
        }); // Include userId in response
      } else {
        // Password does not match
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    } else {
      // User not found
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST route to create new login documents
app.post("/api/create", async (req, res) => {
  const { full_name, email, password, confirm_password } = req.body;

  try {
    // Create a new document using the Login model
    const newDocument = new Login({
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

// POST route for creating a new expense
app.post("/api/expenses", async (req, res) => {
  const { category, amount, user } = req.body;

  try {
    // Validate data (optional, can be improved)
    if (
      !category ||
      !amount ||
      typeof amount !== "number" ||
      amount < 0 ||
      !user
    ) {
      return res
        .status(400)
        .send("Invalid data: category, positive amount, and user ID required");
    }

    const newExpense = new Expense({ category, amount, user });
    const savedExpense = await newExpense.save();

    res.json(savedExpense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/api/expenses/:userId", async (req, res) => {
  const userId = req.params.userId; // Retrieve userId from query parameters

  try {
    let expenses;
    if (userId) {
      // If userId is provided, filter expenses based on userId
      expenses = await Expense.find({ user: userId });
    } else {
      // If userId is not provided, fetch all expenses
      expenses = await Expense.find();
    }
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET route for retrieving sum of all expenses
app.get("/api/expenses/sum/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log(userId);
    // Query expenses for the specified user ID
    const expenses = await Expense.find({ user: userId });

    // Calculate the sum of amounts
    const totalAmount = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    res.json({ totalAmount });
  } catch (error) {
    console.error("Error fetching total amount:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.post("/api/bank-accounts", async (req, res) => {
  try {
    // Extract data from the request body including user_id
    const { name, bankName, accountNumber, amount, accountType, user_id } =
      req.body;

    // Create a new bank account instance
    const newBankAccount = new BankAccount({
      name,
      bankName,
      accountNumber,
      amount,
      accountType,
      user: user_id, // Associate user_id with the bank account
    });

    // Save the new bank account to the database
    await newBankAccount.save();

    // Respond with the newly created bank account
    res.status(201).json(newBankAccount);
  } catch (error) {
    console.error("Error adding bank account:", error);
    res.status(500).send("Server Error");
  }
});

app.get("/api/bank-accounts/:userId", async (req, res) => {
  try {
    // Extract userId from route parameters
    const userId = req.params.userId;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).send("User ID is required");
    }

    // Find bank accounts associated with the provided userId
    const bankAccounts = await BankAccount.find({ user: userId });

    // Respond with the list of bank accounts
    res.json(bankAccounts);
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    res.status(500).send("Server Error");
  }
});

// GET method to fetch only amount
// Route to handle fetching the account balance for a specific user
// Assuming you have already defined your BankAccount model and set up your Express app

app.get("/api/bank-accounts/amount/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Query bank accounts for the specified user ID
    const userBankAccounts = await BankAccount.find({ user: userId });

    if (!userBankAccounts || userBankAccounts.length === 0) {
      return res
        .status(404)
        .json({ error: "No bank accounts found for the user" });
    }

    // Calculate the total balance across all bank accounts
    let totalBalance = 0;
    userBankAccounts.forEach((account) => {
      const amount = parseFloat(account.amount);
      if (isNaN(amount)) {
        console.error("Invalid amount:", account.amount);
      } else {
        totalBalance += amount;
      }
    });

    res.json({ accountBalance: totalBalance }); // Corrected the key name to match frontend
  } catch (error) {
    console.error("Error fetching account balance:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the Login model
export { Login };
