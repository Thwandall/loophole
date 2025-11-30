/**
 * Test if Google Forms accepts multiple selections for checkbox questions
 */

const GOOGLE_FORM_CONFIG = {
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse',
}

async function testWithMultipleSelections() {
  console.log('=== Test 1: Multiple selections (like production) ===\n')

  const params1 = new URLSearchParams()
  params1.append('entry.1752711908', 'Test')
  params1.append('entry.1209817407', 'User')
  params1.append('entry.1121227181', 'test@example.com')
  
  // Question 1: Multiple selections
  params1.append('entry.1361817756', 'Writing')
  params1.append('entry.1361817756', 'Tech / Digital Art')
  
  // Rest with single values
  params1.append('entry.821105014', 'Advanced')
  params1.append('entry.527061810', 'A few times a year')
  params1.append('entry.1210677777', 'Communication issues')
  params1.append('entry.1942153459', 'test')
  params1.append('entry.697938755', 'Personality / communication')
  params1.append('entry.1010737986', 'Contracts / clear deliverables')
  params1.append('entry.1995184064', "I don't — I rarely collaborate")
  params1.append('entry.820450860', 'test')
  params1.append('entry.470721705', 'Unlikely')
  params1.append('entry.1132590371', 'No, not right now')

  try {
    const response = await fetch(GOOGLE_FORM_CONFIG.formUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: params1.toString()
    })

    console.log('Response Status:', response.status)
    if (response.status === 200) {
      console.log('✅ Multiple selections work!')
    } else {
      console.log('❌ Multiple selections cause 400')
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

async function testWithAllSingleSelections() {
  console.log('\n=== Test 2: All single selections ===\n')

  const params2 = new URLSearchParams()
  params2.append('entry.1752711908', 'Test2')
  params2.append('entry.1209817407', 'User2')
  params2.append('entry.1121227181', 'test2@example.com')
  
  // Question 1: SINGLE selection only
  params2.append('entry.1361817756', 'Writing')
  
  // Rest with single values
  params2.append('entry.821105014', 'Advanced')
  params2.append('entry.527061810', 'A few times a year')
  params2.append('entry.1210677777', 'Communication issues')
  params2.append('entry.1942153459', 'test')
  params2.append('entry.697938755', 'Personality / communication')
  params2.append('entry.1010737986', 'Contracts / clear deliverables')
  params2.append('entry.1995184064', "I don't — I rarely collaborate")
  params2.append('entry.820450860', 'test')
  params2.append('entry.470721705', 'Unlikely')
  params2.append('entry.1132590371', 'No, not right now')

  try {
    const response = await fetch(GOOGLE_FORM_CONFIG.formUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: params2.toString()
    })

    console.log('Response Status:', response.status)
    if (response.status === 200) {
      console.log('✅ Single selections work!')
    } else {
      console.log('❌ Single selections also fail')
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

(async () => {
  await testWithMultipleSelections()
  await testWithAllSingleSelections()
})()
