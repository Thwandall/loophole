/**
 * Helper script to extract entry IDs from Google Form
 * Run with: node extract-entry-ids.js
 */

const formViewUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/viewform'


async function extractEntryIds() {
  console.log('Fetching form source...\n')

  try {
    const response = await fetch(formViewUrl)
    const html = await response.text()

    // Extract all entry IDs
    const entryPattern = /entry\.(\d+)/g
    const matches = [...html.matchAll(entryPattern)]
    const entryIds = [...new Set(matches.map(m => `entry.${m[1]}`))]

    console.log('Found entry IDs:')
    entryIds.forEach((id, index) => {
      console.log(`  ${index + 1}. ${id}`)
    })

    console.log('\nTotal unique entry IDs:', entryIds.length)

    // Try to extract question text context
    console.log('\n=== Attempting to match entry IDs with questions ===\n')

    const questionPattern = /\["(entry\.\d+)"[^\]]*\]/g
    const questionMatches = [...html.matchAll(questionPattern)]

    questionMatches.slice(0, 15).forEach((match, index) => {
      console.log(`${index + 1}. ${match[1]}`)
    })

    console.log('\n⚠️  You need to manually match these entry IDs to your questions.')
    console.log('📝 Update src/services/googleFormsService.js and server.js with the correct IDs.')

  } catch (error) {
    console.error('Error fetching form:', error.message)
    console.log('\n❌ Could not fetch form automatically.')
    console.log('✅ Manual method:')
    console.log('   1. Open:', formViewUrl)
    console.log('   2. Right-click → View Page Source')
    console.log('   3. Search for "entry." to find all entry IDs')
  }
}

extractEntryIds()
