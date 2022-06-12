import React from "react"
import useApi from "../../hooks/useApi";

const MatrixQuestionnaire = ({ apiUrl }) => {
  const { isLoading, data } = useApi({ url: apiUrl });
  console.log("DATA ISLOADING", data, isLoading)
  return <></>
};

export default MatrixQuestionnaire