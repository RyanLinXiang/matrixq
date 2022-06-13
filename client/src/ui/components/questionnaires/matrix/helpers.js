import { chunk } from "lodash";

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
