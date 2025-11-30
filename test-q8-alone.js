/**
 * Test "I don't — I rarely collaborate" alone vs with other options
 */

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

async function testAlone() {
  console.log('=== Test 1: "I don\'t — I rarely collaborate" ALONE ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'TestAlone')
  params.append('entry.1209817407', 'User')
  params.append('entry.1121227181', 'testalone@example.com')
  params.append('entry.1361817756', 'Visual Arts')
  params.append('entry.821105014', 'Intermediate')
  params.append('entry.527061810', 'Monthly')
  params.append('entry.1210677777', 'Hard to find reliable partners')
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Skill level')
  params.append('entry.1010737986', 'Profile + portfolio matching')
  params.append('entry.1995184064', "I don't — I rarely collaborate")  // ONLY this
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

async function testWithFriends() {
  console.log('\n=== Test 2: Both "Friends" AND "I don\'t" ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'TestBoth')
  params.append('entry.1209817407', 'User')
  params.append('entry.1121227181', 'testboth@example.com')
  params.append('entry.1361817756', 'Visual Arts')
  params.append('entry.821105014', 'Intermediate')
  params.append('entry.527061810', 'Monthly')
  params.append('entry.1210677777', 'Hard to find reliable partners')
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Skill level')
  params.append('entry.1010737986', 'Profile + portfolio matching')
  params.append('entry.1995184064', 'Friends / word of mouth')
  params.append('entry.1995184064', "I don't — I rarely collaborate")
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

async function testJustFriends() {
  console.log('\n=== Test 3: Only "Friends / word of mouth" ===')

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'TestFriends')
  params.append('entry.1209817407', 'User')
  params.append('entry.1121227181', 'testfriends@example.com')
  params.append('entry.1361817756', 'Visual Arts')
  params.append('entry.821105014', 'Intermediate')
  params.append('entry.527061810', 'Monthly')
  params.append('entry.1210677777', 'Hard to find reliable partners')
  params.append('entry.1942153459', 'test')
  params.append('entry.697938755', 'Skill level')
  params.append('entry.1010737986', 'Profile + portfolio matching')
  params.append('entry.1995184064', 'Friends / word of mouth')
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
  await testAlone()
  await testWithFriends()
  await testJustFriends()
})()
