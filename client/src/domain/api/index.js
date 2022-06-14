const { REACT_APP_API_URL } = process.env;

const apiUrls = {
  getQuestionnaire: (id) => `${REACT_APP_API_URL}/questionnaires/${id}`,
  getAnswers: (questionnaireId) =>
    `${REACT_APP_API_URL}/answers/${questionnaireId}`,
  updateQuestionnaire: (id) => `${REACT_APP_API_URL}/questionnaires/${id}`,
  updateAnswers: (questionnaireId) =>
    `${REACT_APP_API_URL}/answers/${questionnaireId}`,
  upload: () => `${REACT_APP_API_URL}/upload`
};

export default apiUrls;
