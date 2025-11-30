/**
 * Test if Q8's value is the problem
 */

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

async function testWithInstagram() {
  console.log('=== Test 1: Same as Test 4 but Q8 = Instagram (from Test 3) ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'TestA')
  params.append('entry.1209817407', 'UserA')
  params.append('entry.1121227181', 'testa@example.com')
  params.append('entry.1361817756', 'Tech / Digital Art')  // Same as Test 4
  params.append('entry.1361817756', 'Writing')
  params.append('entry.821105014', 'Advanced')  // Same as Test 4
  params.append('entry.527061810', 'Rarely / Never')  // Same as Test 4
  params.append('entry.1210677777', 'Mismatched expectations')  // Same as Test 4
  params.append('entry.1210677777', 'Trust issues')
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Shared creative goals')  // Same as Test 4
  params.append('entry.1010737986', 'Contracts / clear deliverables')  // Same as Test 4
  params.append('entry.1010737986', 'Reputation / reliability scores')
  params.append('entry.1995184064', 'Instagram')  // CHANGED from Test 4
  params.append('entry.820450860', 'test')
  params.append('entry.470721705', 'Unlikely')  // Same as Test 4
  params.append('entry.1132590371', 'No, not right now')  // Same as Test 4

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })

  console.log('Status:', response.status, response.status === 200 ? '✅ Q8 was the problem!' : '❌ Still fails')
}

async function testWithFriendsWordOfMouth() {
  console.log('\n=== Test 2: Q8 = Friends / word of mouth ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'TestB')
  params.append('entry.1209817407', 'UserB')
  params.append('entry.1121227181', 'testb@example.com')
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
  params.append('entry.1995184064', 'Friends / word of mouth')  // Try this
  params.append('entry.820450860', 'test')
  params.append('entry.470721705', 'Unlikely')
  params.append('entry.1132590371', 'No, not right now')

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })

  console.log('Status:', response.status, response.status === 200 ? '✅ Works!' : '❌ Fails')
}

(async () => {
  await testWithInstagram()
  await testWithFriendsWordOfMouth()
})()
