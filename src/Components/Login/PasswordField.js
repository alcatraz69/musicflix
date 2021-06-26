import React, { useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordField = ({ name, value, onChangeHandler, placeholderText }) => {
  const [passToggle, setPassToggle] = useState(false);
  const handlePassToggle = () => {
    setPassToggle((prevState) => !prevState);
  };
  return (
    <div className="pass-wrapper">
      <input
        name={name}
        value={value}
        type={passToggle ? "text" : "password"}
        placeholder={placeholderText}
        onChange={onChangeHandler}
      />
      <i onClick={handlePassToggle}>
        {passToggle ? <FaEyeSlash /> : <FaEye />}
      </i>
    </div>
  );
};

export default PasswordField;
