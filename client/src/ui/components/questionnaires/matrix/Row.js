import React from "react";
import RadioButton from "../../RadioButton";
import Input from "../../Input";
import AddColumnOrRow from "./AddColumnOrRow";
import { getRank } from "./helpers";
import DeleteColumnOrRow from "./DeleteColumnOrRow";
import InputUploadImage from "../../InputUploadImage";

const Row = ({
  id,
  label,
  answers,
  handleChangeAnswer,
  handleEditRowHeaderLabel,
  handleAddRow,
  handleDeleteRow,
  handleUploadFiles,
  imagePath,
  rowRank,
  previousRank,
  nextRank
}) => (
  <tr className="MatrixAnswers-Row">
    <td>
      <div className="MatrixAnswers-RowHeader">
        <div className="Upload">
          <InputUploadImage
            id={id}
            imagePath={imagePath}
            handleChange={handleUploadFiles}
          />
        </div>
        <div>
          <div className="MatrixAnswers-RowLabel">
            <Input
              id={id}
              label={label}
              handleChange={handleEditRowHeaderLabel}
            />
          </div>
          <div className="MatrixAnswers-RowTools">
            <DeleteColumnOrRow handleClick={() => handleDeleteRow(rowRank)} />
            <AddColumnOrRow
              handleClick={() =>
                handleAddRow(
                  getRank({
                    previousRank,
                    nextRank
                  })
                )
              }
            />
          </div>
        </div>
      </div>
    </td>

    {answers.map((answer) => (
      <td key={answer._id} className="MatrixAnswers-Option">
        <RadioButton
          id={answer._id}
          isChecked={answer.isChecked}
          handleChange={handleChangeAnswer}
        />
      </td>
    ))}
  </tr>
);

export default Row;
