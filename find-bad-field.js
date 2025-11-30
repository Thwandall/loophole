/**
 * Binary search to find which field causes the 400
 */

const GOOGLE_FORM_CONFIG = {
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'
}

// Our working test payload fields
const workingFields = {
  'entry.1752711908': 'John',
  'entry.1209817407': 'Doe',
  'entry.1121227181': 'john@example.com',
  'entry.1327901941': '555-1234',
  'entry.1361817756': 'Visual Arts',
  'entry.821105014': 'Intermediate',
  'entry.527061810': 'Monthly',
  'entry.1210677777': 'Hard to find reliable partners',
  'entry.1942153459': 'Test collaborator description',
  'entry.697938755': 'Skill level',
  'entry.1010737986': 'Profile + portfolio matching',
  'entry.1995184064': 'Instagram',
  'entry.820450860': 'Test frustration text',
  'entry.470721705': 'Very likely',
  'entry.1132590371': 'Yes, definitely'
}

// The failing hidden/sentinel fields from production
const suspectFields = {
  'fvv': '1',
  'pageHistory': '0',
  'fbzx': '-5317851297175260938',
  'submissionTimestamp': '1764469287807',
  'entry.1361817756_sentinel': '',
  'entry.821105014_sentinel': '',
  'entry.527061810_sentinel': '',
  'entry.1210677777_sentinel': '',
  'entry.697938755_sentinel': '',
  'entry.1010737986_sentinel': '',
  'entry.1995184064_sentinel': '',
  'entry.470721705_sentinel': '',
  'entry.1132590371_sentinel': ''
}

async function testWithout(fieldToSkip) {
  const params = new URLSearchParams()

  // Add all working fields
  for (let [key, value] of Object.entries(workingFields)) {
    params.append(key, value)
  }

  // Add all suspect fields EXCEPT the one we're testing
  for (let [key, value] of Object.entries(suspectFields)) {
    if (key !== fieldToSkip) {
      params.append(key, value)
    }
  }

  try {
    const response = await fetch(GOOGLE_FORM_CONFIG.formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: params.toString()
    })

    return response.status
  } catch (error) {
    return 'ERROR'
  }
}

async function findCulprit() {
  console.log('=== Finding Which Field Causes 400 ===\n')

  // First confirm the working payload still works
  const params = new URLSearchParams()
  for (let [key, value] of Object.entries(workingFields)) {
    params.append(key, value)
  }

  const baseStatus = await (await fetch(GOOGLE_FORM_CONFIG.formUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: params.toString()
  })).status

  console.log('Base (working) status:', baseStatus)
  console.log()

  // Test each suspect field
  for (let field of Object.keys(suspectFields)) {
    const status = await testWithout(field)
    const symbol = status === 200 ? '✅' : '❌'
    console.log(`${symbol} Without "${field}": ${status}`)

    if (status === 200) {
      console.log(`   ^^ THIS FIELD IS THE PROBLEM! ^^`)
    }
  }
}

findCulprit()
