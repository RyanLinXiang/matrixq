import { useState } from "react";

const useSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const submit = ({ url, data, formData }) => {
    const fetchOptions = {
      method: "POST",
      ...(data
        ? {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }
        : {}),
      body: data ? JSON.stringify({ docs: data }) : formData ? formData : {}
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
