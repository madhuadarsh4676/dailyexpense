import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("dist"));
// }

// HTTP request logger
// app.use(morgan("tiny"));
// app.use("/api", routes);

// Connect to MongoDB
// const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/Expense";
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://madhuadarsh4676:Passcode%401998@cluster0.pztnyqt.mongodb.net/Expense?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB:", error);
  });

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
// app.get("/", (req, res) => {
//   res.send("Welcome to the Daily Expenses API");
// });

// POST route for login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Login.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        res.json({
          success: true,
          userId: user._id,
          full_name: user.full_name,
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    } else {
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
    const newDocument = new Login({
      full_name,
      email,
      password,
      confirm_password,
    });

    await newDocument.save();

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
  const userId = req.params.userId;

  try {
    let expenses;
    if (userId) {
      expenses = await Expense.find({ user: userId });
    } else {
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
    const expenses = await Expense.find({ user: userId });

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
    const { name, bankName, accountNumber, amount, accountType, user_id } =
      req.body;

    const newBankAccount = new BankAccount({
      name,
      bankName,
      accountNumber,
      amount,
      accountType,
      user: user_id,
    });

    await newBankAccount.save();

    res.status(201).json(newBankAccount);
  } catch (error) {
    console.error("Error adding bank account:", error);
    res.status(500).send("Server Error");
  }
});

app.get("/api/bank-accounts/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).send("User ID is required");
    }

    const bankAccounts = await BankAccount.find({ user: userId });

    res.json(bankAccounts);
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    res.status(500).send("Server Error");
  }
});

// GET method to fetch only amount
app.get("/api/bank-accounts/amount/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userBankAccounts = await BankAccount.find({ user: userId });

    if (!userBankAccounts || userBankAccounts.length === 0) {
      return res
        .status(404)
        .json({ error: "No bank accounts found for the user" });
    }

    let totalBalance = 0;
    userBankAccounts.forEach((account) => {
      const amount = parseFloat(account.amount);
      if (isNaN(amount)) {
        console.error("Invalid amount:", account.amount);
      } else {
        totalBalance += amount;
      }
    });

    res.json({ accountBalance: totalBalance });
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
