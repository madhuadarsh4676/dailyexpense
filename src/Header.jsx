import React from "react";
import "./Header.css";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  // Fetching full_name from session storage
  const userData = sessionStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const fullName = user ? user.full_name : null;

  return (
    <div className="header">
      <div>
        <h1 className="title">
          <b> Expense Tracker </b>
        </h1>
      </div>
      <div className="fullname">
        {fullName ? `Hello, ${fullName}` : "Hello"}
      </div>
    </div>
  );
}

export default Header;
