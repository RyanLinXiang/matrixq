import React from "react";

const DeleteColumnOrRow = ({ handleClick }) => (
  <div className="DeleteColumnOrRow" onClick={handleClick}>
    <span className="DeleteColumnOrRow-Label">-</span>
  </div>
);

export default DeleteColumnOrRow;
