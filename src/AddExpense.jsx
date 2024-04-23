// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./AddExpense.css"; // Assuming you have CSS styles for this component

// function AddExpense() {
//   const [category, setCategory] = useState("");
//   const [amount, setAmount] = useState(); // Set initial amount to 0
//   const navigate = useNavigate();

//   const handleHome = () => {
//     navigate("/Home");
//   };

//   const handleOptionChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const handleAmountChange = (event) => {
//     const enteredAmount = parseFloat(event.target.value); // Convert input to number
//     setAmount(isNaN(enteredAmount) ? 0 : enteredAmount); // Ensure valid number or 0
//   };

//   const handleSubmit = async () => {
//     if (!category || amount <= 0) {
//       alert("Please select a category and enter a positive amount.");
//       return; // Prevent sending request with invalid data
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/expenses", {
//         category,
//         amount,
//       });

//       console.log("Response data:", response.data);
//       // navigate("/Home");
//       setCategory("");
//       setAmount(0);
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong! Please try again."); // User-friendly error message
//     }
//   };

//   return (
//     <div className="total">
//       <h1> ADD EXPENSE </h1>
//       <br />
//       <select
//         name=""
//         className="selectopt"
//         value={category}
//         onChange={handleOptionChange}
//       >
//         <option>Select the Option</option>
//         <option value="Entertainment">Entertainment</option>
//         <option value="Education">Education</option>
//         <option value="Movie">Movie</option>
//         <option value="Food">Food</option>
//         <option value="Games">Games</option>
//         <option value="Rent">Rent</option>
//         <option value="Cab">Cab</option>
//         <option value="Other">Other</option>
//       </select>
//       <br />
//       <br />
//       <input
//         type="number"
//         className="fornum"
//         value={amount}
//         onChange={handleAmountChange}
//         placeholder="0123456789"
//       />
//       <br />
//       <br />
//       <br />
//       <div className="button-container">
//         <button className="button1" onClick={handleSubmit}>
//           Submit
//         </button>
//         <button className="button1" onClick={handleHome}>
//           Home
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddExpense;
////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddExpense.css"; // Assuming you have CSS styles for this component

function AddExpense() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(); // Set initial amount to 0
  const navigate = useNavigate();
  const [expenseCount, setExpenseCount] = useState(0);

  const handleHome = () => {
    navigate("/Home");
  };

  const handleOptionChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    const enteredAmount = parseFloat(event.target.value); // Convert input to number
    setAmount(isNaN(enteredAmount) ? 0 : enteredAmount); // Ensure valid number or 0
  };

  const handleSubmit = async () => {
    if (!category || amount <= 0) {
      alert("Please select a category and enter a positive amount.");
      return; // Prevent sending request with invalid data
    }

    try {
      // Get user id from session storage
      const user_id = JSON.parse(sessionStorage.getItem("user"))._id;
      // const userId = user._id;

      // Send request to create expense with user id
      const response = await axios.post(
        "https://dailyexpenses-b16357ac6f5b.herokuapp.com/api/expenses/:userId",
        {
          category,
          amount,
          user: user_id, // Include user id in the request
        }
      );

      console.log("Expense created:", response.data);
      setExpenseCount((prevCount) => prevCount + 1);
      // navigate("/Home");
      setCategory("");
      setAmount(0);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create expense. Please try again.");
    }
  };

  return (
    <div className="total">
      <h1 className="Head"> ADD EXPENSE </h1>
      <br />
      <select
        name=""
        className="selectopt"
        value={category}
        onChange={handleOptionChange}
      >
        <option>Select the Option</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Education">Education</option>
        <option value="Movie">Movie</option>
        <option value="Food">Food</option>
        <option value="Games">Games</option>
        <option value="Rent">Rent</option>
        <option value="Cab">Cab</option>
        <option value="Other">Other</option>
      </select>
      <br />
      <br />
      <input
        type="number"
        className="fornum"
        value={amount}
        onChange={handleAmountChange}
        placeholder="0123456789"
      />
      <br />
      <br />
      <br />
      <div className="button-container">
        <button className="button1" onClick={handleSubmit}>
          Submit
        </button>
        <button className="button1" onClick={handleHome}>
          Home
        </button>
      </div>
      {/* <p>Number of Expenses Added: {expenseCount}</p>{" "} */}
      {/* Display expense count */}
    </div>
  );
}

export default AddExpense;
