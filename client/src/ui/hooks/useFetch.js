import { useEffect, useState } from "react";

const useFetch = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const callApi = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setData(json);
      });
  };

  useEffect(() => {
    callApi();
  }, [isLoading]);

  return { isLoading, data };
};

export default useFetch;
