/**
 * Test if Q4 with 3 selections (the max) causes issues
 */

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

async function testQ4With3Selections() {
  console.log('=== Test 1: Q4 with exactly 3 selections (max) ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'Test3Max')
  params.append('entry.1209817407', 'User')
  params.append('entry.1121227181', 'test3max@example.com')
  params.append('entry.1361817756', 'Visual Arts')
  params.append('entry.821105014', 'Intermediate')
  params.append('entry.527061810', 'Monthly')
  params.append('entry.1210677777', 'Hard to find people with the right skillset')
  params.append('entry.1210677777', 'Scheduling conflicts')
  params.append('entry.1210677777', 'Communication issues')  // 3rd selection
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

async function testQ4With2Selections() {
  console.log('\n=== Test 2: Q4 with only 2 selections ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'Test2Max')
  params.append('entry.1209817407', 'User')
  params.append('entry.1121227181', 'test2max@example.com')
  params.append('entry.1361817756', 'Visual Arts')
  params.append('entry.821105014', 'Intermediate')
  params.append('entry.527061810', 'Monthly')
  params.append('entry.1210677777', 'Hard to find people with the right skillset')
  params.append('entry.1210677777', 'Scheduling conflicts')  // Only 2
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

async function testExactFailingSubmission() {
  console.log('\n=== Test 3: Exact failing submission from log ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'tHEW')
  params.append('entry.1209817407', 'FVDFV')
  params.append('entry.1121227181', 'test@example.com')
  params.append('entry.1361817756', 'Visual Arts')
  params.append('entry.1361817756', 'Design')
  params.append('entry.1361817756', 'Music / Audio Production')
  params.append('entry.821105014', 'Advanced')
  params.append('entry.527061810', 'Weekly')
  params.append('entry.1210677777', 'Hard to find people with the right skillset')
  params.append('entry.1210677777', 'Scheduling conflicts')
  params.append('entry.1210677777', 'Communication issues')
  params.append('entry.1942153459', 'FDVDSV')
  params.append('entry.697938755', 'Skill level')
  params.append('entry.1010737986', 'Profile + portfolio matching')
  params.append('entry.1010737986', 'Skill-based filtering')
  params.append('entry.1010737986', 'Project posting board')
  params.append('entry.1995184064', 'TikTok')
  params.append('entry.1995184064', 'Twitter')
  params.append('entry.820450860', 'VFSFV')
  params.append('entry.470721705', 'Neutral')
  params.append('entry.1132590371', "Yes, but I'd need to schedule")

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })

  console.log('Status:', response.status, response.status === 200 ? '✅' : '❌')
}

(async () => {
  await testQ4With3Selections()
  await testQ4With2Selections()
  await testExactFailingSubmission()
})()
