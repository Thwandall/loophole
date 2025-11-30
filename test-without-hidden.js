/**
 * Test exact production data WITHOUT hidden fields
 */

const GOOGLE_FORM_CONFIG = {
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse',
}

async function testWithoutHidden() {
  console.log('=== Testing Production Data WITHOUT Hidden Fields ===\n')

  const params = new URLSearchParams()

  // Exact same contact info
  params.append('entry.1752711908', 'tpp')
  params.append('entry.1209817407', 'gui')
  params.append('entry.1121227181', 'thwandallphilemon@gmail.com')

  // Exact same questions
  params.append('entry.1361817756', 'Visual Arts')
  params.append('entry.821105014', 'Professional')
  params.append('entry.527061810', 'Rarely / Never')
  params.append('entry.1210677777', 'Other')
  params.append('entry.1942153459', 'bj')
  params.append('entry.697938755', 'Personality / communication')
  params.append('entry.1010737986', 'Contracts / clear deliverables')
  params.append('entry.1995184064', "I don't — I rarely collaborate")
  params.append('entry.820450860', 'jbhj')
  params.append('entry.470721705', 'Unlikely')
  params.append('entry.1132590371', 'No, not right now')

  // NO hidden fields
  // NO sentinel fields

  console.log('Sending without any hidden/sentinel fields...\n')

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
      console.log('✅ SUCCESS! The hidden fields are the problem!')
      console.log('👉 Remove all hidden fields and sentinel fields from server.js')
    } else {
      console.log('❌ Still failing, might be a different issue')
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

testWithoutHidden()
