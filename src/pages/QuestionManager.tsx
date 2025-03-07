import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../features/quiz/quizSlice';

export default function QuestionManager() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [timeLimit, setTimeLimit] = useState(30);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addQuestion({
      question,
      options,
      correctAnswer,
      timeLimit
    }));
    // Reset form
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer(0);
    setTimeLimit(30);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Question</label>
          <input
            type="text"
            className="form-control"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="mb-3">
            <label className="form-label">Option {index + 1}</label>
            <input
              type="text"
              className="form-control"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
            />
          </div>
        ))}
        <div className="mb-3">
          <label className="form-label">Correct Answer (1-4)</label>
          <input
            type="number"
            className="form-control"
            min="1"
            max="4"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Time Limit (seconds)</label>
          <input
            type="number"
            className="form-control"
            min="10"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Question</button>
      </form>
    </div>
  );
} 