/**
 * Test with EXACT same payload structure as production
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

async function testExactPayload() {
  console.log('=== Testing EXACT Production Payload (without phone) ===\n')

  const params = new URLSearchParams()

  // Contact info - NO PHONE (mimicking your production issue)
  params.append('entry.1752711908', 'tpp')
  params.append('entry.1209817407', 'gui')
  params.append('entry.1121227181', 'thwandallphilemon@gmail.com')
  // Skipping phone just like production does

  // Questions (using exact values from your debug output)
  params.append('entry.1361817756', 'Visual Arts')
  params.append('entry.821105014', 'Professional')
  params.append('entry.527061810', 'Rarely / Never')
  params.append('entry.1210677777', 'Other')
  params.append('entry.1942153459', 'bj')
  params.append('entry.697938755', 'Personality / communication')
  params.append('entry.1010737986', 'Contracts / clear deliverables')
  params.append('entry.1995184064', 'I don\'t — I rarely collaborate')
  params.append('entry.820450860', 'jbhj')
  params.append('entry.470721705', 'Unlikely')
  params.append('entry.1132590371', 'No, not right now')

  // Hidden fields
  params.append('fvv', '1')
  params.append('pageHistory', '0')
  params.append('fbzx', '-5317851297175260938')
  params.append('submissionTimestamp', '1764469287807')

  // Sentinel fields (exactly as in production)
  params.append('entry.1361817756_sentinel', '')
  params.append('entry.821105014_sentinel', '')
  params.append('entry.527061810_sentinel', '')
  params.append('entry.1210677777_sentinel', '')
  params.append('entry.697938755_sentinel', '')
  params.append('entry.1010737986_sentinel', '')
  params.append('entry.1995184064_sentinel', '')
  params.append('entry.470721705_sentinel', '')
  params.append('entry.1132590371_sentinel', '')

  console.log('Sending EXACT production payload...\n')

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
      console.log('✅ Works! So the issue is NOT with the payload structure')
    } else {
      console.log('❌ Reproduced the 400 error!')
      const text = await response.text()
      console.log('Error response:', text.substring(0, 300))
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

async function testWithContactSentinels() {
  console.log('\n=== Testing WITH Contact Field Sentinels ===\n')

  const params = new URLSearchParams()

  // Contact info
  params.append('entry.1752711908', 'tpp2')
  params.append('entry.1209817407', 'gui2')
  params.append('entry.1121227181', 'test2@example.com')

  // Questions
  params.append('entry.1361817756', 'Visual Arts')
  params.append('entry.821105014', 'Professional')
  params.append('entry.527061810', 'Rarely / Never')
  params.append('entry.1210677777', 'Other')
  params.append('entry.1942153459', 'test text')
  params.append('entry.697938755', 'Personality / communication')
  params.append('entry.1010737986', 'Contracts / clear deliverables')
  params.append('entry.1995184064', 'I don\'t — I rarely collaborate')
  params.append('entry.820450860', 'test frustration')
  params.append('entry.470721705', 'Unlikely')
  params.append('entry.1132590371', 'No, not right now')

  // Hidden fields
  params.append('fvv', '1')
  params.append('pageHistory', '0')
  params.append('fbzx', '-5317851297175260938')
  params.append('submissionTimestamp', Date.now().toString())

  // ALL sentinel fields (including contact fields)
  params.append('entry.1752711908_sentinel', '')
  params.append('entry.1209817407_sentinel', '')
  params.append('entry.1121227181_sentinel', '')
  params.append('entry.1327901941_sentinel', '')
  params.append('entry.1361817756_sentinel', '')
  params.append('entry.821105014_sentinel', '')
  params.append('entry.527061810_sentinel', '')
  params.append('entry.1210677777_sentinel', '')
  params.append('entry.697938755_sentinel', '')
  params.append('entry.1010737986_sentinel', '')
  params.append('entry.1995184064_sentinel', '')
  params.append('entry.470721705_sentinel', '')
  params.append('entry.1132590371_sentinel', '')

  console.log('Testing with ALL sentinel fields including contact...\n')

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
      console.log('✅ This might be the fix!')
    } else {
      console.log('❌ Still getting 400')
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

(async () => {
  await testExactPayload()
  await testWithContactSentinels()
})()
