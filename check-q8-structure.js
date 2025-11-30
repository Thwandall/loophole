// Fetch fresh form data
const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/viewform');
const html = await response.text();

// Find Q8 options in the structured data
const match = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);/s);
if (match) {
  const jsonData = JSON.parse(match[1]);
  const questions = jsonData[1][1];

  // Find Q8 (entry.1995184064)
  const q8 = questions.find(q => q && q[4]?.[0]?.[0] === 1995184064);

  if (q8) {
    console.log('=== Q8 Full Options Array ===\n');
    const options = q8[4][0][1];

    options.forEach((opt, i) => {
      console.log(`Option ${i}:`);
      console.log(`  Value: "${opt[0]}"`);
      console.log(`  Flags: ${JSON.stringify(opt.slice(1))}`);

      // Check each character
      if (opt[0]) {
        const str = opt[0];
        console.log(`  Length: ${str.length}`);

        // Show any special characters
        const specialChars = [];
        for (let j = 0; j < str.length; j++) {
          const code = str.charCodeAt(j);
          if (code > 127 || code < 32) {
            specialChars.push(`[${j}]='${str[j]}' U+${code.toString(16).toUpperCase().padStart(4, '0')}`);
          }
        }
        if (specialChars.length > 0) {
          console.log(`  Special chars: ${specialChars.join(', ')}`);
        }
      }
      console.log();
    });
  }
}
