import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setTimeRemaining, setTimerRunning } from '../../features/quiz/quizSlice';
import './Timer.css';

interface TimerProps {
  onTimeUp: () => void;
}

export default function Timer({ onTimeUp }: TimerProps) {
  const dispatch = useDispatch();
  const { timeRemaining, isTimerRunning, showAnswerResult } = useSelector(
    (state: RootState) => state.quiz
  );

  useEffect(() => {
    if (!showAnswerResult) {
      dispatch(setTimerRunning(true));
    }
  }, [dispatch, showAnswerResult]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerRunning && timeRemaining > 0 && !showAnswerResult) {
      timer = setInterval(() => {
        dispatch(setTimeRemaining(timeRemaining - 1));
      }, 1000);
    }

    if (timeRemaining === 0 && isTimerRunning) {
      dispatch(setTimerRunning(false));
      onTimeUp();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining, isTimerRunning, dispatch, onTimeUp, showAnswerResult]);

  const getTimerColor = () => {
    if (timeRemaining > 20) return 'timer-normal';
    if (timeRemaining > 10) return 'timer-warning';
    return 'timer-danger';
  };

  return (
    <div className="timer-container">
      <div className={`timer-circle ${getTimerColor()}`}>
        <div className="timer-value">{timeRemaining}</div>
        <div className="timer-text">seconds</div>
      </div>
      <svg className="timer-progress">
        <circle
          r="58"
          cx="60"
          cy="60"
          style={{
            strokeDashoffset: `${((30 - timeRemaining) / 30) * 364}`,
          }}
        />
      </svg>
    </div>
  );
} 