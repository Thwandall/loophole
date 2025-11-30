/**
 * Test what happens when we add the hidden fields
 */

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

async function testWithHiddenFields() {
  console.log('=== Testing WITH Hidden Fields ===\n')

  const params = new URLSearchParams()

  // Contact info
  params.append(GOOGLE_FORM_CONFIG.fields.firstName, 'Jane')
  params.append(GOOGLE_FORM_CONFIG.fields.lastName, 'Smith')
  params.append(GOOGLE_FORM_CONFIG.fields.email, 'jane@example.com')
  params.append(GOOGLE_FORM_CONFIG.fields.phone, '555-5678')

  // All questions (same as before)
  params.append(GOOGLE_FORM_CONFIG.fields.question1, questions[0].options[1])
  params.append(GOOGLE_FORM_CONFIG.fields.question2, questions[1].options[2])
  params.append(GOOGLE_FORM_CONFIG.fields.question3, questions[2].options[0])
  params.append(GOOGLE_FORM_CONFIG.fields.question4, questions[3].options[1])
  params.append(GOOGLE_FORM_CONFIG.fields.question5, 'Looking for designers')
  params.append(GOOGLE_FORM_CONFIG.fields.question6, questions[5].options[2])
  params.append(GOOGLE_FORM_CONFIG.fields.question7, questions[6].options[1])
  params.append(GOOGLE_FORM_CONFIG.fields.question8, questions[7].options[1])
  params.append(GOOGLE_FORM_CONFIG.fields.question9, 'Communication is hard')
  params.append(GOOGLE_FORM_CONFIG.fields.question10, questions[9].options[1])
  params.append(GOOGLE_FORM_CONFIG.fields.question11, questions[10].options[1])

  // NOW ADD THE HIDDEN FIELDS from your production code
  const nowTs = Date.now().toString()
  const fbzx = '-5317851297175260938'

  params.append('fvv', '1')
  params.append('pageHistory', '0')
  params.append('fbzx', fbzx)
  params.append('dlut', nowTs)
  params.append('submissionTimestamp', nowTs)
  params.append('partialResponse', JSON.stringify([null, null, fbzx]))

  // Sentinel fields
  const sentinelFields = [
    'entry.1361817756_sentinel',
    'entry.821105014_sentinel',
    'entry.527061810_sentinel',
    'entry.1210677777_sentinel',
    'entry.697938755_sentinel',
    'entry.1010737986_sentinel',
    'entry.1995184064_sentinel',
    'entry.470721705_sentinel',
    'entry.1132590371_sentinel'
  ]
  sentinelFields.forEach((name) => {
    params.append(name, '')
  })

  console.log('Added hidden fields:')
  console.log('  fvv, pageHistory, fbzx, dlut, submissionTimestamp, partialResponse')
  console.log('  + 9 sentinel fields\n')

  try {
    const response = await fetch(GOOGLE_FORM_CONFIG.formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: params.toString()
    })

    console.log('Response Status:', response.status)

    if (response.status === 200) {
      console.log('✅ Still works WITH hidden fields!')
    } else {
      console.log('❌ Hidden fields caused a', response.status, 'error')
      console.log('The hidden fields are the problem!')
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

async function testWithU0Url() {
  console.log('\n=== Testing WITH /u/0/ in URL ===\n')

  const formUrlWithU0 = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

  const params = new URLSearchParams()
  params.append(GOOGLE_FORM_CONFIG.fields.firstName, 'Test')
  params.append(GOOGLE_FORM_CONFIG.fields.lastName, 'User3')
  params.append(GOOGLE_FORM_CONFIG.fields.email, 'test3@example.com')
  params.append(GOOGLE_FORM_CONFIG.fields.question1, questions[0].options[0])
  params.append(GOOGLE_FORM_CONFIG.fields.question2, questions[1].options[0])
  params.append(GOOGLE_FORM_CONFIG.fields.question3, questions[2].options[0])
  params.append(GOOGLE_FORM_CONFIG.fields.question4, questions[3].options[0])
  params.append(GOOGLE_FORM_CONFIG.fields.question5, 'test')
  params.append(GOOGLE_FORM_CONFIG.fields.question6, questions[5].options[0])
  params.append(GOOGLE_FORM_CONFIG.fields.question7, questions[6].options[0])
  params.append(GOOGLE_FORM_CONFIG.fields.question8, questions[7].options[0])
  params.append(GOOGLE_FORM_CONFIG.fields.question9, 'test')
  params.append(GOOGLE_FORM_CONFIG.fields.question10, questions[9].options[0])
  params.append(GOOGLE_FORM_CONFIG.fields.question11, questions[10].options[0])

  try {
    const response = await fetch(formUrlWithU0, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: params.toString()
    })

    console.log('Response Status:', response.status)

    if (response.status === 200) {
      console.log('✅ The /u/0/ URL works fine!')
    } else {
      console.log('❌ The /u/0/ URL causes a', response.status, 'error')
      console.log('You need to change the URL!')
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

(async () => {
  await testWithHiddenFields()
  await testWithU0Url()
})()
