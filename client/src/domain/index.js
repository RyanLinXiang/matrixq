const { REACT_APP_API_URL } = process.env

const apiUrls = {
    "getQuestionnairesbyId": (id) => `${REACT_APP_API_URL}/questionnaires/${id}`
}

export default apiUrls