import { useSelector } from 'react-redux'
import './Question.css'
import QuestionsData from '../../Data/questions.json'
import { RootState } from '../../store'

export default function QuestionNumber() {
  const { currentQuestion } = useSelector((state: RootState) => state.quiz)
  const totalQuestions = QuestionsData.length

  return (
    <p className='question-number'>
      Question {currentQuestion} of {totalQuestions}
    </p>
  )
}
