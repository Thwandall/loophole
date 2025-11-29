import { useState } from 'react'
import LandingPage from './components/LandingPage'
import ContactPage from './components/ContactPage'
import SurveyPage from './components/SurveyPage'
import ThankYouPage from './components/ThankYouPage'
import RoughFilters from './components/RoughFilters'
import Doodles from './components/Doodles'
import { questions } from './data/questions'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [error, setError] = useState(null)

  const startSurvey = () => {
    setCurrentPage('contact')
  }

  const startQuestions = () => {
    setCurrentPage('survey')
    setCurrentQuestion(0)
  }

  const backToLanding = () => {
    setCurrentPage('landing')
  }

  const selectOption = (questionId, type, value) => {
    setError(null)

    if (type === 'single') {
      setAnswers(prev => ({ ...prev, [questionId]: value }))
    } else if (type === 'text') {
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

    // For text questions, check if there's any content
    if (q.type === 'text') {
      if (!answer || !answer.trim()) {
        setError(q.id)
        return false
      }
    } else if (q.type === 'single') {
      // For single choice, check if answer exists (including 0)
      if (answer === undefined || answer === null) {
        setError(q.id)
        return false
      }
    } else if (!answer || (Array.isArray(answer) && answer.length === 0)) {
      // For multiple choice
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
      // If on first question, go back to contact page
      setCurrentPage('contact')
      setError(null)
    }
  }

  const submitSurvey = () => {
    if (!validateCurrentQuestion()) return

    // Here you would typically send answers and contact info to a backend
    console.log('Contact Info:', contactInfo)
    console.log('Survey answers:', answers)
    setCurrentPage('thankyou')
  }

  return (
    <div className="app">
      <RoughFilters />
      <Doodles />

      {currentPage === 'survey' && (
        <div className="progress">
          {currentQuestion + 1} / {questions.length}
        </div>
      )}

      {currentPage === 'landing' && (
        <LandingPage onStart={startSurvey} />
      )}

      {currentPage === 'contact' && (
        <ContactPage
          contactInfo={contactInfo}
          onUpdate={setContactInfo}
          onNext={startQuestions}
          onBack={backToLanding}
        />
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
