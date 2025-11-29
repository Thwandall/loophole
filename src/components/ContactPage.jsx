import { useState } from 'react'
import NavArrow from './NavArrow'
import './ContactPage.css'

function ContactPage({ onNext, onBack, contactInfo, onUpdate }) {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (field, value) => {
    onUpdate({ ...contactInfo, [field]: value })
    if (touched[field]) {
      validateField(field, value)
    }
  }

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true })
    validateField(field, contactInfo[field])
  }

  const validateField = (field, value) => {
    const newErrors = { ...errors }

    if (field === 'firstName') {
      if (!value || !value.trim()) {
        newErrors.firstName = 'First name is required'
      } else {
        delete newErrors.firstName
      }
    }

    if (field === 'lastName') {
      if (!value || !value.trim()) {
        newErrors.lastName = 'Last name is required'
      } else {
        delete newErrors.lastName
      }
    }

    if (field === 'email') {
      if (!value || !value.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email = 'Please enter a valid email'
      } else {
        delete newErrors.email
      }
    }

    if (field === 'phone' && value && value.trim()) {
      // Basic phone validation if provided
      const phoneRegex = /^[\d\s\-\+\(\)]+$/
      if (!phoneRegex.test(value)) {
        newErrors.phone = 'Please enter a valid phone number'
      } else {
        delete newErrors.phone
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateAll = () => {
    const fields = ['firstName', 'lastName', 'email']
    let isValid = true

    fields.forEach(field => {
      if (!validateField(field, contactInfo[field])) {
        isValid = false
      }
    })

    // Mark all required fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true
    })

    return isValid
  }

  const handleNext = () => {
    if (validateAll()) {
      onNext()
    }
  }

  return (
    <div className="page page--active">
      <div className="contact-content">
        <div className="contact-header scribble-text">
          Let's get to know you!
        </div>

        <div className="contact-form">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className={`form-input ${errors.firstName && touched.firstName ? 'form-input--error' : ''}`}
              value={contactInfo.firstName || ''}
              onChange={(e) => handleChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
              placeholder="Your first name"
            />
            {errors.firstName && touched.firstName && (
              <div className="field-error">{errors.firstName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className={`form-input ${errors.lastName && touched.lastName ? 'form-input--error' : ''}`}
              value={contactInfo.lastName || ''}
              onChange={(e) => handleChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              placeholder="Your last name"
            />
            {errors.lastName && touched.lastName && (
              <div className="field-error">{errors.lastName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`form-input ${errors.email && touched.email ? 'form-input--error' : ''}`}
              value={contactInfo.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="your.email@example.com"
            />
            {errors.email && touched.email && (
              <div className="field-error">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone <span className="optional-text">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              className={`form-input ${errors.phone && touched.phone ? 'form-input--error' : ''}`}
              value={contactInfo.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              placeholder="(123) 456-7890"
            />
            {errors.phone && touched.phone && (
              <div className="field-error">{errors.phone}</div>
            )}
          </div>
        </div>

        <div className="nav-arrows">
          <button
            className="nav-btn"
            onClick={onBack}
          >
            <NavArrow direction="left" />
          </button>

          <button className="nav-btn" onClick={handleNext}>
            <NavArrow direction="right" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
