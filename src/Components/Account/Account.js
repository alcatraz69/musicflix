import React from "react";
import "./Account.css";
import usericon from "../../Assets/usericon.png";
import { useAuth } from "../../Store/AuthContext";
import { useHistory } from "react-router-dom";

const Account = () => {
  const { authState, authDispatch } = useAuth();
  const history = useHistory();
  function logOutHandler() {
    authDispatch({ type: "LOG_OUT_HANDLER" });
    history.push("/");
  }
  return (
    <div className="account">
      <h1 className="account_title">My Account</h1>

      <img className="usericon" src={usericon} alt="icon" />

      <p className="account_name">{authState.name}</p>
      <p className="account_email">{authState.email}</p>
      <button onClick={logOutHandler} className="btn btn-invert">
        LOG OUT
      </button>
    </div>
  );
};

export default Account;
