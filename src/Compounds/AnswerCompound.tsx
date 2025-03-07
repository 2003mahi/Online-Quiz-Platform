import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import QuestionsData from '../Data/questions.json'
import AnswerButton from '../Components/Answer/AnswerButton'
import AnswerButtonsWrapper from '../Components/Answer/AnswerButtonsWrapper'
import AnswerResult from '../Components/Answer/AnswerResult'
import AnswerSectionWrapper from '../Components/Answer/AnswerSectionWrapper'
import NextQuestionButton from '../Components/Answer/NextQuestionButton'
import NextQuestionButtonWrapper from '../Components/Answer/NextQuestionButtonWrapper'
import FinishMessage from '../Components/Answer/FinishMessage'
import FinishMessageOverlay from '../Components/Answer/FinishMessageOverlay'
import { RootState } from '../store'
import { 
  setCurrentQuestion, 
  setShowAnswerResult, 
  setCorrectAnswersNumber, 
  setWrongAnswersNumber,
  shuffleQuestions,
  setTimeRemaining,
  setTimerRunning
} from '../features/quiz/quizSlice'
import Timer from '../Components/Timer/Timer'

export default function AnswerCompound() {
  const dispatch = useDispatch()
  const {
    currentQuestion,
    showAnswerResult,
    correctAnswersNumber,
    wrongAnswersNumber,
    shuffledQuestions
  } = useSelector((state: RootState) => state.quiz)

  const [finalResult, setFinalResult] = useState('')
  const [showFinishMessage, setShowFinishMessage] = useState(false)
  const [wrongClickedAnswer, setWrongClickedAnswer] = useState('')
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])

  useEffect(() => {
    const shuffled = [...QuestionsData].sort(() => Math.random() - 0.5)
    dispatch(shuffleQuestions(shuffled))
  }, [dispatch])

  useEffect(() => {
    if (shuffledQuestions.length > 0) {
      const currentQ = shuffledQuestions[currentQuestion - 1]
      const options = [currentQ.correct_answer, ...currentQ.incorrect_answers]
      setShuffledOptions(options.sort(() => Math.random() - 0.5))
    }
  }, [currentQuestion, shuffledQuestions])

  const correctAnswer = shuffledQuestions[currentQuestion - 1]?.correct_answer

  function checkAnswer(answer: string) {
    if (answer === correctAnswer) {
      dispatch(setShowAnswerResult('Correct Answer!'))
      dispatch(setCorrectAnswersNumber(correctAnswersNumber + 1))
      setFinalResult('correct')
    } else {
      dispatch(setShowAnswerResult('Wrong Answer!'))
      dispatch(setWrongAnswersNumber(wrongAnswersNumber + 1))
      setFinalResult('wrong')
      setWrongClickedAnswer(answer)
    }
  }

  function changeButtonColor(answer: string) {
    if (answer === correctAnswer) {
      return 'green-button'
    }
    if (answer === wrongClickedAnswer) {
      return 'red-button'
    } else {
      return 'answer-button'
    }
  }

  function doButtonClickActions() {
    if (currentQuestion === QuestionsData.length) {
      if (finalResult === 'correct') {
        dispatch(setCorrectAnswersNumber(correctAnswersNumber + 1))
      }
      if (finalResult === 'wrong') {
        dispatch(setWrongAnswersNumber(wrongAnswersNumber + 1))
      }
      setFinalResult('')
      return setShowFinishMessage(true)
    }

    dispatch(setCurrentQuestion(currentQuestion + 1))
    dispatch(setShowAnswerResult(''))

    if (finalResult === 'correct') {
      dispatch(setCorrectAnswersNumber(correctAnswersNumber + 1))
    }
    if (finalResult === 'wrong') {
      dispatch(setWrongAnswersNumber(wrongAnswersNumber + 1))
    }
    setFinalResult('')

    // Reset timer for next question
    dispatch(setTimeRemaining(30));
    dispatch(setTimerRunning(true));
  }

  const handleTimeUp = () => {
    dispatch(setShowAnswerResult('Time\'s Up!'))
    dispatch(setWrongAnswersNumber(wrongAnswersNumber + 1))
    setFinalResult('wrong')
  }

  return (
    <>
      <AnswerSectionWrapper>
        <Timer onTimeUp={handleTimeUp} />
        <AnswerButtonsWrapper>
          {shuffledOptions.map((answer: string, index: number) => (
            <AnswerButton
              key={index}
              disabled={showAnswerResult !== ''}
              onClick={() => checkAnswer(answer)}
              className={
                finalResult === '' ? 'answer-button' : changeButtonColor(answer)
              }
            >
              {decodeURIComponent(answer)}
            </AnswerButton>
          ))}
        </AnswerButtonsWrapper>
        <AnswerResult>{showAnswerResult}</AnswerResult>
        {showAnswerResult && (
          <div className="text-center mt-3">
            <p>Current Score: {Math.round(correctAnswersNumber / currentQuestion * 100)}%</p>
          </div>
        )}
        <NextQuestionButtonWrapper>
          {showAnswerResult === '' ? null : (
            <NextQuestionButton onClick={doButtonClickActions}>
              Next Question
            </NextQuestionButton>
          )}
        </NextQuestionButtonWrapper>
      </AnswerSectionWrapper>
      {showFinishMessage && (
        <FinishMessageOverlay>
          <FinishMessage />
          <div className="text-center mt-3">
            <h3>Final Score: {Math.round(correctAnswersNumber / QuestionsData.length * 100)}%</h3>
            <p>Correct Answers: {correctAnswersNumber}</p>
            <p>Wrong Answers: {wrongAnswersNumber}</p>
          </div>
        </FinishMessageOverlay>
      )}
    </>
  )
}
