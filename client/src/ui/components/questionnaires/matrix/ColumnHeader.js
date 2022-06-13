import React from "react";
import Input from "../../Input";

const ColumnHeader = ({ id, label, handleEditColumnHeaderLabel }) => (
  <div className="MatrixAnswers-ColumnHeader">
    <Input id={id} label={label} handleChange={handleEditColumnHeaderLabel} />
  </div>
);

export default ColumnHeader;
