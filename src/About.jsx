import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css"; // Import your CSS file for styling

function About() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/Home");
  };
  return (
    <div className="about-container">
      <h2>About Expense Tracker</h2>
      <p>
        Welcome to Expense Tracker, your personal finance management tool built
        with ReactJS. Our mission is to help you take control of your finances
        and achieve your financial goals with ease.
      </p>
      <p>
        At Expense Tracker, we understand the importance of managing your
        expenses efficiently. Whether you're tracking your monthly budget,
        monitoring your spending habits, or planning for future expenses, our
        user-friendly interface makes it simple to stay organized and in
        control.
      </p>
      <p>
        Our application allows you to effortlessly record your income and
        expenses, categorize transactions, set budgets, and generate insightful
        reports. With real-time updates and intuitive features, you'll have
        everything you need to make informed financial decisions.
      </p>
      <p>
        Our team is dedicated to providing you with a seamless and reliable
        experience. We are committed to continually improving our application
        and implementing user feedback to ensure that Expense Tracker meets your
        needs and exceeds your expectations.
      </p>
      <p>
        Thank you for choosing Expense Tracker to manage your finances. Start
        tracking your expenses today and take control of your financial future!
      </p>

      <button className="buttonHome" onClick={handleHome}>
        Home
      </button>
    </div>
  );
}

export default About;
