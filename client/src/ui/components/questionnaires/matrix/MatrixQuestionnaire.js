import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

import MatrixAnswers from "./MatrixAnswers";
import { isEmpty } from "lodash";
import Summary from "./Summary";
import useSubmit from "../../../hooks/useSubmit";
import apiUrls from "../../../../domain/api/index";

const MatrixQuestionnaire = ({ apiUrl }) => {
  const { isLoading, data: questionnaire = {} } = useFetch({ url: apiUrl });
  const { submit } = useSubmit();

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

  const handleSubmit = () => {
    submit({
      url: apiUrls.updateQuestionnaire(questionnaire._id),
      data: [statistics]
    });
  };

  return (
    <div className="MatrixQuestionnaire">
      <MatrixAnswers
        questionnaireId={questionnaire._id}
        handlersForChangingStatistics={handlersForChangingStatistics}
        handleQuestionnaireSubmit={handleSubmit}
      />
      <Summary statistics={statistics} />
    </div>
  );
};

export default MatrixQuestionnaire;
