import './Answer.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function FinishMessage() {
  const { correctAnswersNumber, wrongAnswersNumber } = useSelector((state: RootState) => state.quiz);
  const totalQuestions = correctAnswersNumber + wrongAnswersNumber;
  const finalScore = Math.round((correctAnswersNumber / totalQuestions) * 100);

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🏆';
    if (score >= 70) return '🌟';
    if (score >= 50) return '👍';
    return '💪';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding Performance!';
    if (score >= 70) return 'Great Job!';
    if (score >= 50) return 'Good Effort!';
    return 'Keep Practicing!';
  };

  return (
    <div className='finish-message'>
      <div>
        <h2>{getScoreEmoji(finalScore)} Quiz Complete! {getScoreEmoji(finalScore)}</h2>
        <div className="score-summary">
          <h3>Final Score: {finalScore}%</h3>
          <h4 className="text-center mb-4">{getScoreMessage(finalScore)}</h4>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${finalScore}%` }}
            ></div>
          </div>
          <p><i className="fas fa-question-circle"></i> Total Questions: {totalQuestions}</p>
          <p><i className="fas fa-check-circle text-success"></i> Correct Answers: {correctAnswersNumber}</p>
          <p><i className="fas fa-times-circle text-danger"></i> Wrong Answers: {wrongAnswersNumber}</p>
        </div>
        <button 
          className="btn btn-primary btn-lg mt-3"
          onClick={() => window.location.reload()}
        >
          <i className="fas fa-redo me-2"></i>
          Take Another Quiz
        </button>
      </div>
    </div>
  )
}
