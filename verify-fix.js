import { questions } from './src/data/questions.js';

const q8 = questions.find(q => q.id === 8);
const option5 = q8.options[5];

console.log('Updated option:', `"${option5}"`);

// Check the apostrophe character
const apostrophe = option5[5];
const code = apostrophe.charCodeAt(0);
console.log(`Apostrophe: '${apostrophe}' = U+${code.toString(16).toUpperCase().padStart(4, '0')}`);

if (code === 0x2019) {
  console.log('✅ Correct curly apostrophe! Now restart your dev server and test.');
} else {
  console.log(`❌ Still wrong apostrophe (found U+${code.toString(16).toUpperCase()})`);
}
