import "./App.css";
import apiUrls from "./domain/api";
import MatrixQuestionnaire from "./ui/components/questionnaires/matrix/MatrixQuestionnaire";

function App() {
  return <MatrixQuestionnaire apiUrl={apiUrls.getQuestionnaire("matrix-01")} />;
}

export default App;
