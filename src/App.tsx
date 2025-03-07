import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import QuestionManager from './pages/QuestionManager';
import QuizCompound from './Compounds/QuizCompound';
import Navigation from './Components/Navigation/Navigation';
import { RootState } from './store';

export default function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/quiz" 
          element={isAuthenticated ? <QuizCompound /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/manage" 
          element={isAuthenticated ? <QuestionManager /> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}
