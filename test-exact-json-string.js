// Fetch form and extract the EXACT option string from JSON
const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/viewform');
const html = await response.text();

const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);/s);
const jsonData = JSON.parse(match[1]);
const questions = jsonData[1][1];
const q8 = questions.find(q => q && q[4]?.[0]?.[0] === 1995184064);
const option5 = q8[4][0][1][5][0];  // Get the EXACT string from JSON

console.log('=== Testing with EXACT string from Google Form JSON ===');
console.log(`String: "${option5}"`);
console.log(`Length: ${option5.length}`);
console.log();

// Test with this exact string
const params = new URLSearchParams();
params.append('entry.1752711908', 'TestExactJSON');
params.append('entry.1209817407', 'User');
params.append('entry.1121227181', 'testjson@example.com');
params.append('entry.1361817756', 'Visual Arts');
params.append('entry.821105014', 'Intermediate');
params.append('entry.527061810', 'Monthly');
params.append('entry.1210677777', 'Hard to find reliable partners');
params.append('entry.1942153459', 'test');
params.append('entry.697938755', 'Skill level');
params.append('entry.1010737986', 'Profile + portfolio matching');
params.append('entry.1995184064', option5);  // Use exact string
params.append('entry.820450860', 'test');
params.append('entry.470721705', 'Very likely');
params.append('entry.1132590371', 'Yes, definitely');

const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse';

const submitResponse = await fetch(formUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  body: params.toString()
});

console.log('Status:', submitResponse.status, submitResponse.status === 200 ? '✅ EXACT JSON STRING WORKS!' : '❌ Still fails');

if (submitResponse.status !== 200) {
  console.log('\n⚠️  The option appears to be disabled or restricted in the form!');
  console.log('Check if "I don\'t — I rarely collaborate" is enabled in Google Forms settings.');
}
