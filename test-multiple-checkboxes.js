/**
 * Test if multiple checkbox questions with multiple selections work
 */

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

async function testOneCheckboxMultiple() {
  console.log('=== Test 1: ONE checkbox with multiple selections ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'Test1')
  params.append('entry.1209817407', 'User1')
  params.append('entry.1121227181', 'test1@example.com')
  params.append('entry.1361817756', 'Visual Arts')  // Q1 - multiple
  params.append('entry.1361817756', 'Writing')
  params.append('entry.821105014', 'Intermediate')
  params.append('entry.527061810', 'Monthly')
  params.append('entry.1210677777', 'Hard to find reliable partners')  // Q4 - single
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Skill level')
  params.append('entry.1010737986', 'Profile + portfolio matching')  // Q7 - single
  params.append('entry.1995184064', 'Instagram')  // Q8 - single
  params.append('entry.820450860', 'test')
  params.append('entry.470721705', 'Very likely')
  params.append('entry.1132590371', 'Yes, definitely')

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })

  console.log('Status:', response.status, response.status === 200 ? '✅' : '❌')
}

async function testTwoCheckboxesMultiple() {
  console.log('\n=== Test 2: TWO checkboxes with multiple selections ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'Test2')
  params.append('entry.1209817407', 'User2')
  params.append('entry.1121227181', 'test2@example.com')
  params.append('entry.1361817756', 'Visual Arts')  // Q1 - multiple
  params.append('entry.1361817756', 'Writing')
  params.append('entry.821105014', 'Intermediate')
  params.append('entry.527061810', 'Monthly')
  params.append('entry.1210677777', 'Hard to find reliable partners')  // Q4 - multiple
  params.append('entry.1210677777', 'Communication issues')
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Skill level')
  params.append('entry.1010737986', 'Profile + portfolio matching')  // Q7 - single
  params.append('entry.1995184064', 'Instagram')  // Q8 - single
  params.append('entry.820450860', 'test')
  params.append('entry.470721705', 'Very likely')
  params.append('entry.1132590371', 'Yes, definitely')

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })

  console.log('Status:', response.status, response.status === 200 ? '✅' : '❌')
}

async function testThreeCheckboxesMultiple() {
  console.log('\n=== Test 3: THREE checkboxes with multiple selections ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'Test3')
  params.append('entry.1209817407', 'User3')
  params.append('entry.1121227181', 'test3@example.com')
  params.append('entry.1361817756', 'Visual Arts')  // Q1 - multiple
  params.append('entry.1361817756', 'Writing')
  params.append('entry.821105014', 'Intermediate')
  params.append('entry.527061810', 'Monthly')
  params.append('entry.1210677777', 'Hard to find reliable partners')  // Q4 - multiple
  params.append('entry.1210677777', 'Communication issues')
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Skill level')
  params.append('entry.1010737986', 'Profile + portfolio matching')  // Q7 - multiple
  params.append('entry.1010737986', 'Skill-based filtering')
  params.append('entry.1995184064', 'Instagram')  // Q8 - single
  params.append('entry.820450860', 'test')
  params.append('entry.470721705', 'Very likely')
  params.append('entry.1132590371', 'Yes, definitely')

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })

  console.log('Status:', response.status, response.status === 200 ? '✅' : '❌')
}

async function testFourCheckboxesMultiple() {
  console.log('\n=== Test 4: FOUR checkboxes with multiple selections (like user) ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'Test4')
  params.append('entry.1209817407', 'User4')
  params.append('entry.1121227181', 'test4@example.com')
  params.append('entry.1361817756', 'Tech / Digital Art')  // Q1 - multiple
  params.append('entry.1361817756', 'Writing')
  params.append('entry.821105014', 'Advanced')
  params.append('entry.527061810', 'Rarely / Never')
  params.append('entry.1210677777', 'Mismatched expectations')  // Q4 - multiple
  params.append('entry.1210677777', 'Trust issues')
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Shared creative goals')
  params.append('entry.1010737986', 'Contracts / clear deliverables')  // Q7 - multiple
  params.append('entry.1010737986', 'Reputation / reliability scores')
  params.append('entry.1995184064', "I don't — I rarely collaborate")  // Q8 - single
  params.append('entry.820450860', 'test')
  params.append('entry.470721705', 'Unlikely')
  params.append('entry.1132590371', 'No, not right now')

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })

  console.log('Status:', response.status, response.status === 200 ? '✅' : '❌')
}

(async () => {
  await testOneCheckboxMultiple()
  await testTwoCheckboxesMultiple()
  await testThreeCheckboxesMultiple()
  await testFourCheckboxesMultiple()
})()
