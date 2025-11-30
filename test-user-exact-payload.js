/**
 * Test the EXACT payload from user's backend log
 */

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

async function testUserPayload() {
  console.log('=== Testing EXACT user payload from backend log ===\n')

  const params = new URLSearchParams()

  // Exact from user log
  params.append('entry.1752711908', 'jkh')
  params.append('entry.1209817407', 'hjn')
  params.append('entry.1121227181', 'thwandallphilemon@gmail.com')
  params.append('entry.1361817756', 'Tech / Digital Art')
  params.append('entry.1361817756', 'Writing')
  params.append('entry.821105014', 'Advanced')
  params.append('entry.527061810', 'Rarely / Never')
  params.append('entry.1210677777', 'Mismatched expectations')
  params.append('entry.1210677777', 'Trust issues')
  params.append('entry.1942153459', 'kn')
  params.append('entry.697938755', 'Shared creative goals')
  params.append('entry.1010737986', 'Contracts / clear deliverables')
  params.append('entry.1010737986', 'Reputation / reliability scores')
  params.append('entry.1995184064', "I don't — I rarely collaborate")
  params.append('entry.820450860', 'in')
  params.append('entry.470721705', 'Unlikely')
  params.append('entry.1132590371', 'No, not right now')

  console.log('Payload:')
  for (let [key, value] of params.entries()) {
    console.log(`  ${key} = ${value}`)
  }
  console.log()

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })

  console.log('Response Status:', response.status)

  if (response.status === 200) {
    console.log('✅ User payload works!')
    console.log('👉 The issue might be in how the backend constructs the payload')
  } else {
    console.log('❌ User payload fails')
    console.log('👉 Need to find which field causes the issue')

    // Try with exact quote in "I don't"
    console.log('\n=== Testing with different quote character ===')
    const params2 = new URLSearchParams()
    params2.append('entry.1752711908', 'jkh2')
    params2.append('entry.1209817407', 'hjn2')
    params2.append('entry.1121227181', 'test@example.com')
    params2.append('entry.1361817756', 'Tech / Digital Art')
    params2.append('entry.1361817756', 'Writing')
    params2.append('entry.821105014', 'Advanced')
    params2.append('entry.527061810', 'Rarely / Never')
    params2.append('entry.1210677777', 'Mismatched expectations')
    params2.append('entry.1210677777', 'Trust issues')
    params2.append('entry.1942153459', 'kn')
    params2.append('entry.697938755', 'Shared creative goals')
    params2.append('entry.1010737986', 'Contracts / clear deliverables')
    params2.append('entry.1010737986', 'Reputation / reliability scores')
    params2.append('entry.1995184064', "I don't — I rarely collaborate")  // Using straight quote
    params2.append('entry.820450860', 'in')
    params2.append('entry.470721705', 'Unlikely')
    params2.append('entry.1132590371', 'No, not right now')

    const response2 = await fetch(FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: params2.toString()
    })

    console.log('With straight quote:', response2.status, response2.status === 200 ? '✅' : '❌')
  }
}

testUserPayload()
