import React, { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import apiUrls from "../../../../domain/api";
import MatrixAnswers from "./MatrixAnswers";
import { isEmpty } from "lodash";
import Summary from "./Summary";

const MatrixQuestionnaire = ({ apiUrl }) => {
  const { isLoading, data: questionnaire = {} } = useApi({ url: apiUrl });

  const [numberOfRows, setNumberOfRows] = useState(null);
  const [numberOfColumns, setNumberOfColumns] = useState(null);
  const [numberOfImagesUploaded, setNumberOfImagesUploaded] = useState(null);
  const [longestRowLabelLength, setLongestRowLabelLength] = useState(null);
  const [longestColumnLabelLength, setLongestColumnLabelLength] =
    useState(null);

  useEffect(() => {
    if (isEmpty(questionnaire)) {
      return;
    }

    setNumberOfRows(questionnaire.numberOfRows);
    setNumberOfColumns(questionnaire.numberOfColumns);
    setNumberOfImagesUploaded(questionnaire.numberOfImagesUploaded);
    setLongestRowLabelLength(questionnaire.longestRowLabelLength);
    setLongestColumnLabelLength(questionnaire.longestColumnLabelLength);
  }, [isLoading]);

  if (isLoading || isEmpty(questionnaire)) {
    return <></>;
  }

  const statistics = {
    numberOfRows,
    numberOfColumns,
    numberOfImagesUploaded,
    longestRowLabelLength,
    longestColumnLabelLength
  };

  const handlersForChangingStatistics = {
    setNumberOfRows,
    setNumberOfColumns,
    setNumberOfImagesUploaded,
    setLongestRowLabelLength,
    setLongestColumnLabelLength
  };

  return (
    <div className="MatrixQuestionnaire">
      <MatrixAnswers
        questionnaireId={questionnaire._id}
        apiUrl={apiUrls.getAnswersByQuestionnaireId(questionnaire._id)}
        handlersForChangingStatistics={handlersForChangingStatistics}
      />
      <Summary statistics={statistics} />
    </div>
  );
};

export default MatrixQuestionnaire;
