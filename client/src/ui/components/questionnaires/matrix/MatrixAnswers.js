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
  createNewRowAnswers
} from "./helpers";
import ColumnHeader from "./ColumnHeader";
import Row from "./Row";
import SubmitButton from "../../SubmitButton";
import apiUrls from "../../../../domain/api";
import useSubmit from "../../../hooks/useSubmit";
import useFetch from "../../../hooks/useFetch";

const { REACT_APP_LANGUAGE } = process.env;

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
  };

  const handleSubmit = () => {
    submit({
      url: apiUrls.updateAnswers(questionnaireId),
      docs: columnHeaders.concat(rowHeaders, answers)
    });
    handleQuestionnaireSubmit();
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
              handleEditColumnHeaderLabel={handleEditColumnHeaderLabel}
              id={header._id}
              handleAddColumn={handleAddColumn}
              handleDeleteColumn={handleDeleteColumn}
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
        <tr
          colSpan={columnHeaders.length + 1}
          className="MatrixAnswers-Buttons"
        >
          <td>
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
