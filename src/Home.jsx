import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Dashboard from "./Dashboard";
import Chart from "./Echart";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { email } = useParams();
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
  const [refresh, setRefresh] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(`/api/users/${email}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    }
  };

  const location = useLocation();

  return (
    <>
      <Dashboard />
      <Chart />
      <header>
        {/* Hamburger button */}
        <button
          onClick={toggleMenu}
          className={`hamburger-btn ${isMenuOpen ? "open" : ""}`}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </header>
      {/* Side menu */}
      <aside className={isMenuOpen ? "menu-open" : ""}>
        <nav className="navname">
          <br />
          <br />
          <br />
          <ul className="ulname">
            <li className="listname">
              <Link to="/Home">Home</Link>
            </li>
            <li className="listname">
              <Link to="/About">About</Link>
            </li>
            <li className="listname">
              <Link to="/AddExpense">Add Expense</Link>
            </li>
            <li className="listname">
              <Link to="/ExpenseList">View All Expense</Link>
            </li>
            <li className="listname">
              <Link to="/AddAccount">Add Account</Link>
            </li>
            <li className="listname">
              <Link to="/AccountList">View All Accounts</Link>
            </li>
            {/* <li className="listname">
              <Link to="/TotalExpense">Total Expense</Link>
            </li> */}
            <li className="listname">
              <Link to="/Contact">Contact</Link>
            </li>

            {/* <li onClick={handleClick}>Add Expense</li> */}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Home;
