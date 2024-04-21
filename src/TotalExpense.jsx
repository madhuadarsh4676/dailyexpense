import React, { useState } from "react";
import AddExpense from "./AddExpense";
import AddAccount from "./AddAccount";
import "./TotalExpense.css";

function TotalExpense() {
  const [expense, setExpense] = useState(0); // Expense amount
  const [accountBalance, setAccountBalance] = useState(0); // Account balance

  const handleAddExpense = (amount) => {
    setExpense(amount);
  };

  const handleAddAccount = (formData) => {
    // Assuming the account balance is provided in formData
    setAccountBalance(formData.accountNumber); // Set account balance
  };

  const totalExpense = accountBalance - expense; // Calculate total expense

  return (
    <div>
      <h2>Total Expense: {totalExpense}</h2>
      <AddExpense onAddExpense={handleAddExpense} />
      <AddAccount onAddAccount={handleAddAccount} />
    </div>
  );
}

export default TotalExpense;
