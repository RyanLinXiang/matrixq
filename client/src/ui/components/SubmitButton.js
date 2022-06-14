import React from "react";

const SubmitButton = ({ disabled, label, handleClick }) => (
  <div className="Button">
    <button onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  </div>
);

export default SubmitButton;
