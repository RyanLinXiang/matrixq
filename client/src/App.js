import "./App.css";
import apiUrls from "./domain";
import MatrixQuestionnaire from "./ui/containers/Questionnaires/MatrixQuestionnaire";

function App() {
  return <MatrixQuestionnaire apiUrl={apiUrls.getQuestionnairesbyId("fake")} />;
}

export default App;
