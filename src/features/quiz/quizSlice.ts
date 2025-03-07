import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
}

interface QuizState {
  questions: Question[];
  currentQuestion: number;
  showAnswerResult: string;
  correctAnswersNumber: number;
  wrongAnswersNumber: number;
  score: number;
  shuffledQuestions: any[]; // to store randomized questions
  timeRemaining: number;
  isTimerRunning: boolean;
}

const initialState: QuizState = {
  questions: [],
  currentQuestion: 1,
  showAnswerResult: '',
  correctAnswersNumber: 0,
  wrongAnswersNumber: 0,
  score: 0,
  shuffledQuestions: [],
  timeRemaining: 30, // 30 seconds per question
  isTimerRunning: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
    },
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestion = action.payload;
    },
    setShowAnswerResult: (state, action: PayloadAction<string>) => {
      state.showAnswerResult = action.payload;
    },
    setCorrectAnswersNumber: (state, action: PayloadAction<number>) => {
      state.correctAnswersNumber = action.payload;
      // Update score when correct answers change
      state.score = (state.correctAnswersNumber / (state.correctAnswersNumber + state.wrongAnswersNumber)) * 100;
    },
    setWrongAnswersNumber: (state, action: PayloadAction<number>) => {
      state.wrongAnswersNumber = action.payload;
      // Update score when wrong answers change
      state.score = (state.correctAnswersNumber / (state.correctAnswersNumber + state.wrongAnswersNumber)) * 100;
    },
    shuffleQuestions: (state, action: PayloadAction<any[]>) => {
      state.shuffledQuestions = action.payload;
    },
    resetQuiz: (state) => {
      state.currentQuestion = 1;
      state.showAnswerResult = '';
      state.correctAnswersNumber = 0;
      state.wrongAnswersNumber = 0;
      state.score = 0;
      state.shuffledQuestions = [];
    },
    setTimeRemaining: (state, action: PayloadAction<number>) => {
      state.timeRemaining = action.payload;
    },
    setTimerRunning: (state, action: PayloadAction<boolean>) => {
      state.isTimerRunning = action.payload;
    },
    resetTimer: (state) => {
      state.timeRemaining = 30;
      state.isTimerRunning = false;
    },
  }
});

export const { 
  addQuestion, 
  setCurrentQuestion, 
  setShowAnswerResult, 
  setCorrectAnswersNumber, 
  setWrongAnswersNumber,
  shuffleQuestions,
  resetQuiz,
  setTimeRemaining,
  setTimerRunning,
  resetTimer,
} = quizSlice.actions;

export default quizSlice.reducer; 