import React, { useState } from "react";
import "./Login.css";
import { register, login } from "../../Api/index";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../Store/AuthContext";
import PasswordField from "./PasswordField";
import { Loader } from "../Loader/Loader";

const Login = () => {
  const { authDispatch } = useAuth();
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleToggle = () => {
    setToggle((prevState) => !prevState);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = userData;
    setIsLoading(true);
    try {
      let user;
      if (toggle) {
        user = await register({
          name,
          email,
          password,
          cpassword,
        });
      } else {
        console.log("here");
        user = await login({
          email,
          password,
        });
      }

      if (user.status === 200) {
        toggle
          ? authDispatch({
              type: "SAVE_REGISTER_DETAILS",
              payload: { user: user.data.result, token: user.data.token },
            })
          : authDispatch({
              type: "SAVE_LOGIN_DETAILS",
              payload: { user: user.data.result, token: user.data.token },
            });

        history.push("/");
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(true);
    }
    setIsLoading(false);
  };
  return (
    <div className="login-page">
      <div className="form">
        <h1 style={{ color: "#fff", fontWeight: "300" }}>
          {toggle ? "Register" : "Login"}
        </h1>
        {toggle ? (
          <form className="register-form">
            <input
              name="name"
              value={userData.name}
              type="text"
              placeholder="Name"
              onChange={handleChange}
            />
            <input
              name="email"
              value={userData.email}
              type="text"
              placeholder="Email address"
              onChange={handleChange}
            />
            <PasswordField
              name="password"
              value={userData.password}
              onChangeHandler={handleChange}
              placeholderText="Password"
            />
            <PasswordField
              name="cpassword"
              value={userData.cpassword}
              onChangeHandler={handleChange}
              placeholderText="Confirm Password"
            />
            <button onClick={handleClick}>create</button>
            <p className="message">
              Already registered? <span onClick={handleToggle}>Sign In</span>
            </p>
          </form>
        ) : (
          <form className="login-form">
            <input
              name="email"
              value={userData.email}
              type="text"
              placeholder="Email"
              onChange={handleChange}
            />
            <PasswordField
              name="password"
              value={userData.password}
              onChangeHandler={handleChange}
              placeholderText="Password"
            />
            {errorMsg ? (
              <p style={{ color: "red" }}>Invalid Credentials!</p>
            ) : (
              ""
            )}
            <button onClick={handleClick}>
              {isLoading ? <Loader /> : "Login"}
            </button>
            <p className="message">
              Not registered?{" "}
              <span onClick={handleToggle}>Create an account</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
