import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/Expense")
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB:", error);
  });

const expenseSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
});

const Collection = mongoose.model("Login", expenseSchema);

export { Collection };
