/**
 * Test each Q8 option to find which ones work
 */

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

const q8Options = [
  'Instagram',
  'TikTok',
  'Twitter',
  'Discord',
  'Friends / word of mouth',
  "I don't — I rarely collaborate",  // with curly quote
  "I don't — I rarely collaborate",  // with straight quote
];

async function testQ8Option(option, index) {
  console.log(`\n=== Test ${index + 1}: Q8 = "${option}" ===`)

  const params = new URLSearchParams()
  params.append('entry.1752711908', `Test${index}`)
  params.append('entry.1209817407', `User${index}`)
  params.append('entry.1121227181', `test${index}@example.com`)
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
  params.append('entry.1995184064', option)  // Test this option
  params.append('entry.820450860', 'test')
  params.append('entry.470721705', 'Unlikely')
  params.append('entry.1132590371', 'No, not right now')

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })

  console.log('Status:', response.status, response.status === 200 ? '✅' : '❌')
  return response.status === 200
}

(async () => {
  console.log('=== Testing All Q8 Options ===')

  const results = []
  for (let i = 0; i < q8Options.length; i++) {
    const works = await testQ8Option(q8Options[i], i)
    results.push({ option: q8Options[i], works })
  }

  console.log('\n\n=== Summary ===')
  results.forEach(r => {
    console.log(`${r.works ? '✅' : '❌'} "${r.option}"`)
  })
})()
