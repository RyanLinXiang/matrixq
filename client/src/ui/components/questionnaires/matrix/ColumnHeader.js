import React from "react";
import Input from "../../Input";
import AddColumnOrRow from "./AddColumnOrRow";
import DeleteColumnOrRow from "./DeleteColumnOrRow";
import { getRank } from "./helpers";

const ColumnHeader = ({
  id,
  label,
  handleEditColumnHeaderLabel,
  handleAddColumn,
  handleDeleteColumn,
  columnRank,
  previousRank,
  nextRank
}) => (
  <td>
    <div className="MatrixAnswers-ColumnHeader">
      <Input id={id} label={label} handleChange={handleEditColumnHeaderLabel} />
      <DeleteColumnOrRow handleClick={() => handleDeleteColumn(columnRank)} />
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
  </td>
);

export default ColumnHeader;
