import React from "react";
import RadioButton from "../../RadioButton";
import Input from "../../Input";

const Row = ({
  id,
  label,
  answers,
  handleChangeAnswer,
  handleEditRowHeaderLabel
}) => (
  <div className="MatrixAnswers-Row">
    <div>
      <Input id={id} label={label} handleChange={handleEditRowHeaderLabel} />
    </div>
    <div className="MatrixAnswers-Options">
      {answers.map((answer) => (
        <div key={answer._id}>
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
