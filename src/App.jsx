import { useState } from 'react'
import LandingPage from './components/LandingPage'
import SurveyPage from './components/SurveyPage'
import ThankYouPage from './components/ThankYouPage'
import RoughFilters from './components/RoughFilters'
import Doodles from './components/Doodles'
import { questions } from './data/questions'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [error, setError] = useState(null)

  const startSurvey = () => {
    setCurrentPage('survey')
    setCurrentQuestion(0)
  }

  const selectOption = (questionId, type, value) => {
    setError(null)
    
    if (type === 'single') {
      setAnswers(prev => ({ ...prev, [questionId]: value }))
    } else {
      // Multiple selection
      const current = answers[questionId] || []
      const newSelection = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      setAnswers(prev => ({ ...prev, [questionId]: newSelection }))
    }
  }

  const validateCurrentQuestion = () => {
    const q = questions[currentQuestion]
    const answer = answers[q.id]
    
    if (!answer || (Array.isArray(answer) && answer.length === 0)) {
      setError(q.id)
      return false
    }
    return true
  }

  const nextQuestion = () => {
    if (!validateCurrentQuestion()) return
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setError(null)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setError(null)
    } else {
      // If on first question, go back to landing page
      setCurrentPage('landing')
      setError(null)
    }
  }

  const submitSurvey = () => {
    if (!validateCurrentQuestion()) return
    
    // Here you would typically send answers to a backend
    console.log('Survey answers:', answers)
    setCurrentPage('thankyou')
  }

  return (
    <div className="app">
      <RoughFilters />
      <Doodles />
      
      {currentPage !== 'landing' && currentPage !== 'thankyou' && (
        <div className="progress">
          {currentQuestion + 1} / {questions.length}
        </div>
      )}

      {currentPage === 'landing' && (
        <LandingPage onStart={startSurvey} />
      )}

      {currentPage === 'survey' && (
        <SurveyPage
          question={questions[currentQuestion]}
          questionIndex={currentQuestion}
          totalQuestions={questions.length}
          answers={answers}
          error={error}
          onSelect={selectOption}
          onNext={nextQuestion}
          onPrev={prevQuestion}
          onSubmit={submitSurvey}
          isFirst={currentQuestion === 0}
          isLast={currentQuestion === questions.length - 1}
        />
      )}

      {currentPage === 'thankyou' && (
        <ThankYouPage />
      )}
    </div>
  )
}

export default App
