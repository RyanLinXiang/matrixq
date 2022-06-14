import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import {
  isColumnHeader,
  isRowHeader,
  isAnswer,
  sortByColumnRank,
  sortByRowRank,
  chunkAnswers,
  firstRank,
  lastRank,
  getLongestLabelLength,
  createNewColumnHeader,
  createNewRowHeader,
  createNewColumnAnswers,
  createNewRowAnswers,
  getNumberOfUploadedImages,
  createFormDataFromFiles
} from "./helpers";
import ColumnHeader from "./ColumnHeader";
import Row from "./Row";
import SubmitButton from "../../SubmitButton";
import apiUrls from "../../../../domain/api";
import useSubmit from "../../../hooks/useSubmit";
import useFetch from "../../../hooks/useFetch";

const {
  REACT_APP_LANGUAGE,
  REACT_APP_PUBLIC_UPLOAD_FOLDER,
  REACT_APP_IMAGE_FILE_EXT
} = process.env;

const {
  form: wordings
} = require(`../../../languages/${REACT_APP_LANGUAGE}.json`);

const MatrixAnswers = ({
  questionnaireId,
  handlersForChangingStatistics: {
    setNumberOfRows,
    setNumberOfColumns,
    setNumberOfImagesUploaded,
    setLongestRowLabelLength,
    setLongestColumnLabelLength
  },
  handleQuestionnaireSubmit
}) => {
  const { isLoading, data = [] } = useFetch({
    url: apiUrls.getAnswers(questionnaireId)
  });

  const { submit } = useSubmit();

  const [columnHeaders, setColumnHeaders] = useState([]);
  const [rowHeaders, setRowHeaders] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answersInChunks, setAnswersInChunks] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const sortDataByRank = ({
    columnHeadersUnsorted,
    rowHeadersUnsorted,
    answersUnsorted
  }) => {
    columnHeadersUnsorted.sort(sortByColumnRank);
    rowHeadersUnsorted.sort(sortByRowRank);
    answersUnsorted.sort(sortByColumnRank).sort(sortByRowRank);

    setColumnHeaders(columnHeadersUnsorted);
    setRowHeaders(rowHeadersUnsorted);
    setAnswers(answersUnsorted);
    setAnswersInChunks(
      chunkAnswers({
        answers: answersUnsorted,
        chunkLength: columnHeadersUnsorted.length
      })
    );
  };

  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }
    const columnHeadersUnsorted = data.filter(isColumnHeader);
    const rowHeadersUnsorted = data.filter(isRowHeader);
    const answersUnsorted = data.filter(isAnswer);

    sortDataByRank({
      columnHeadersUnsorted,
      rowHeadersUnsorted,
      answersUnsorted
    });
  }, [isLoading]);

  if (isLoading || isEmpty(answersInChunks)) {
    return <></>;
  }

  const handleChangeAnswer = (answerId) => {
    const answerToUpdate = answers.find((answer) => answer._id === answerId);
    answerToUpdate.isChecked = true;
    setAnswers([...answers]);
  };

  const handleEditColumnHeaderLabel = (text, columnHeaderId) => {
    const columnHeaderToUpdate = columnHeaders.find(
      (columnHeader) => columnHeader._id === columnHeaderId
    );
    columnHeaderToUpdate.label = text;
    setColumnHeaders([...columnHeaders]);
    setLongestColumnLabelLength(
      getLongestLabelLength({ headers: columnHeaders })
    );
  };

  const handleEditRowHeaderLabel = (text, rowHeaderId) => {
    const rowHeaderToUpdate = rowHeaders.find(
      (rowHeader) => rowHeader._id === rowHeaderId
    );
    rowHeaderToUpdate.label = text;
    setRowHeaders([...rowHeaders]);
    setLongestRowLabelLength(getLongestLabelLength({ headers: rowHeaders }));
  };

  const handleAddColumn = (rank) => {
    const updatedColumnHeaders = [
      ...columnHeaders,
      createNewColumnHeader({
        rank,
        questionnaireId
      })
    ];

    const updatedAnswers = [
      ...answers,
      ...createNewColumnAnswers({
        rowRanks: rowHeaders.map((row) => row.rowRank),
        columnRank: rank,
        questionnaireId
      })
    ];

    setColumnHeaders(updatedColumnHeaders);

    setAnswers(updatedAnswers);

    sortDataByRank({
      columnHeadersUnsorted: updatedColumnHeaders,
      rowHeadersUnsorted: rowHeaders,
      answersUnsorted: updatedAnswers
    });

    setNumberOfColumns(updatedColumnHeaders.length);
  };

  const handleAddRow = (rank) => {
    const updatedRowHeaders = [
      ...rowHeaders,
      createNewRowHeader({
        rank,
        questionnaireId
      })
    ];

    const updatedAnswers = [
      ...answers,
      ...createNewRowAnswers({
        columnRanks: columnHeaders.map((column) => column.columnRank),
        rowRank: rank,
        questionnaireId
      })
    ];

    setRowHeaders(updatedRowHeaders);

    setAnswers(updatedAnswers);

    sortDataByRank({
      columnHeadersUnsorted: columnHeaders,
      rowHeadersUnsorted: updatedRowHeaders,
      answersUnsorted: updatedAnswers
    });

    setNumberOfRows(updatedRowHeaders.length);
  };

  const handleDeleteColumn = (rank) => {
    const updatedColumnHeaders = columnHeaders.filter(
      (header) => header.columnRank !== rank
    );
    const updatedAnswers = answers.filter(
      (answer) => answer.columnRank !== rank
    );
    setColumnHeaders(updatedColumnHeaders);
    setAnswers(updatedAnswers);
    sortDataByRank({
      columnHeadersUnsorted: updatedColumnHeaders,
      rowHeadersUnsorted: rowHeaders,
      answersUnsorted: updatedAnswers
    });
    setNumberOfColumns(updatedColumnHeaders.length);
    setNumberOfImagesUploaded(
      getNumberOfUploadedImages({
        columnHeaders: updatedColumnHeaders,
        rowHeaders
      })
    );
  };

  const handleDeleteRow = (rank) => {
    const updatedRowHeaders = rowHeaders.filter(
      (header) => header.rowRank !== rank
    );
    const updatedAnswers = answers.filter((answer) => answer.rowRank !== rank);
    setColumnHeaders(updatedRowHeaders);
    setAnswers(updatedAnswers);
    sortDataByRank({
      columnHeadersUnsorted: columnHeaders,
      rowHeadersUnsorted: updatedRowHeaders,
      answersUnsorted: updatedAnswers
    });
    setNumberOfRows(updatedRowHeaders.length);
    setNumberOfImagesUploaded(
      getNumberOfUploadedImages({
        columnHeaders,
        rowHeaders: updatedRowHeaders
      })
    );
  };

  const handleSubmit = () => {
    submit({
      url: apiUrls.updateAnswers(questionnaireId),
      data: columnHeaders.concat(rowHeaders, answers)
    });
    submit({
      url: apiUrls.upload(),
      formData: createFormDataFromFiles({ files: uploadedFiles })
    });
    handleQuestionnaireSubmit();
  };

  const handleUploadColumnHeaderImages = (newFile, id) => {
    setUploadedFiles([...uploadedFiles, { file: newFile, fileName: id }]);

    const columnHeaderToUpdate = columnHeaders.find(
      (header) => header._id === id
    );
    columnHeaderToUpdate.imagePath = `${REACT_APP_PUBLIC_UPLOAD_FOLDER}/${id}.${REACT_APP_IMAGE_FILE_EXT}`;
    setColumnHeaders([...columnHeaders]);
    setNumberOfImagesUploaded(
      getNumberOfUploadedImages({ columnHeaders, rowHeaders })
    );
  };

  const handleUploadRowHeaderImages = (newFile, id) => {
    setUploadedFiles([...uploadedFiles, { file: newFile, fileName: id }]);

    const rowHeaderToUpdate = rowHeaders.find((header) => header._id === id);
    rowHeaderToUpdate.imagePath = `${REACT_APP_PUBLIC_UPLOAD_FOLDER}/${id}.${REACT_APP_IMAGE_FILE_EXT}`;

    setRowHeaders([...rowHeaders]);
    setNumberOfImagesUploaded(
      getNumberOfUploadedImages({ columnHeaders, rowHeaders })
    );
  };

  return (
    <table className="MatrixAnswers">
      <thead>
        <tr className="MatrixAnswers-ColumnHeaders">
          <td></td>
          {columnHeaders.map((header, index) => (
            <ColumnHeader
              key={header._id}
              label={header.label}
              imagePath={header.imagePath}
              handleEditColumnHeaderLabel={handleEditColumnHeaderLabel}
              id={header._id}
              handleAddColumn={handleAddColumn}
              handleDeleteColumn={handleDeleteColumn}
              handleUploadFiles={handleUploadColumnHeaderImages}
              columnRank={header.columnRank}
              previousRank={
                columnHeaders.length === 0 ? firstRank : header.columnRank
              }
              nextRank={
                index + 1 >= columnHeaders.length
                  ? lastRank
                  : columnHeaders[index + 1].columnRank
              }
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {answersInChunks.map((chunk, index) => (
          <Row
            id={rowHeaders[index]._id}
            key={rowHeaders[index]._id}
            label={rowHeaders[index].label}
            answers={chunk}
            handleChangeAnswer={handleChangeAnswer}
            handleEditRowHeaderLabel={handleEditRowHeaderLabel}
            handleAddRow={handleAddRow}
            handleDeleteRow={handleDeleteRow}
            handleUploadFiles={handleUploadRowHeaderImages}
            imagePath={rowHeaders[index].imagePath}
            rowRank={rowHeaders[index].rowRank}
            previousRank={
              rowHeaders.length === 0 ? firstRank : rowHeaders[index].rowRank
            }
            nextRank={
              index + 1 >= rowHeaders.length
                ? lastRank
                : rowHeaders[index + 1].rowRank
            }
          />
        ))}
        <tr className="MatrixAnswers-Buttons">
          <td colSpan={columnHeaders.length + 1}>
            <SubmitButton
              label={wordings.saveButtonLabel}
              handleClick={handleSubmit}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MatrixAnswers;
