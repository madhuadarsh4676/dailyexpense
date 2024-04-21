import React from "react";
import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <MainContent />
    </div>
  );
}

export default Dashboard;
