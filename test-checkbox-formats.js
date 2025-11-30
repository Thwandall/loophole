/**
 * Test different formats for checkbox questions
 */

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

async function testMultipleParams() {
  console.log('=== Test 1: Multiple params (entry.X=A&entry.X=B) ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'Test1')
  params.append('entry.1209817407', 'User1')
  params.append('entry.1121227181', 'test1@example.com')
  params.append('entry.1361817756', 'Visual Arts')  // Q1
  params.append('entry.1361817756', 'Writing')       // Q1 again
  params.append('entry.821105014', 'Intermediate')
  params.append('entry.527061810', 'Monthly')
  params.append('entry.1210677777', 'Hard to find reliable partners')
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Skill level')
  params.append('entry.1010737986', 'Profile + portfolio matching')
  params.append('entry.1995184064', 'Instagram')
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

async function testCommaSeparated() {
  console.log('\n=== Test 2: Comma-separated (entry.X=A,B) ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'Test2')
  params.append('entry.1209817407', 'User2')
  params.append('entry.1121227181', 'test2@example.com')
  params.append('entry.1361817756', 'Visual Arts, Writing')  // Comma-separated
  params.append('entry.821105014', 'Intermediate')
  params.append('entry.527061810', 'Monthly')
  params.append('entry.1210677777', 'Hard to find reliable partners')
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Skill level')
  params.append('entry.1010737986', 'Profile + portfolio matching')
  params.append('entry.1995184064', 'Instagram')
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

async function testSingleValueOnly() {
  console.log('\n=== Test 3: Single value only (no multi-select) ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'Test3')
  params.append('entry.1209817407', 'User3')
  params.append('entry.1121227181', 'test3@example.com')
  params.append('entry.1361817756', 'Visual Arts')  // Single value
  params.append('entry.821105014', 'Intermediate')
  params.append('entry.527061810', 'Monthly')
  params.append('entry.1210677777', 'Hard to find reliable partners')
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Skill level')
  params.append('entry.1010737986', 'Profile + portfolio matching')
  params.append('entry.1995184064', 'Instagram')
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

(async () => {
  await testMultipleParams()
  await testCommaSeparated()
  await testSingleValueOnly()
})()
