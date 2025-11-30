/**
 * Test with EXACT options from the Google Form (no "Other" options)
 */

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

async function testExactFormOptions() {
  console.log('=== Test with EXACT Google Form Options ===\n')

  const params = new URLSearchParams()

  // Contact
  params.append('entry.1752711908', 'Test')
  params.append('entry.1209817407', 'User')
  params.append('entry.1121227181', 'test@example.com')

  // Q1: Primary creative field (NO "Other" option!)
  params.append('entry.1361817756', 'Visual Arts')
  params.append('entry.1361817756', 'Writing')

  // Q2: Experience level
  params.append('entry.821105014', 'Advanced')

  // Q3: Collaboration frequency
  params.append('entry.527061810', 'A few times a year')

  // Q4: What stops you (NO "Other" option!)
  params.append('entry.1210677777', 'Communication issues')
  params.append('entry.1210677777', 'Scheduling conflicts')

  // Q5: Text
  params.append('entry.1942153459', 'test collaborators')

  // Q6: Important factor
  params.append('entry.697938755', 'Personality / communication')

  // Q7: Platform features
  params.append('entry.1010737986', 'Contracts / clear deliverables')
  params.append('entry.1010737986', 'Reputation / reliability scores')

  // Q8: Discover collaborators
  params.append('entry.1995184064', "I don't — I rarely collaborate")
  params.append('entry.1995184064', 'Friends / word of mouth')

  // Q9: Text
  params.append('entry.820450860', 'test frustration')

  // Q10: Likelihood
  params.append('entry.470721705', 'Unlikely')

  // Q11: Interview
  params.append('entry.1132590371', 'Maybe — send details')

  try {
    const response = await fetch(FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: params.toString()
    })

    console.log('Response Status:', response.status)

    if (response.status === 200) {
      console.log('✅ SUCCESS with exact form options!')
    } else {
      console.log('❌ Failed:', response.status)
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

testExactFormOptions()
