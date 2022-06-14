import { chunk } from "lodash";
import { v4 as uuidv4 } from "uuid";

export const firstRank = 0;
export const lastRank = 10000000;

export const isColumnHeader = ({ isRow, isHeader }) => !isRow && isHeader;

export const isRowHeader = ({ isRow, isHeader }) => isRow && isHeader;

export const isAnswer = ({ isHeader }) => !isHeader;

export const sortByColumnRank = (previous, current) =>
  previous.columnRank - current.columnRank;

export const sortByRowRank = (previous, current) =>
  previous.rowRank - current.rowRank;

export const chunkAnswers = ({ answers, chunkLength }) =>
  chunk(answers, chunkLength);

export const getLongestLabelLength = ({ headers }) =>
  Math.max(...headers.map((header) => header.label.length));

export const getRank = ({ previousRank = firstRank, nextRank = lastRank }) =>
  Math.ceil((previousRank + nextRank) / 2);

export const createNewColumnHeader = ({ rank, questionnaireId }) => ({
  _id: uuidv4(),
  columnRank: rank,
  label: "newCol",
  isRow: false,
  isHeader: true,
  imagePath: null,
  questionnaireId: questionnaireId
});

export const createNewRowHeader = ({ rank, questionnaireId }) => ({
  _id: uuidv4(),
  rowRank: rank,
  label: "newRow",
  isRow: true,
  isHeader: true,
  imagePath: null,
  questionnaireId: questionnaireId
});

export const createNewColumnAnswers = ({
  rowRanks,
  columnRank,
  questionnaireId
}) => {
  const answers = [];

  for (const rank of rowRanks) {
    answers.push({
      _id: uuidv4(),
      rowRank: rank,
      columnRank,
      isChecked: false,
      questionnaireId
    });
  }

  return answers;
};

export const createNewRowAnswers = ({
  columnRanks,
  rowRank,
  questionnaireId
}) => {
  const answers = [];

  for (const rank of columnRanks) {
    answers.push({
      _id: uuidv4(),
      columnRank: rank,
      rowRank,
      isChecked: false,
      questionnaireId
    });
  }

  return answers;
};

export const getNumberOfUploadedImages = ({ columnHeaders, rowHeaders }) =>
  columnHeaders.filter((header) => Boolean(header.imagePath)).length +
  rowHeaders.filter((header) => Boolean(header.imagePath)).length;

export const createFormDataFromFiles = ({ files }) => {
  const formData = new FormData();

  for (const { file, fileName } of files) {
    formData.append("file", file, fileName);
  }

  return formData;
};
