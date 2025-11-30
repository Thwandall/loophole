import { readFileSync } from 'fs';
const data = readFileSync('latest-form-data.txt', 'utf8');
const match = data.match(/\[(.*)\];/s);
if (match) {
  const jsonData = JSON.parse('[' + match[1] + ']');
  const questions = jsonData[1][1];

  // Find Q11 (How do you discover collaborators - entry.1995184064)
  const q11 = questions.find(q => q && q[4]?.[0]?.[0] === 1995184064);

  if (q11) {
    const options = q11[4][0][1];
    console.log('=== Q8 Options with Character Codes ===\n');

    options.forEach((opt, i) => {
      if (opt[0]) {
        const str = opt[0];
        console.log(`Option ${i}: "${str}"`);

        // Show every character with its code
        for (let j = 0; j < str.length; j++) {
          const c = str[j];
          const code = c.charCodeAt(0);
          const hex = code.toString(16).toUpperCase().padStart(4, '0');
          console.log(`  [${j}]: '${c}' = U+${hex}`);
        }
        console.log();
      }
    });
  }
}
