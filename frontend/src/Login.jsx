import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import validation from "./Loginvalidation";

import './Login.css';

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);

        if (!validationErrors.email && !validationErrors.password) {
            try {
                const res = await axios.post("http://localhost:8081/login", values);
                console.log("res.data:", res.data);

                if (res.data.status === "success") {
                    // เก็บ token ใน localStorage
                    localStorage.setItem("token", res.data.token);
                    
                    Swal.fire({
                        html: "Welcome",
                        icon: "success",
                    }).then(() => {
                        navigate("/");
                    });
                } else {
                    Swal.fire({
                        html: res.data.message || "Invalid login credentials",
                        icon: "error",
                    });
                }
            } catch (error) {
                console.error("Login error:", error);
                Swal.fire({
                    html: "Server error. Please try again later.",
                    icon: "error",
                });
            }
        }
    };

    return (
        <div className="disply"> 
        <div className="login-container">
            <div className="login-form bg-white p-4 rounded shadow-sm w-100">
                <h1>Form Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-position">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            value={values.email}
                        />
                        <span className="text-danger">{errors.email}</span>
                    </div>

                    <div className="mb-3 text-position">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            value={values.password}
                        />
                        <span className="text-danger">{errors.password}</span>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>

                    <p className="text-center mt-3">Don't have an account?</p>
                    <Link
                        to="/signup"
                        className="btn btn-outline-secondary w-100 text-decoration-none text-center"
                    >
                        Signup
                    </Link>
                </form>
            </div>
        </div>
    </div>
    );
}

export default Login;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";
// import validation from "./Loginvalidation";

// function Login() {
//     const [values, setValues] = useState({
//         email: "",
//         password: "",
//     });

//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const validationErrors = validation(values);
//         setErrors(validationErrors);

//         if (!validationErrors.email && !validationErrors.password) {
//             axios
//                 .post("http://localhost:8081/login", values)
//                 .then((res) => {
//                     if (res.data === "Success") {
//                         Swal.fire({
//                             html: "Welcome",
//                             icon: "success",
//                         }).then(() => {
//                             navigate("/");
//                         });
//                         console.log("res.data",res.data);
//                     } else {
//                         Swal.fire({
//                             html: "Invalid login credentials",
//                             icon: "error",
//                         });
//                     }
//                 })
//                 .catch((err) => console.log(err));
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="login-form bg-white p-4 rounded shadow-sm w-100">
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             onChange={(e) => setValues({ ...values, email: e.target.value })}
//                             value={values.email}
//                         />
//                         <span className="text-danger">{errors.email}</span>
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="password">Password:</label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             onChange={(e) => setValues({ ...values, password: e.target.value })}
//                             value={values.password}
//                         />
//                         <span className="text-danger">{errors.password}</span>
//                     </div>

//                     <button type="submit" className="btn btn-primary w-100">
//                         Login
//                     </button>

//                     <p className="text-center mt-3">Don't have an account?</p>
//                     <Link
//                         to="/signup"
//                         className="btn btn-outline-secondary w-100 text-decoration-none text-center"
//                     >
//                         Signup
//                     </Link>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;
