import React, { useState, useContext } from "react";
import { nameContext } from "../../nameContext/nameContext";
import "./name.css";
import { useNavigate } from "react-router-dom";

const Name = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { value, setValue } = useContext(nameContext);
  return (
    <div className="main-div">
      <h1 className="title">Kindly Enter your name here</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setValue(name);
          navigate("/chat");
          localStorage.setItem("name", name);
        }}
      >
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value.toLowerCase());
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Name;
