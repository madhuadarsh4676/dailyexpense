// // import React, { useState, useEffect } from "react";
// // import "./MainContent.css";

// // function MainContent() {
// //   const [totalAmount, setTotalAmount] = useState(0); // State for total expenses
// //   const [accountBalance, setAccountBalance] = useState(0); // State for account balance

// //   useEffect(() => {
// //     const fetchTotalAmount = async () => {
// //       try {
// //         const response = await fetch("http://localhost:5000/api/expenses/sum"); // Fetch total expenses
// //         const data = await response.json();
// //         console.log("Expenses Response:", data);
// //         setTotalAmount(data.totalAmount);
// //       } catch (error) {
// //         console.error("Error fetching total amount:", error);
// //       }
// //     };

// //     const fetchAccountBalance = async () => {
// //       try {
// //         const response = await fetch(
// //           "http://localhost:5000/api/bank-accounts/amount"
// //         ); // Fetch account balance
// //         const data = await response.json();
// //         console.log("Account Balance Response:", data);
// //         setAccountBalance(data.total); // Update state with total balance
// //       } catch (error) {
// //         console.error("Error fetching account balance:", error);
// //       }
// //     };

// //     fetchTotalAmount();
// //     fetchAccountBalance(); // Call both functions in useEffect
// //   }, []);

// //   return (
// //     <main className="main-content">
// //       <div className="readonly-box">
// //         Monthly Expenses: <br />
// //         <h2 className="totalamount">{totalAmount}</h2>
// //       </div>
// //       <div className="readonly-box">
// //         Account Balance: <br />
// //         <h2 className="totalamount">{accountBalance}</h2>{" "}
// //         {/* Display account balance */}
// //       </div>
// //       <div className="readonly-box">Savings</div>
// //       <br />
// //       <div className="readonly-box">Your Balance</div>
// //     </main>
// //   );
// // }

// // export default MainContent;
// import React, { useState, useEffect } from "react";
// import "./MainContent.css";

// function MainContent() {
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [accountBalance, setAccountBalance] = useState(0);
//   const [savings, setSavings] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const totalAmountResponse = fetch(
//           "http://localhost:5000/api/expenses/sum"
//         );
//         const accountBalanceResponse = fetch(
//           "http://localhost:5000/api/bank-accounts/amount"
//         );

//         const [totalAmountRes, accountBalanceRes] = await Promise.all([
//           totalAmountResponse,
//           accountBalanceResponse,
//         ]);

//         const totalAmountData = await totalAmountRes.json();
//         const accountBalanceData = await accountBalanceRes.json();

//         setTotalAmount(totalAmountData.totalAmount);
//         setAccountBalance(accountBalanceData.total);
//         setSavings(accountBalanceData.total - totalAmountData.totalAmount);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false); // Set loading to false regardless of success or failure
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <main className="main-content">
//       {isLoading ? (
//         <p>Loading data...</p>
//       ) : (
//         <>
//           <div className="readonly-box">
//             Account Balance: <br />
//             {accountBalance > 0 ? (
//               <h2 className="totalamount">{accountBalance}</h2>
//             ) : (
//               <p>Loading account balance...</p>
//             )}
//           </div>
//           <div className="readonly-box">
//             Monthly Expenses: <br />
//             {totalAmount > 0 ? (
//               <h2 className="totalamount">{totalAmount}</h2>
//             ) : (
//               <p>Loading expenses...</p>
//             )}
//           </div>

//           <div className="readonly-box">Savings</div>
//           <br />
//           <div className="readonly-box">
//             Your Balance: <br />
//             {/* savings should always be greater than 0 if calculations are correct */}
//             <h2 className="totalamount">{savings}</h2>
//           </div>
//         </>
//       )}
//     </main>
//   );
// }

// export default MainContent;

import React, { useState, useEffect } from "react";
import "./MainContent.css";

function MainContent({ expenseCount }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [savings, setSavings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve user ID from session storage
        const userData = JSON.parse(sessionStorage.getItem("user"));
        if (!userData || !userData._id) {
          console.error("User ID not found in session storage");
          return;
        }
        const user_id = userData._id;

        // Fetch total expenses based on user ID
        const totalAmountResponse = fetch(
          `https://dailyexpenses-b16357ac6f5b.herokuapp.com/api/expenses/sum/${user_id}`
        );

        // Fetch account balance based on user ID
        const accountBalanceResponse = fetch(
          `https://dailyexpenses-b16357ac6f5b.herokuapp.com/api/bank-accounts/amount/${user_id}`
        );

        const [totalAmountRes, accountBalanceRes] = await Promise.all([
          totalAmountResponse,
          accountBalanceResponse,
        ]);

        const totalAmountData = await totalAmountRes.json();
        const accountBalanceData = await accountBalanceRes.json();
        console.log(accountBalanceData);
        setTotalAmount(totalAmountData.totalAmount);
        setAccountBalance(accountBalanceData.accountBalance); // Corrected variable name
        setSavings(
          accountBalanceData.accountBalance - totalAmountData.totalAmount
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  return (
    <main className="main-content">
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div className="readonly-box">
            Account Balance: <br />
            {accountBalance > 0 ? (
              <h2 className="totalamount">{accountBalance}</h2>
            ) : (
              <p>Loading account balance...</p>
            )}
          </div>
          <div className="readonly-box">
            Monthly Expenses: <br />
            {totalAmount > 0 ? (
              <h2 className="totalamount">{totalAmount}</h2>
            ) : (
              <p>Loading expenses...</p>
            )}
          </div>
          <div className="readonly-box">Savings</div>
          {/* Your Expenses Count: <br /> */}
          {/* <h2 className="totalamount">{expenseCount}</h2> */}
          <br />
          <div className="readonly-box">
            Your Balance: <br />
            {/* savings should always be greater than 0 if calculations are correct */}
            <h2 className="totalamount">{savings}</h2>
          </div>
        </>
      )}
    </main>
  );
}

export default MainContent;
