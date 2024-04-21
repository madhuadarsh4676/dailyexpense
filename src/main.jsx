import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import "./Create.css";

// const Create = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     email: "",
//     firstname: "",
//     lastname: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value }); // Changed e.target.id to e.target.name
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/api/userdetails", {
//         method: "POST", // Changed to uppercase
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit form");
//       }

//       // If the request was successful, you may want to perform additional actions, such as displaying a success message or redirecting the user.
//       const userData = await response.json();
//       const user = userData.user_id; // Assuming user ID is returned in the response
//       console.log(user);
//       console.log("Form submitted successfully");
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   return (
//     <body className="bodyclass">
//       <div>
//         <Form onSubmit={handleSubmit} className="formmain">
//           <h1 className="text-center mb-4">Expense Tracker</h1>
//           <input
//             type="text"
//             name="username" // Changed to name
//             placeholder="Enter username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password" // Changed to name
//             placeholder="Enter password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email" // Changed to name
//             placeholder="Enter email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="firstname" // Changed to name
//             placeholder="Enter firstname"
//             value={formData.firstname}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="lastname" // Changed to name
//             placeholder="Enter lastname"
//             value={formData.lastname}
//             onChange={handleChange}
//             required
//           />
//           <Button variant="primary" type="submit" className="w-100">
//             Submit
//           </Button>
//           <a href="Login" className="LoginLink">
//             Already have an account? Sign in
//           </a>
//         </Form>
//       </div>
//     </body>
//   );
// };

// export default Create;
