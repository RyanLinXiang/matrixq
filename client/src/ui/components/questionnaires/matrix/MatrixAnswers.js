import React, { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import { isEmpty } from "lodash";
import {
  isColumnHeader,
  isRowHeader,
  isAnswer,
  sortByColumnRank,
  sortByRowRank,
  chunkAnswers,
  getLongestLabelLength
} from "./helpers";
import ColumnHeader from "./ColumnHeader";
import Row from "./Row";

const MatrixAnswers = ({
  apiUrl,
  handlersForChangingStatistics: {
    setNumberOfRows,
    setNumberOfColumns,
    setNumberOfImagesUploaded,
    setLongestRowLabelLength,
    setLongestColumnLabelLength
  }
}) => {
  const { isLoading, data = [] } = useApi({ url: apiUrl });
  const [columnHeaders, setColumnHeaders] = useState([]);
  const [rowHeaders, setRowHeaders] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answersInChunks, setAnswersInChunks] = useState([]);

  useEffect(() => {
    if (isEmpty(data)) {
      return;
    }

    const columnHeadersOnly = data.filter(isColumnHeader);
    const rowHeadersOnly = data.filter(isRowHeader);
    const answersOnly = data.filter(isAnswer);

    columnHeadersOnly.sort(sortByColumnRank);
    rowHeadersOnly.sort(sortByRowRank);
    answersOnly.sort(sortByColumnRank).sort(sortByRowRank);

    setColumnHeaders(columnHeadersOnly);
    setRowHeaders(rowHeadersOnly);
    setAnswers(answersOnly);
    setAnswersInChunks(
      chunkAnswers({
        answers: answersOnly,
        chunkLength: columnHeadersOnly.length
      })
    );
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

  return (
    <div className="MatrixAnswers">
      <div className="MatrixAnswers-ColumnHeaders">
        {columnHeaders.map((header) => (
          <ColumnHeader
            key={header._id}
            label={header.label}
            handleEditColumnHeaderLabel={handleEditColumnHeaderLabel}
            id={header._id}
          />
        ))}
      </div>
      <div>
        {answersInChunks.map((chunk, index) => (
          <Row
            id={rowHeaders[index]._id}
            key={rowHeaders[index]._id}
            label={rowHeaders[index].label}
            answers={chunk}
            handleChangeAnswer={handleChangeAnswer}
            handleEditRowHeaderLabel={handleEditRowHeaderLabel}
          />
        ))}
      </div>
    </div>
  );
};

export default MatrixAnswers;
