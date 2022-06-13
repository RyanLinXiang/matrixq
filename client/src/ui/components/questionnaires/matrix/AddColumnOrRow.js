import React from "react";

const AddColumnOrRow = ({ handleClick }) => (
  <div onClick={handleClick}>
    <span className="AddColumnOrRow">+</span>
  </div>
);

export default AddColumnOrRow;
