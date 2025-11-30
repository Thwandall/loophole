/**
 * Detailed form structure check
 */

const formViewUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/viewform'

async function checkFormStructure() {
  try {
    const response = await fetch(formViewUrl)
    const html = await response.text()

    // Look for FB_PUBLIC_LOAD_DATA which contains form structure
    const dataMatch = html.match(/FB_PUBLIC_LOAD_DATA.*?=\s*(\[.*?\]);/s)

    if (dataMatch) {
      try {
        const data = JSON.parse(dataMatch[1])

        // The form data is deeply nested
        const formData = data[1]

        if (formData && Array.isArray(formData)) {
          console.log('=== FORM STRUCTURE ===\n')

          formData.forEach((item, index) => {
            if (Array.isArray(item) && item[1]) {
              const questionText = item[1]
              const entryId = item[4]?.[0]?.[0]

              if (entryId) {
                console.log(`Question ${index}:`)
                console.log(`  Text: ${questionText}`)
                console.log(`  Entry ID: entry.${entryId}`)
                console.log()
              }
            }
          })
        } else {
          console.log('Could not parse form structure from data')
        }
      } catch (e) {
        console.log('Error parsing form data:', e.message)
      }
    }

    // Fallback: just show entry IDs in order they appear
    console.log('\n=== ENTRY IDS IN ORDER OF APPEARANCE ===\n')
    const entryPattern = /\["(entry\.\d+)"/g
    const seen = new Set()
    let count = 1

    let match
    while ((match = entryPattern.exec(html)) !== null) {
      const entryId = match[1]
      if (!seen.has(entryId)) {
        seen.add(entryId)
        console.log(`${count}. ${entryId}`)
        count++
      }
    }

  } catch (error) {
    console.error('Error:', error.message)
  }
}

checkFormStructure()
