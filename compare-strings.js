import { questions } from './src/data/questions.js';

// Get the string from questions.js
const q8 = questions.find(q => q.id === 8);
const option5FromQuestions = q8.options[5];

console.log('=== Character Comparison ===\n');
console.log('From questions.js:', `"${option5FromQuestions}"`);
console.log('Length:', option5FromQuestions.length);

// Show character codes for the apostrophe and dash areas
console.log('\nCharacter codes:');
for (let i = 0; i < option5FromQuestions.length; i++) {
  const char = option5FromQuestions[i];
  const code = char.charCodeAt(0);
  if (code > 127 || i === 5 || i === 8) {
    console.log(`  [${i}]: '${char}' = U+${code.toString(16).toUpperCase().padStart(4, '0')}`);
  }
}

// Fetch the exact string from Google Form
const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/viewform');
const html = await response.text();
const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);/s);
const jsonData = JSON.parse(match[1]);
const questionsFromForm = jsonData[1][1];
const q8FromForm = questionsFromForm.find(q => q && q[4]?.[0]?.[0] === 1995184064);
const option5FromForm = q8FromForm[4][0][1][5][0];

console.log('\n\nFrom Google Form:', `"${option5FromForm}"`);
console.log('Length:', option5FromForm.length);

console.log('\nCharacter codes:');
for (let i = 0; i < option5FromForm.length; i++) {
  const char = option5FromForm[i];
  const code = char.charCodeAt(0);
  if (code > 127 || i === 5 || i === 8) {
    console.log(`  [${i}]: '${char}' = U+${code.toString(16).toUpperCase().padStart(4, '0')}`);
  }
}

// Compare byte by byte
console.log('\n\n=== Differences ===');
let hasDifference = false;
const maxLen = Math.max(option5FromQuestions.length, option5FromForm.length);
for (let i = 0; i < maxLen; i++) {
  const qChar = option5FromQuestions[i] || '';
  const fChar = option5FromForm[i] || '';
  if (qChar !== fChar) {
    console.log(`Position ${i}: questions.js='${qChar}' (U+${qChar.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}) vs form='${fChar}' (U+${fChar.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')})`);
    hasDifference = true;
  }
}

if (!hasDifference) {
  console.log('No differences found!');
}
