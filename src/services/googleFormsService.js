// Google Forms configuration
// TODO: Replace these placeholder values with your actual Google Form details
//
// HOW TO GET YOUR FORM DETAILS:
// 1. Create your Google Form at https://forms.google.com
// 2. Get the form URL (looks like: https://docs.google.com/forms/d/e/FORM_ID/viewform)
// 3. Replace '/viewform' with '/formResponse' to get the submission URL
// 4. Right-click the form → View Page Source
// 5. Search for 'entry.' to find all the entry IDs
// 6. Replace the placeholder entry IDs below with your real ones

const GOOGLE_FORM_CONFIG = {
  // Google Form submission URL
  // Use the same path as the browser's native submission (/forms/u/0/d/e/.../formResponse)
  formUrl: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse',

  // Mapping between our logical field names and Google Forms entry IDs
  fields: {
    // Contact Information (4 fields)
    firstName: 'entry.1752711908',      // First Name
    lastName: 'entry.1209817407',       // Last Name
    email: 'entry.1121227181',          // Email
    phone: 'entry.1327901941',          // Phone (optional)

    // Survey Questions (11 fields)
    // NOTE: Question 1 is configured as checkboxes (multiple choice) in questions.js
    question1: 'entry.1361817756',      // Q1: Primary creative field (checkboxes)
    question2: 'entry.821105014',       // Q2: Experience level (single choice)
    question3: 'entry.527061810',       // Q3: Collaboration frequency (single choice)
    question4: 'entry.1210677777',      // Q4: Collaboration barriers (checkboxes)
    question5: 'entry.1942153459',      // Q5: Types of collaborators (text)
    question6: 'entry.697938755',       // Q6: Important factor (single choice)
    question7: 'entry.1010737986',      // Q7: Platform features (checkboxes)
    question8: 'entry.1995184064',      // Q8: Discovery methods (checkboxes)
    question9: 'entry.820450860',       // Q9: Biggest frustration (text)
    question10: 'entry.470721705',      // Q10: Likelihood to use (single choice)
    question11: 'entry.1132590371'      // Q11: Open to interview (single choice)
  },

  // NOTE: No hidden fields or sentinel fields are needed for this form!
  // Google Forms accepts submissions with just the entry IDs and their values.
}

// Import questions to get option labels
import { questions } from '../data/questions'

/**
 * Basic runtime validation for the Google Forms configuration.
 * This helps catch misconfiguration issues that would prevent
 * submissions from ever reaching your form.
 *
 * @returns {boolean} - True if the config looks valid
 */
function validateGoogleFormConfig() {
  const url = GOOGLE_FORM_CONFIG?.formUrl
  const fields = GOOGLE_FORM_CONFIG?.fields

  if (!url || typeof url !== 'string') {
    console.error('[GoogleForms] Missing or invalid formUrl in GOOGLE_FORM_CONFIG')
    return false
  }

  if (!url.includes('/formResponse')) {
    console.error(
      '[GoogleForms] formUrl does not point to /formResponse. ' +
      'Please follow GOOGLE_FORMS_SETUP.md to use the correct URL.'
    )
    return false
  }

  if (!fields || typeof fields !== 'object') {
    console.error('[GoogleForms] Missing fields mapping in GOOGLE_FORM_CONFIG')
    return false
  }

  // No hidden fields validation needed - we don't use them anymore!

  const requiredFieldKeys = [
    'firstName',
    'lastName',
    'email',
    // Phone is optional on the form, but we still expect an entry id
    'phone'
  ]

  let valid = true

  requiredFieldKeys.forEach((key) => {
    if (!fields[key]) {
      console.error(`[GoogleForms] Missing entry id for required field: ${key}`)
      valid = false
    }
  })

  // Warn (but do not fail) if any survey question mapping is missing
  for (let i = 1; i <= 11; i++) {
    const fieldKey = `question${i}`
    if (!fields[fieldKey]) {
      console.warn(
        `[GoogleForms] No entry id configured for ${fieldKey}. ` +
        'If this question is required in your Google Form, submissions will fail.'
      )
    }
  }

  return valid
}

/**
 * Converts option indices to human-readable labels for Google Forms
 * @param {number} questionId - The question ID (1-10)
 * @param {number|number[]|string} value - The option index, array of indices, or text
 * @returns {string} - Human-readable label(s) for Google Forms
 */
function convertAnswerToLabels(questionId, value) {
  const question = questions.find(q => q.id === questionId)

  if (!question) {
    console.warn(`Question ${questionId} not found`)
    return ''
  }

  // For text inputs, return as-is
  if (question.type === 'text') {
    return value || ''
  }

  // For single choice, convert index to label
  if (question.type === 'single') {
    if (value === undefined || value === null) return ''
    return question.options[value] || ''
  }

  // For multiple choice, convert array of indices to comma-separated labels
  if (question.type === 'multiple') {
    if (!Array.isArray(value)) return ''
    return value
      .map(index => question.options[index])
      .filter(Boolean)
      .join(', ')
  }

  return ''
}

