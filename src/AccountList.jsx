import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "axios";
import "./AccountList.css"; // Import your CSS file

function AccountList() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/Home");
  };

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        // Assuming you have the user's identifier stored in sessionStorage
        const user = JSON.parse(sessionStorage.getItem("user"));
        const userId = user._id;
        console.log(userId);
        const response = await axios.get(
          `https://dailyexpenses-b16357ac6f5b.herokuapp.com/api/bank-accounts/${userId}`
        );
        setBankAccounts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBankAccounts();
  }, []);

  return (
    <>
      <div className="bank-account-list">
        {loading && <p>Loading bank accounts...</p>}
        {error && <p>Error fetching bank accounts: {error.message}</p>}
        {!loading && !error && (
          <>
            <button className="Home" onClick={handleHome}>
              {" "}
              Home{" "}
            </button>
            {/* <div onClick={handleHome}>Home</div> */}
            <h2>Bank Accounts</h2>

            {bankAccounts.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Bank Name</th>
                    <th>Account Number</th>
                    <th>Amount</th>
                    <th>Account Type</th>
                  </tr>
                </thead>
                <tbody>
                  {bankAccounts.map((account) => (
                    <tr key={account._id}>
                      <td>{account.name}</td>
                      <td>{account.bankName}</td>
                      <td>{account.accountNumber}</td>
                      <td>{account.amount}</td>
                      <td>{account.accountType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No bank accounts found.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default AccountList;
