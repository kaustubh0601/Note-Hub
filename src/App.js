import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import NotePage from './pages/NotePage';
import NewNotePage from './pages/NewNotePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="/new" element={<NewNotePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;