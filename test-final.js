const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse';

// Import to get the fixed option
import { questions } from './src/data/questions.js';
const q8 = questions.find(q => q.id === 8);
const option5 = q8.options[5];

console.log('Testing with option:', `"${option5}"`);
console.log('Character codes:');
console.log(`  Apostrophe: U+${option5.charCodeAt(5).toString(16).toUpperCase().padStart(4, '0')}`);
console.log(`  Dash: U+${option5.charCodeAt(8).toString(16).toUpperCase().padStart(4, '0')}`);
console.log();

const params = new URLSearchParams();
params.append('entry.1752711908', 'FinalTest');
params.append('entry.1209817407', 'User');
params.append('entry.1121227181', 'finaltest@example.com');
params.append('entry.1361817756', 'Visual Arts');
params.append('entry.821105014', 'Intermediate');
params.append('entry.527061810', 'Monthly');
params.append('entry.1210677777', 'Hard to find reliable partners');
params.append('entry.1942153459', 'test');
params.append('entry.697938755', 'Skill level');
params.append('entry.1010737986', 'Profile + portfolio matching');
params.append('entry.1995184064', option5);  // Using the fixed option
params.append('entry.820450860', 'test');
params.append('entry.470721705', 'Very likely');
params.append('entry.1132590371', 'Yes, definitely');

const response = await fetch(FORM_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  body: params.toString()
});

console.log('Status:', response.status, response.status === 200 ? '✅ FIXED!' : '❌ Still failing');
