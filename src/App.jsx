import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import ContactPage from './components/ContactPage'
import SurveyPage from './components/SurveyPage'
import ThankYouPage from './components/ThankYouPage'
import RoughFilters from './components/RoughFilters'
import Doodles from './components/Doodles'
import { questions } from './data/questions'
import { submitToGoogleForms } from './services/googleFormsService'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    console.log('%c🎨 LOOPHOLE SURVEY DEBUG MODE 🎨', 'font-size: 20px; font-weight: bold; color: #4CAF50;')
    console.log('%cAll interactions will be logged below', 'font-size: 14px; color: #888;')
    console.log(`Total questions: ${questions.length}`)
  }, [])

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
      const newAnswers = { ...answers, [questionId]: value }
      setAnswers(newAnswers)
      console.log(`[Q${questionId}] Selected:`, value, '| All answers:', newAnswers)
    } else if (type === 'text') {
      const newAnswers = { ...answers, [questionId]: value }
      setAnswers(newAnswers)
      console.log(`[Q${questionId}] Text entered:`, value.substring(0, 50) + '...', '| All answers:', newAnswers)
    } else {
      // Multiple selection
      const current = answers[questionId] || []
      const newSelection = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      const newAnswers = { ...answers, [questionId]: newSelection }
      setAnswers(newAnswers)
      console.log(`[Q${questionId}] Multiple choice updated:`, newSelection, '| All answers:', newAnswers)
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
    console.log(`[Navigation] Attempting to go from Q${currentQuestion + 1} to Q${currentQuestion + 2}`)
    if (!validateCurrentQuestion()) {
      console.log('[Navigation] Validation failed, staying on current question')
      return
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setError(null)
      console.log(`[Navigation] Moved to Q${currentQuestion + 2}`)
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

  const submitSurvey = async () => {
    console.log('='.repeat(60))
    console.log('[SUBMIT] Submit button clicked!')
    console.log('[SUBMIT] Final answers:', answers)
    console.log('[SUBMIT] Contact info:', contactInfo)
    console.log('='.repeat(60))

    if (!validateCurrentQuestion()) {
      console.log('[SUBMIT] Validation failed, cannot submit')
      return
    }

    // Set loading state
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Submit to Google Forms
      console.log('[SUBMIT] Calling submitToGoogleForms...')
      await submitToGoogleForms(contactInfo, answers)

      console.log('[SUBMIT] ✓ Submission successful! Moving to thank you page...')
      // Navigate to thank you page on success
      setCurrentPage('thankyou')

    } catch (error) {
      console.error('[SUBMIT] ✗ Submission failed:', error)
      setSubmitError('Failed to submit survey. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
          submitError={submitError}
          isSubmitting={isSubmitting}
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
