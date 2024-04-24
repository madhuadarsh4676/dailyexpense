// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "./CreateAc.css";

// function CreateAc() {
//   const navigate = useNavigate();
//   const [full_name, setFull_name] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm_password, setConfirm_password] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   async function submit(e) {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/create", {
//         full_name,
//         email,
//         password,
//         confirm_password,
//       });

//       if (
//         res.status === 201 &&
//         res.data.message === "Document created successfully"
//       ) {
//         navigate("/Home", { state: { id: full_name, email } });
//       } else if (res.status === 500) {
//         setErrorMessage("Failed to create account. Please try again.");
//       } else {
//         setErrorMessage(res.data.message || "Unknown error occurred.");
//       }
//       const userData = await res.json();
//       const { email, password } = userData; // Extract user_id and username from response
//       console.log(userData);
//       // Store user_id and username in session storage
//       sessionStorage.setItem("user", JSON.stringify({ email, password }));
//     } catch (error) {
//       console.error("Error:", error);
//       setErrorMessage("Failed to create account. Please try again.");
//     }
//   }
//   return (
//     <div className="bodyname">
//       <div className="divname">
//         <h1 className="loginname">Create Account</h1>
//         <form onSubmit={submit}>
//           <input
//             type="text"
//             value={full_name}
//             onChange={(e) => setFull_name(e.target.value)}
//             placeholder="Full Name"
//             required
//           />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//           />
//           <input
//             type="password"
//             value={confirm_password}
//             onChange={(e) => setConfirm_password(e.target.value)}
//             placeholder="Confirm Password"
//             required
//           />
//           <button type="submit" className="Submit">
//             Submit
//           </button>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//         </form>
//         <br />
//         <p>OR</p>
//         <Link to="/">Login Page</Link>
//       </div>
//     </div>
//   );
// }

// export default CreateAc;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./CreateAc.css";

function CreateAc() {
  const navigate = useNavigate();
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://dailyexpenses-b16357ac6f5b.herokuapp.com/api/create",
        {
          full_name,
          email,
          password,
          confirm_password,
        }
      );

      if (
        res.status === 201 &&
        res.data.message === "Document created successfully"
      ) {
        // Extract _id from the response data
        const { _id } = res.data.data;
        console.log(_id);
        // Log email and password to verify data
        console.log("Email:", email);
        console.log("Password:", password);

        // Store email, password, and _id in session storage
        sessionStorage.setItem(
          "user",
          JSON.stringify({ _id, email, password, full_name })
        );

        // Check sessionStorage to see if data is stored
        console.log("Stored data:", sessionStorage.getItem("user"));

        navigate("/Home", { state: { id: full_name, email, full_name } });
      } else if (res.status === 500) {
        setErrorMessage("Failed to create account. Please try again.");
      } else {
        setErrorMessage(res.data.message || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to create account. Please try again.");
    }
  }

  return (
    <div className="bodyname">
      <div className="divname">
        <h1 className="loginname">Create Account</h1>
        <form onSubmit={submit}>
          <input
            type="text"
            value={full_name}
            onChange={(e) => setFull_name(e.target.value)}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit" className="Submit">
            Submit
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <br />
        <p>OR</p>
        <Link to="/">Login Page</Link>
      </div>
    </div>
  );
}

export default CreateAc;
