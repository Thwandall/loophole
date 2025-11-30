/**
 * Get fresh entry IDs directly from form HTML
 */

const formViewUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/viewform'

async function getFreshEntryIds() {
  try {
    const response = await fetch(formViewUrl)
    const html = await response.text()
    
    // Find all data-params entries which show field structure
    const dataParamsPattern = /data-params="[^"]*entry\.(\d+)[^"]*"/g
    const matches = [...html.matchAll(dataParamsPattern)]
    const entryIds = [...new Set(matches.map(m => m[1]))].sort()
    
    console.log('=== CURRENT ENTRY IDs FROM FORM ===\n')
    entryIds.forEach(id => {
      console.log(`entry.${id}`)
    })
    
    // Also look for question labels near entry IDs
    console.log('\n=== Searching for question context ===\n')
    
    // Try to find FB_PUBLIC_LOAD_DATA which has form structure
    const fbDataMatch = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);/s)
    if (fbDataMatch) {
      console.log('Found FB_PUBLIC_LOAD_DATA structure')
      // Save to file for inspection
      const fs = await import('fs')
      fs.writeFileSync('form-data.json', fbDataMatch[1])
      console.log('Saved to form-data.json')
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

getFreshEntryIds()
