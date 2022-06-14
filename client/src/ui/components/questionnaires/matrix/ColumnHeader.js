import React from "react";
import Input from "../../Input";
import AddColumnOrRow from "./AddColumnOrRow";
import DeleteColumnOrRow from "./DeleteColumnOrRow";
import { getRank } from "./helpers";
import InputUploadImage from "../../InputUploadImage";

const ColumnHeader = ({
  id,
  label,
  imagePath,
  handleEditColumnHeaderLabel,
  handleAddColumn,
  handleDeleteColumn,
  handleUploadFiles,
  columnRank,
  previousRank,
  nextRank
}) => (
  <td>
    <div className="Upload">
      <InputUploadImage
        id={id}
        imagePath={imagePath}
        handleChange={handleUploadFiles}
      />
    </div>
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
