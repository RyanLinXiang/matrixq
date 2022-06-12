import React from "react";
import useApi from "../../hooks/useApi";
import apiUrls from "../../../domain/api";
import MatrixAnswers from "./MatrixAnswers";
import { isEmpty } from "lodash";

const MatrixQuestionnaire = ({ apiUrl }) => {
  const { isLoading, data: questionnaire } = useApi({ url: apiUrl });

  if (isLoading || isEmpty(questionnaire)) {
    return <></>;
  }

  return (
    <MatrixAnswers apiUrl={apiUrls.getAnswersByQuestionnaireId(questionnaire._id)} />
  );
};

export default MatrixQuestionnaire;
