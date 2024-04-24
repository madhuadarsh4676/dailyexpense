// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./AddAccount.css"; // Import your CSS file

// function AddAccount() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     bankName: "",
//     accountNumber: "",
//     amount: "", // Corrected from "Amount" to "amount"
//     accountType: "debit",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/bank-accounts",
//         formData
//       );
//       console.log("Bank account linked successfully:", response.data);
//       setFormData({
//         // Reset form data on success
//         name: "",
//         bankName: "",
//         accountNumber: "",
//         amount: "",
//         accountType: "debit",
//       });
//       navigate("/Home"); // Redirect to Home after successful submission
//     } catch (error) {
//       console.error("Error linking bank account:", error);
//       // Handle errors here, e.g., display an error message to the user
//     }
//   };

//   const handleHome = () => {
//     navigate("/Home");
//   };

//   return (
//     <form className="bank-form" onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </label>

//       <label>
//         Bank Name:
//         <input
//           type="text"
//           name="bankName"
//           value={formData.bankName}
//           onChange={handleChange}
//           required
//         />
//       </label>
//       <label>
//         Account Number:
//         <input
//           type="text"
//           name="accountNumber"
//           value={formData.accountNumber}
//           onChange={handleChange}
//           required
//         />
//       </label>
//       <label>
//         Amount:
//         <input
//           type="text"
//           name="amount" // Corrected from Amount to amount
//           value={formData.amount} // Corrected from Amount to amount
//           onChange={handleChange}
//           required
//         />
//       </label>
//       <label>
//         Account Type:
//         <select
//           name="accountType"
//           value={formData.accountType}
//           onChange={handleChange}
//         >
//           <option value="debit">Debit</option>
//           <option value="credit">Credit</option>
//         </select>
//       </label>
//       <button type="submit">Link Bank Account</button>
//       <button type="button" onClick={handleHome}>
//         HOME
//       </button>
//     </form>
//   );
// }

// export default AddAccount;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddAccount.css"; // Import your CSS file

function AddAccount() {
  const navigate = useNavigate();

  const initialFormData = {
    name: "",
    bankName: "",
    accountNumber: "",
    amount: "",
    accountType: "debit",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, bankName, accountNumber, amount, accountType } = formData;
      const user_id = JSON.parse(sessionStorage.getItem("user"))._id;
      const res = await axios.post(
        "https://dailyexpenses-b16357ac6f5b.herokuapp.com/api/bank-accounts",
        {
          name,
          bankName,
          accountNumber,
          amount,
          accountType,
          user_id,
        }
      );
      console.log("New bank account:", res.data);
      // Reset form after successful submission
      setFormData(initialFormData);
      // Handle success
    } catch (error) {
      console.error("Error creating bank account:", error);
      // Handle error
    }
  };

  const handleHome = () => {
    navigate("/Home");
  };

  return (
    <form className="bank-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Bank Name:
        <input
          type="text"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Account Number:
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Amount:
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Account Type:
        <select
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
        >
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
      </label>
      <button type="submit">Link Bank Account</button>
      <button type="button" onClick={handleHome}>
        HOME
      </button>
    </form>
  );
}

export default AddAccount;
