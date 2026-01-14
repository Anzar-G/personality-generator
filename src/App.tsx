import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/result/:archetypeId" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
