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
  // TODO: Replace with your actual form URL
  formUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/formResponse',

  fields: {
    // Contact Information (4 fields)
    firstName: 'entry.REPLACE_ME_1',    // TODO: Replace with actual entry ID
    lastName: 'entry.REPLACE_ME_2',     // TODO: Replace with actual entry ID
    email: 'entry.REPLACE_ME_3',        // TODO: Replace with actual entry ID
    phone: 'entry.REPLACE_ME_4',        // TODO: Replace with actual entry ID (optional field)

    // Survey Questions (10 fields)
    question1: 'entry.REPLACE_ME_5',    // Q1: Primary creative field (multiple)
    question2: 'entry.REPLACE_ME_6',    // Q2: Experience level (single)
    question3: 'entry.REPLACE_ME_7',    // Q3: Collaboration frequency (single)
    question4: 'entry.REPLACE_ME_8',    // Q4: Collaboration barriers (multiple, max 3)
    question5: 'entry.REPLACE_ME_9',    // Q5: Types of collaborators (text)
    question6: 'entry.REPLACE_ME_10',   // Q6: Important factor (single)
    question7: 'entry.REPLACE_ME_11',   // Q7: Platform features (multiple)
    question8: 'entry.REPLACE_ME_12',   // Q8: Discovery methods (multiple)
    question9: 'entry.REPLACE_ME_13',   // Q9: Biggest frustration (text)
    question10: 'entry.REPLACE_ME_14'   // Q10: Likelihood to use (single)
  }
}

// Import questions to get option labels
import { questions } from '../data/questions'

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
    // Create FormData object
    const formData = new FormData()

    // Add contact information
    formData.append(GOOGLE_FORM_CONFIG.fields.firstName, contactInfo.firstName)
    formData.append(GOOGLE_FORM_CONFIG.fields.lastName, contactInfo.lastName)
    formData.append(GOOGLE_FORM_CONFIG.fields.email, contactInfo.email)

    // Phone is optional
    if (contactInfo.phone && contactInfo.phone.trim()) {
      formData.append(GOOGLE_FORM_CONFIG.fields.phone, contactInfo.phone)
    }

    // Add survey answers with label conversion
    for (let i = 1; i <= 10; i++) {
      const fieldKey = `question${i}`
      const entryId = GOOGLE_FORM_CONFIG.fields[fieldKey]
      const answer = answers[i]

      if (answer !== undefined && answer !== null) {
        const formattedAnswer = convertAnswerToLabels(i, answer)
        if (formattedAnswer) {
          formData.append(entryId, formattedAnswer)
        }
      }
    }

    // Log the data being sent (for debugging)
    console.log('Submitting to Google Forms...')
    console.log('Contact Info:', contactInfo)
    console.log('Formatted Answers:', Object.fromEntries(
      Object.entries(answers).map(([id, value]) => [
        `Q${id}`,
        convertAnswerToLabels(parseInt(id), value)
      ])
    ))

    // Submit to Google Forms
    // Note: Google Forms returns a CORS error, but the submission still works
    // We use 'no-cors' mode to suppress the error
    await fetch(GOOGLE_FORM_CONFIG.formUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Required for Google Forms - prevents CORS errors
    })

    // In no-cors mode, we can't read the response, but if no error was thrown,
    // the submission was successful
    console.log('✓ Survey submitted successfully!')
    return true

  } catch (error) {
    console.error('Error submitting to Google Forms:', error)
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
    for (let i = 1; i <= 10; i++) {
      const fieldKey = `question${i}`
      const entryId = GOOGLE_FORM_CONFIG.fields[fieldKey]
      const answer = answers[i]

      if (answer !== undefined && answer !== null) {
        const formattedAnswer = convertAnswerToLabels(i, answer)
        if (formattedAnswer) {
          params.append(entryId, formattedAnswer)
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
