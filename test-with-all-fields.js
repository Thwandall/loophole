/**
 * Test submission with all correct entry IDs
 */

// Import questions to get exact option text
import { questions } from './src/data/questions.js'

const GOOGLE_FORM_CONFIG = {
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse',
  fields: {
    firstName: 'entry.1752711908',
    lastName: 'entry.1209817407',
    email: 'entry.1121227181',
    phone: 'entry.1327901941',
    question1: 'entry.1361817756',
    question2: 'entry.821105014',
    question3: 'entry.527061810',
    question4: 'entry.1210677777',
    question5: 'entry.1942153459',
    question6: 'entry.697938755',
    question7: 'entry.1010737986',
    question8: 'entry.1995184064',
    question9: 'entry.820450860',
    question10: 'entry.470721705',
    question11: 'entry.1132590371'
  }
}

async function testFullSubmission() {
  console.log('=== Testing Full Form Submission ===\n')

  const params = new URLSearchParams()

  // Contact info
  params.append(GOOGLE_FORM_CONFIG.fields.firstName, 'John')
  params.append(GOOGLE_FORM_CONFIG.fields.lastName, 'Doe')
  params.append(GOOGLE_FORM_CONFIG.fields.email, 'john@example.com')
  params.append(GOOGLE_FORM_CONFIG.fields.phone, '555-1234')

  // Question 1: Multiple choice (checkboxes) - use exact label from questions.js
  params.append(GOOGLE_FORM_CONFIG.fields.question1, questions[0].options[0]) // "Visual Arts"

  // Question 2: Single choice - use exact label
  params.append(GOOGLE_FORM_CONFIG.fields.question2, questions[1].options[1]) // "Intermediate"

  // Question 3: Single choice
  params.append(GOOGLE_FORM_CONFIG.fields.question3, questions[2].options[1]) // "Monthly"

  // Question 4: Multiple choice (checkboxes)
  params.append(GOOGLE_FORM_CONFIG.fields.question4, questions[3].options[0]) // First option

  // Question 5: Text
  params.append(GOOGLE_FORM_CONFIG.fields.question5, 'Test collaborator description')

  // Question 6: Single choice
  params.append(GOOGLE_FORM_CONFIG.fields.question6, questions[5].options[0])

  // Question 7: Multiple choice (checkboxes)
  params.append(GOOGLE_FORM_CONFIG.fields.question7, questions[6].options[0])

  // Question 8: Multiple choice (checkboxes)
  params.append(GOOGLE_FORM_CONFIG.fields.question8, questions[7].options[0])

  // Question 9: Text
  params.append(GOOGLE_FORM_CONFIG.fields.question9, 'Test frustration text')

  // Question 10: Single choice
  params.append(GOOGLE_FORM_CONFIG.fields.question10, questions[9].options[0])

  // Question 11: Single choice
  params.append(GOOGLE_FORM_CONFIG.fields.question11, questions[10].options[0])

  console.log('Payload preview:')
  for (let [key, value] of params.entries()) {
    console.log(`  ${key} = ${value}`)
  }
  console.log()

  try {
    const response = await fetch(GOOGLE_FORM_CONFIG.formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: params.toString()
    })

    console.log('Response Status:', response.status)
    console.log('Response StatusText:', response.statusText)

    if (response.status === 200) {
      console.log('\n✅ SUCCESS! Form submission worked!')
      console.log('Check your Google Form responses tab.')
    } else {
      console.log('\n❌ Failed with status:', response.status)
      const text = await response.text()
      console.log('Response preview:', text.substring(0, 300))
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

testFullSubmission()
