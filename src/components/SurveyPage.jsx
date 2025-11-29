import RadioCircle from './RadioCircle'
import Checkbox from './Checkbox'
import NavArrow from './NavArrow'
import SubmitButton from './SubmitButton'
import './SurveyPage.css'

function SurveyPage({
  question,
  questionIndex,
  answers,
  error,
  submitError,
  isSubmitting,
  onSelect,
  onNext,
  onPrev,
  onSubmit,
  isFirst,
  isLast
}) {
  const currentAnswer = answers[question.id]

  const isSelected = (index) => {
    if (question.type === 'single') {
      return currentAnswer === index
    }
    return currentAnswer?.includes(index)
  }

  const handleTextChange = (value) => {
    onSelect(question.id, 'text', value)
  }

  const canSelectMore = () => {
    if (question.type !== 'multiple' || !question.maxSelections) {
      return true
    }
    const currentSelections = currentAnswer?.length || 0
    return currentSelections < question.maxSelections
  }

  const handleOptionClick = (index) => {
    if (question.type === 'multiple' && !isSelected(index) && !canSelectMore()) {
      return // Don't allow more selections
    }
    onSelect(question.id, question.type, index)
  }

  return (
    <div className="page page--active">
      <div className="survey-content">
        <div className="question-number scribble-text">
          Question {question.id}
        </div>

        <div className="question-text scribble-text">
          {question.text}
        </div>

        {question.hint && (
          <div className="question-hint">{question.hint}</div>
        )}

        {question.type === 'text' ? (
          <div className="text-input-container">
            <textarea
              className="text-input"
              value={currentAnswer || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={question.placeholder || 'Type your answer here...'}
              rows={6}
            />
          </div>
        ) : (
          <div className="options">
            {question.options.map((option, index) => {
              const disabled = question.type === 'multiple' && !isSelected(index) && !canSelectMore()
              return (
                <div
                  key={index}
                  className={`option option--${index + 1} ${isSelected(index) ? 'option--selected' : ''} ${disabled ? 'option--disabled' : ''}`}
                  onClick={() => handleOptionClick(index)}
                >
                  {question.type === 'single' ? (
                    <RadioCircle selected={isSelected(index)} />
                  ) : (
                    <Checkbox selected={isSelected(index)} />
                  )}
                  <span className="option-text">{option}</span>
                </div>
              )
            })}
          </div>
        )}

        {question.maxSelections && question.type === 'multiple' && (
          <div className="selection-counter">
            {currentAnswer?.length || 0} / {question.maxSelections} selected
          </div>
        )}

        <div className={`error-msg ${error === question.id ? 'error-msg--show' : ''}`}>
          {question.type === 'text' ? 'please write something!' : 'please pick something!'}
        </div>

        <div className="nav-arrows">
          <button
            className="nav-btn"
            onClick={onPrev}
            disabled={isSubmitting}
          >
            <NavArrow direction="left" />
          </button>

          {isLast ? (
            <div className="submit-area">
              <SubmitButton
                onClick={onSubmit}
                disabled={isSubmitting}
              />
              {isSubmitting && (
                <div className="submitting-message">
                  Submitting your survey...
                </div>
              )}
              {submitError && !isSubmitting && (
                <div className="submit-error-message">
                  {submitError}
                </div>
              )}
            </div>
          ) : (
            <button className="nav-btn" onClick={onNext}>
              <NavArrow direction="right" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SurveyPage
