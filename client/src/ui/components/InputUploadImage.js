import React, { useRef, useState } from "react";

const { REACT_APP_LANGUAGE } = process.env;

const { upload: wordings } = require(`../languages/${REACT_APP_LANGUAGE}.json`);

const InputUploadImage = ({ id, handleChange, imagePath }) => {
  const fileInputRef = useRef(null);

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleOnChange = (event) => {
    const newFile = event.target.files[0];

    setUploadedFile(
      window.URL.createObjectURL(
        new Blob([newFile], {
          type: "image/png"
        })
      )
    );

    handleChange(newFile, id);
  };

  return (
    <div className="InputUpload">
      <input
        type="file"
        name="file"
        multiple={false}
        onChange={handleOnChange}
        ref={fileInputRef}
      />
      {uploadedFile || imagePath ? (
        <img
          src={uploadedFile || imagePath}
          alt={wordings.imageAlt}
          onClick={() => fileInputRef.current.click()}
          className="InputUpload-Button"
        />
      ) : (
        <button
          onClick={() => fileInputRef.current.click()}
          className="InputUpload-Button"
        >
          +
        </button>
      )}
    </div>
  );
};

export default InputUploadImage;
