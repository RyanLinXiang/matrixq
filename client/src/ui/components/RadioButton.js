import React from "react";

const RadioButton = ({ id, isChecked, handleChange }) => (
  <div className="RadioButton">
    <input
      type="radio"
      checked={isChecked}
      onChange={() => handleChange(id)}
    />
  </div>
);

export default RadioButton;
