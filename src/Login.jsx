// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const history = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       await axios
//         .post("http://localhost:5000/login", {
//           // full_name,
//           email,
//           password,
//         })
//         .then((res) => {
//           console.log("Response data:", res.data);
//           if (res.data == "success") {
//             history(`/Home`);
//           } else if (res.data == "notexist") {
//             // alert("User have not Created Account");
//             setErrorMessage("User have not Created Account");
//           }
//         })
//         .catch((e) => {
//           // alert("Wrong Details");
//           setErrorMessage("Wrong Details");

//           console.log(e);
//         });
//     } catch (e) {
//       console.log(e);
//       setErrorMessage("Failed to Login. Please try again.");
//     }
//   }

//   return (
//     <>
//       <div className="bodyname">
//         <div className="divname">
//           {/* < className="mainclass"> */}
//           <h1 className="loginname"> Login </h1>
//           <br />
//           <br />

//           <form action="POST" className="loginform">
//             <input
//               type="email"
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//               placeholder="Email"
//             />
//             <input
//               type="password"
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//               placeholder="Password"
//             />
//             <input type="submit" className="Submit" onClick={submit} />
//             {errorMessage && <p className="error-messagee">{errorMessage}</p>}
//           </form>
//           <br />
//           <p> OR </p>
//           <Link to="/CreateAc">Create Account</Link>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const history = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/login", {
//         email,
//         password,
//       });

//       if (res.data === "success") {
//         // Fetch full_name after successful login
//         // const response = await axios.get(
//         //   `http://localhost:5000/getFullName/${email}`
//         // );
//         // const fullName = response.data.fullName;

//         // Navigate to Home with full_name
//         history(`/Home`, { state: { full_name: fullName } });
//       } else if (res.data === "notexist") {
//         setErrorMessage("User has not created an account.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setErrorMessage("Failed to login. Please try again.");
//     }
//   }

//   return (
//     <>
//       <div className="bodyname">
//         <div className="divname">
//           <h1 className="loginname"> Login </h1>
//           <br />
//           <br />

//           <form onSubmit={submit} className="loginform">
//             <input
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               required
//             />
//             <input
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               required
//             />
//             <button type="submit" className="Submit">
//               Login
//             </button>
//             {errorMessage && <p className="error-messagee">{errorMessage}</p>}
//           </form>
//           <br />
//           <p> OR </p>
//           <Link to="/CreateAc">Create Account</Link>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log("Response data:", response.data);

      const { success, userId, full_name } = response.data; // Destructure response data

      if (success) {
        // Check if success field is true
        // Store user data in session storage
        sessionStorage.setItem(
          "user",
          JSON.stringify({ _id: userId, email, full_name })
        ); // Store _id and email in session storage
        history(`/Home`);
      } else {
        setErrorMessage("Wrong email or password."); // Display error message
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to login. Please try again."); // Display error message
    }
  }

  return (
    <>
      <div className="bodyname">
        <div className="divname">
          <h1 className="loginname"> Login </h1>
          <br />
          <br />

          <form onSubmit={submit} className="loginform">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit" className="Submit">
              Login
            </button>
            {errorMessage && <p className="error-messagee">{errorMessage}</p>}
          </form>
          <br />
          <p> OR </p>
          <Link to="/CreateAc">Create Account</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
