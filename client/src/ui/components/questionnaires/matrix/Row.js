import React from "react";
import RadioButton from "../../RadioButton";
import Input from "../../Input";
import AddColumnOrRow from "./AddColumnOrRow";
import { getRank } from "./helpers";

const Row = ({
  id,
  label,
  answers,
  handleChangeAnswer,
  handleEditRowHeaderLabel,
  handleAddRow,
  previousRank,
  nextRank
}) => (
  <div className="MatrixAnswers-Row">
    <div>
      <div className="MatrixAnswers-RowLabel">
        <Input id={id} label={label} handleChange={handleEditRowHeaderLabel} />
      </div>
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
    <div className="MatrixAnswers-Options">
      {answers.map((answer) => (
        <div key={answer._id} className="MatrixAnswers-Option">
          <RadioButton
            id={answer._id}
            isChecked={answer.isChecked}
            handleChange={handleChangeAnswer}
          />
        </div>
      ))}
    </div>
  </div>
);

export default Row;
