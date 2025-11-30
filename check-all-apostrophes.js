import { questions } from './src/data/questions.js';

// Fetch form to compare
const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/viewform');
const html = await response.text();
const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);/s);
const jsonData = JSON.parse(match[1]);
const questionsFromForm = jsonData[1][1];

console.log('=== Checking all options with apostrophes ===\n');

// Check each question
questions.forEach(q => {
  if (q.options) {
    q.options.forEach((opt, idx) => {
      if (opt.includes("'") || opt.includes("'")) {
        // Find corresponding option in form
        const formQ = questionsFromForm.find(fq => fq && fq[1] === q.text);
        if (formQ && formQ[4] && formQ[4][0] && formQ[4][0][1]) {
          const formOpt = formQ[4][0][1][idx];
          if (formOpt && formOpt[0]) {
            const qjsStr = opt;
            const formStr = formOpt[0];

            if (qjsStr !== formStr) {
              console.log(`❌ MISMATCH in Q${q.id} option ${idx}:`);
              console.log(`   questions.js: "${qjsStr}"`);
              console.log(`   Google Form:  "${formStr}"`);

              // Find the different character
              for (let i = 0; i < Math.max(qjsStr.length, formStr.length); i++) {
                if (qjsStr[i] !== formStr[i]) {
                  const qCode = qjsStr.charCodeAt(i);
                  const fCode = formStr.charCodeAt(i);
                  console.log(`   Position ${i}: qjs='${qjsStr[i]}' (U+${qCode.toString(16).toUpperCase().padStart(4, '0')}) vs form='${formStr[i]}' (U+${fCode.toString(16).toUpperCase().padStart(4, '0')})`);
                }
              }
              console.log();
            } else {
              console.log(`✅ Q${q.id} option ${idx}: "${opt}"`);
            }
          }
        }
      }
    });
  }
});
