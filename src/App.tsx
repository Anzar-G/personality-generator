import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/result/:archetypeId" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
