import React from "react";

const { REACT_APP_LANGUAGE } = process.env;
const {
  summary: wordings
} = require(`../../../languages/${REACT_APP_LANGUAGE}.json`);

const Summary = ({ statistics }) => (
  <div className="Summary">
    <div className="Summary-Statistic">
      <span className="StatisticLabel">
        {wordings.numberOfRows}
        {": "}
      </span>
      <span className="StatisticValue">{statistics.numberOfRows}</span>
    </div>
    <div className="Summary-Statistic">
      <span className="StatisticLabel">
        {wordings.numberOfColumns}
        {": "}
      </span>
      <span className="StatisticValue">{statistics.numberOfColumns}</span>
    </div>
    <div className="Summary-Statistic">
      <span className="StatisticLabel">
        {wordings.numberOfImagesUploaded}
        {": "}
      </span>
      <span className="StatisticValue">
        {statistics.numberOfImagesUploaded}
      </span>
    </div>
    <div className="Summary-Statistic">
      <span className="StatisticLabel">
        {wordings.longestRowLabelLength}
        {": "}
      </span>
      <span className="StatisticValue">{statistics.longestRowLabelLength}</span>
    </div>
    <div className="Summary-Statistic">
      <span className="StatisticLabel">
        {wordings.longestColumnLabelLength}
        {": "}
      </span>
      <span className="StatisticValue">
        {statistics.longestColumnLabelLength}
      </span>
    </div>
  </div>
);

export default Summary;
