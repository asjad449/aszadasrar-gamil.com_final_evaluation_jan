import React, { useState } from "react";
import styles from "./login.module.css";
import { loginSuccess } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import newRequest from "../../utils/newRequest";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState({
    emailErr: "",
    passwordErr: "",
  });

  const [errorResponse, setErrorResponse] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const error = {};
    setError(error);

    setErrorResponse("");

    if (!email) {
      error.emailErr = "Email is required!";
    }

    if (!password) {
      error.passwordErr = "Password is required!";
      return;
    }

    try {
      // dispatch(loginStart());
      const res = await newRequest.post("auth/login", {
        email,
        password,
      });

      // console.log(res.data);
      dispatch(loginSuccess(res.data));
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      // console.log(error);
      setErrorResponse(error?.response?.data?.message);
      // dispatch(loginFailure());
    }
  };

  // console.log(errorResponse);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={loginUser}>
        <div className={styles.form_input}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder={error.emailErr ? error.emailErr : "email"}
            name="email"
            autoComplete="off"
            className={styles.inputField}
            onChange={(e) => setEmail(e.target.value)}
            style={{ border: error.emailErr && "1px solid red" }}
          />
          <p className={styles.error}>{error.emailErr}</p>
        </div>

        <div className={styles.form_input}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder={error.passwordErr ? error.passwordErr : "password"}
            name="password"
            autoComplete="off"
            className={styles.inputField}
            onChange={(e) => setPassword(e.target.value)}
            style={{ border: error.passwordErr && "1px solid red" }}
          />
          <p className={styles.error}>{error.passwordErr}</p>
        </div>

        <div style={{ textAlign: "center", fontSize: "14px", color: "red" }}>
          {errorResponse}
        </div>

        <div className={styles.loginBtnDiv}>
          <button type="submit" className={styles.btn}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
