import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './Welcome.css';

export default function Welcome() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">
          <span className="title-icon">🎯</span>
          Interactive Quiz Challenge
        </h1>
        
        <div className="feature-cards">
          <div className="feature-card">
            <i className="fas fa-brain"></i>
            <h3>Test Your Knowledge</h3>
            <p>Challenge yourself with our diverse range of questions</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-chart-line"></i>
            <h3>Track Progress</h3>
            <p>Monitor your performance and see your scores improve</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-trophy"></i>
            <h3>Earn Achievements</h3>
            <p>Get rewarded for your quiz accomplishments</p>
          </div>
        </div>

        <div className="welcome-actions">
          {isAuthenticated ? (
            <button 
              className="start-quiz-btn"
              onClick={() => navigate('/quiz')}
            >
              <i className="fas fa-play-circle me-2"></i>
              Start Quiz Now
            </button>
          ) : (
            <button 
              className="login-btn"
              onClick={() => navigate('/login')}
            >
              <i className="fas fa-sign-in-alt me-2"></i>
              Login to Start
            </button>
          )}
        </div>

        <div className="welcome-footer">
          <p className="stats">
            <span><i className="fas fa-users"></i> 1000+ Users</span>
            <span><i className="fas fa-question-circle"></i> 500+ Questions</span>
            <span><i className="fas fa-star"></i> 4.8/5 Rating</span>
          </p>
        </div>
      </div>
    </div>
  );
} 