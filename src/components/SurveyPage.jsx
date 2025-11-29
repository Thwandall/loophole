import RadioCircle from './RadioCircle'
import Checkbox from './Checkbox'
import NavArrow from './NavArrow'
import SubmitButton from './SubmitButton'
import './SurveyPage.css'

const rotations = [-0.8, 0.5, -1, 0.7, -0.4, 0.9, -0.6, 0.4, -0.7, 0.6]

function SurveyPage({ 
  question, 
  questionIndex, 
  answers, 
  error,
  onSelect, 
  onNext, 
  onPrev, 
  onSubmit,
  isFirst,
  isLast 
}) {
  const rotation = rotations[questionIndex % rotations.length]
  const currentAnswer = answers[question.id]

  const isSelected = (index) => {
    if (question.type === 'single') {
      return currentAnswer === index
    }
    return currentAnswer?.includes(index)
  }

  return (
    <div className="page page--active">
      <div className="survey-content" style={{ transform: `rotate(${rotation}deg)` }}>
        <div className="question-number scribble-text">
          Question {question.id}
        </div>
        
        <div className="question-text scribble-text">
          {question.text}
        </div>
        
        {question.hint && (
          <div className="question-hint">{question.hint}</div>
        )}
        
        <div className="options">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option option--${index + 1} ${isSelected(index) ? 'option--selected' : ''}`}
              onClick={() => onSelect(question.id, question.type, index)}
            >
              {question.type === 'single' ? (
                <RadioCircle selected={isSelected(index)} />
              ) : (
                <Checkbox selected={isSelected(index)} />
              )}
              <span className="option-text">{option}</span>
            </div>
          ))}
        </div>
        
        <div className={`error-msg ${error === question.id ? 'error-msg--show' : ''}`}>
          please pick something!
        </div>
        
        <div className="nav-arrows">
          <button
            className="nav-btn"
            onClick={onPrev}
          >
            <NavArrow direction="left" />
          </button>
          
          {isLast ? (
            <SubmitButton onClick={onSubmit} />
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
