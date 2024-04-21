import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import CreateAc from "./CreateAc.jsx";
import Home from "./Home.jsx";
import AddExpense from "./AddExpense.jsx";
import Header from "./Header.jsx";
import AddAccount from "./AddAccount.jsx";
import About from "./About.jsx";
import TotalExpense from "./TotalExpense.jsx";
import Contact from "./Contact.jsx";
import Chart from "./Echart.jsx";
import ExpenseList from "./ExpenseList.jsx";
import AccountList from "./AccountList.jsx";

function App() {
  return (
    <Router>
      <div className="Appmain">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/CreateAc" element={<CreateAc />} />
          <Route path="/Home" element={<Home />} />
          {/* <Route path="/Home/:email" element={<Home />} /> */}
          <Route path="/Header" element={<Header />} />
          <Route path="/AddExpense" element={<AddExpense />} />
          <Route path="/AddAccount" element={<AddAccount />} />
          <Route path="/About" element={<About />} />
          <Route path="/TotalExpense" element={<TotalExpense />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Chart" element={<Chart />} />
          <Route path="/ExpenseList" element={<ExpenseList />} />
          <Route path="/AccountList" element={<AccountList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
