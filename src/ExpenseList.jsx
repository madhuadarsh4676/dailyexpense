import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ExpenseList.css";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/Home");
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // Assuming you have the user's identifier stored in sessionStorage
        const user = JSON.parse(sessionStorage.getItem("user"));
        console.log(user._id);
        const response = await fetch(
          `https://dailyexpenses-b16357ac6f5b.herokuapp.com/api/expenses/${user._id}`
        );
        const data = await response.json();
        console.log(data);
        setExpenses(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h1>Expense List</h1>
      <div className="ListHome" onClick={handleHome}>
        Home
      </div>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
              <td>{new Date(expense.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
