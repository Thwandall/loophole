/**
 * Test with correct apostrophe U+2019
 */

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

async function testWithCorrectApostrophe() {
  console.log('=== Test 1: With U+2019 apostrophe (curly) ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'TestCorrect')
  params.append('entry.1209817407', 'User')
  params.append('entry.1121227181', 'test@example.com')
  params.append('entry.1361817756', 'Tech / Digital Art')
  params.append('entry.1361817756', 'Writing')
  params.append('entry.821105014', 'Advanced')
  params.append('entry.527061810', 'Rarely / Never')
  params.append('entry.1210677777', 'Mismatched expectations')
  params.append('entry.1210677777', 'Trust issues')
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Shared creative goals')
  params.append('entry.1010737986', 'Contracts / clear deliverables')
  params.append('entry.1010737986', 'Reputation / reliability scores')
  params.append('entry.1995184064', "I don't — I rarely collaborate")  // U+2019 apostrophe
  params.append('entry.820450860', 'test')
  params.append('entry.470721705', 'Unlikely')
  params.append('entry.1132590371', 'No, not right now')

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })

  console.log('Status:', response.status, response.status === 200 ? '✅ WORKS! Apostrophe was the issue!' : '❌ Still fails')
}

async function testWithWrongApostrophe() {
  console.log('\n=== Test 2: With U+0027 apostrophe (\') ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'TestWrong')
  params.append('entry.1209817407', 'User')
  params.append('entry.1121227181', 'test2@example.com')
  params.append('entry.1361817756', 'Tech / Digital Art')
  params.append('entry.1361817756', 'Writing')
  params.append('entry.821105014', 'Advanced')
  params.append('entry.527061810', 'Rarely / Never')
  params.append('entry.1210677777', 'Mismatched expectations')
  params.append('entry.1210677777', 'Trust issues')
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Shared creative goals')
  params.append('entry.1010737986', 'Contracts / clear deliverables')
  params.append('entry.1010737986', 'Reputation / reliability scores')
  params.append('entry.1995184064', "I don't — I rarely collaborate")  // U+0027 apostrophe
  params.append('entry.820450860', 'test')
  params.append('entry.470721705', 'Unlikely')
  params.append('entry.1132590371', 'No, not right now')

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })

  console.log('Status:', response.status, response.status === 200 ? '✅ Works' : '❌ Fails as expected')
}

(async () => {
  await testWithCorrectApostrophe()
  await testWithWrongApostrophe()
})()