/**
 * Submits survey data to Google Forms
 * @param {Object} contactInfo - Contact information {firstName, lastName, email, phone}
 * @param {Object} answers - Survey answers {1: value, 2: value, ...}
 * @returns {Promise<boolean>} - Success status
 */
export async function submitToGoogleForms(contactInfo, answers) {
  try {
    console.group('[GoogleForms] submitToGoogleForms')

    // --- Stage 0: Basic argument validation ---------------------------------
    if (!contactInfo || typeof contactInfo !== 'object') {
      console.error('[GoogleForms] Invalid contactInfo argument:', contactInfo)
      throw new Error('Invalid contact information provided')
    }

    if (!answers || typeof answers !== 'object') {
      console.error('[GoogleForms] Invalid answers argument:', answers)
      throw new Error('Invalid survey answers provided')
    }

    // Protect against misconfigured form URL / field ids
    console.log('[GoogleForms] Stage 0: Validating Google Form configuration...')
    const configIsValid = validateGoogleFormConfig()
    console.log('[GoogleForms] Config validation result:', configIsValid)
    if (!configIsValid) {
      throw new Error(
        'Google Form configuration is invalid. ' +
        'Double‑check GOOGLE_FORMS_SETUP.md and your entry ids / form URL.'
      )
    }

    // --- Stage 1: Prepare data for backend -----------------------------
    console.log('[GoogleForms] Stage 1: Preparing data to send to backend...')
    console.log('Contact Info:', contactInfo)
    console.log('Raw Answers:', answers)
    console.log('Formatted Answers:', Object.fromEntries(
      Object.entries(answers).map(([id, value]) => [
        `Q${id}`,
        convertAnswerToLabels(parseInt(id), value)
      ])
    ))

    // --- Stage 2: Send request to backend proxy -----------------------------
    console.log('[GoogleForms] Stage 2: Sending request to backend /api/submit-survey...')

    // Instead of calling Google Forms directly (which has CORS / cookie issues),
    // we send a JSON payload to our own backend, which then forwards it server-side.
    const backendPayload = {
      contactInfo,
      answers,
      formattedAnswers: Object.fromEntries(
        Object.entries(answers).map(([id, value]) => [
          parseInt(id, 10),
          convertAnswerToLabels(parseInt(id, 10), value)
        ])
      )
    }

    const apiUrl = import.meta.env.VITE_API_URL || '/api'
    const backendResponse = await fetch(`${apiUrl}/api/submit-survey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(backendPayload)
    })

    if (!backendResponse.ok) {
      console.error('[GoogleForms] Backend /api/submit-survey responded with non-OK status:', backendResponse.status)
      throw new Error('Backend failed to submit survey to Google Forms')
    }

    console.log('[GoogleForms] Stage 3: Backend acknowledged successful submission.')
    console.log('[GoogleForms] ✓ Survey submission request was sent to backend proxy.')
    console.groupEnd()
    return true

  } catch (error) {
    console.error('[GoogleForms] ✗ Error submitting to Google Forms:', error)
    try {
      console.groupEnd()
    } catch {
      // groupEnd can throw if no group is open; ignore
    }
    throw new Error('Failed to submit survey. Please try again.')
  }
}

/**
 * Alternative implementation using URLSearchParams (backup method)
 * Use this if FormData approach doesn't work
 */
export async function submitToGoogleFormsAlt(contactInfo, answers) {
  try {
    const params = new URLSearchParams()

    // Add contact information
    params.append(GOOGLE_FORM_CONFIG.fields.firstName, contactInfo.firstName)
    params.append(GOOGLE_FORM_CONFIG.fields.lastName, contactInfo.lastName)
    params.append(GOOGLE_FORM_CONFIG.fields.email, contactInfo.email)

    if (contactInfo.phone && contactInfo.phone.trim()) {
      params.append(GOOGLE_FORM_CONFIG.fields.phone, contactInfo.phone)
    }

    // Add survey answers
    for (let i = 1; i <= 11; i++) {
      const fieldKey = `question${i}`
      const entryId = GOOGLE_FORM_CONFIG.fields[fieldKey]
      const answer = answers[i]
      const question = questions.find(q => q.id === i)

      if (answer !== undefined && answer !== null && question) {
        // For multiple choice questions, append each selected option separately
        if (question.type === 'multiple' && Array.isArray(answer)) {
          answer.forEach(index => {
            const label = question.options[index]
            if (label) {
              params.append(entryId, label)
            }
          })
        } else {
          // For single choice and text questions, use the converted label
          const formattedAnswer = convertAnswerToLabels(i, answer)
          if (formattedAnswer) {
            params.append(entryId, formattedAnswer)
          }
        }
      }
    }

    const url = `${GOOGLE_FORM_CONFIG.formUrl}?${params.toString()}`

    await fetch(url, {
      method: 'GET',
      mode: 'no-cors'
    })

    return true

  } catch (error) {
    console.error('Error submitting to Google Forms (alt method):', error)
    throw new Error('Failed to submit survey. Please try again.')
  }
}
