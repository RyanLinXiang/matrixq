import { useEffect, useState } from "react";

const useApi = ({ url, method = "GET", params = {} }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchOptions =
    method === "GET"
      ? {}
      : {
          method,
          body: params,
          headers: { "Content-Type": "application/json" },
        };

  const callApi = () => {
    fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setData(json);
      });
  };

  useEffect(() => {
    callApi();
  }, []);

  return { isLoading, data };
};

export default useApi;
