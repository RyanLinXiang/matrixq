import React from "react";

const Input = ({ id, label, handleChange }) => (
  <div className="Input">
    <input
      value={label}
      onChange={(event) => {
        handleChange(event.target.value, id);
      }}
    />
  </div>
);

export default Input;
