import React from "react";

const AddColumnOrRow = ({ handleClick }) => (
  <div className="AddColumnOrRow" onClick={handleClick}>
    <span className="AddColumnOrRow-Label">+</span>
  </div>
);

export default AddColumnOrRow;
