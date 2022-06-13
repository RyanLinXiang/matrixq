import React from "react";
import Input from "../../Input";
import AddColumnOrRow from "./AddColumnOrRow";
import { getRank } from "./helpers";

const ColumnHeader = ({
  id,
  label,
  handleEditColumnHeaderLabel,
  handleAddColumn,
  previousRank,
  nextRank
}) => (
  <div>
    <div className="MatrixAnswers-ColumnHeader">
      <Input id={id} label={label} handleChange={handleEditColumnHeaderLabel} />
    </div>
    <AddColumnOrRow
      handleClick={() =>
        handleAddColumn(
          getRank({
            previousRank,
            nextRank
          })
        )
      }
    />
  </div>
);

export default ColumnHeader;
