const { REACT_APP_API_URL } = process.env

const apiUrls = {
    "getQuestionnairesById": (id) => `${REACT_APP_API_URL}/questionnaires/${id}`,
    "getAnswersByQuestionnaireId": (questionnaireId) => `${REACT_APP_API_URL}/answers/${questionnaireId}`
}

export default apiUrls