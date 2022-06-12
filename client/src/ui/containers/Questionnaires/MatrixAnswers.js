import React from "react"
import useApi from "../../hooks/useApi";
import { isEmpty } from "lodash";

const MatrixAnswers = ({ apiUrl }) => {
  const { isLoading, data: answers } = useApi({ url: apiUrl });
  
  if (isLoading || isEmpty(answers)) {
    return <></>;
  }

  return <></>
};

export default MatrixAnswers