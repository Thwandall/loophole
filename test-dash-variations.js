/**
 * Test different dash characters in "I don't — I rarely collaborate"
 */

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

// Different dash variations
const variations = [
  "I don't — I rarely collaborate",  // em dash U+2014
  "I don't – I rarely collaborate",  // en dash U+2013
  "I don't - I rarely collaborate",  // hyphen U+002D
  "I don't  I rarely collaborate",   // no dash (just spaces)
];

async function testDashVariation(variation, index) {
  console.log(`\n=== Test ${index + 1}: "${variation}" ===`);

  // Show character codes
  const dashArea = variation.substring(7, 11);
  console.log('Dash area chars:', Array.from(dashArea).map(c =>
    `'${c}' (U+${c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')})`
  ).join(', '));

  const params = new URLSearchParams()
  params.append('entry.1752711908', `Test${index + 1}`)
  params.append('entry.1209817407', `User${index + 1}`)
  params.append('entry.1121227181', `test${index + 1}@example.com`)
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
  params.append('entry.1995184064', variation)  // Testing this variation
  params.append('entry.820450860', 'test')
  params.append('entry.470721705', 'Unlikely')
  params.append('entry.1132590371', 'No, not right now')

  const response = await fetch(FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })

  console.log('Status:', response.status, response.status === 200 ? '✅ WORKS!' : '❌ Fails')
  return response.status
}

(async () => {
  console.log('=== Testing Different Dash Characters ===');

  for (let i = 0; i < variations.length; i++) {
    await testDashVariation(variations[i], i);
  }

  console.log('\n\n=== Summary ===');
  console.log('Testing which exact string from Google Form works...');
})()
