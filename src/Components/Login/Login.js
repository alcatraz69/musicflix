import React, { useState } from "react";
import "./Login.css";
import { register, login } from "../../Api/index";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../Store/AuthContext";

const Login = () => {
  const { authDispatch } = useAuth();
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
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

      console.log(user.data.result);
      console.log(user.data.token);

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
            <input
              name="password"
              value={userData.password}
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              name="cpassword"
              value={userData.cpassword}
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
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
            <input
              name="password"
              value={userData.password}
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {errorMsg ? (
              <p style={{ color: "red" }}>Invalid Credentials</p>
            ) : (
              ""
            )}
            <button onClick={handleClick}>login</button>
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
