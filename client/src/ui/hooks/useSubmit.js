import { useState } from "react";

const useSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const submit = ({ url, docs }) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ docs: docs ? docs : {} })
    };

    setIsLoading(true);

    fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setData(json);
      });
  };

  return { isLoading, data, submit };
};

export default useSubmit;
