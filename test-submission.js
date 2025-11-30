/**
 * Test script to diagnose Google Forms submission issues
 * Run with: node test-submission.js
 */

// Test with minimal data first
const testMinimalSubmission = async () => {
  console.log('\n=== Testing MINIMAL Submission ===\n')

  // Try the URL WITHOUT /u/0/
  const formUrlWithoutU0 = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

  const params = new URLSearchParams()

  // Just send first name and email
  params.append('entry.1752711908', 'Test')  // First Name
  params.append('entry.1209817407', 'User')   // Last Name
  params.append('entry.1121227181', 'test@example.com')  // Email

  console.log('Testing URL:', formUrlWithoutU0)
  console.log('Payload:', params.toString())

  try {
    const response = await fetch(formUrlWithoutU0, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: params.toString()
    })

    console.log('Response Status:', response.status)
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()))

    const text = await response.text()
    console.log('Response preview:', text.substring(0, 500))

    if (response.status === 200) {
      console.log('\n✅ SUCCESS! The minimal submission worked.')
      console.log('👉 The issue is likely with the survey question data or hidden fields.')
    } else {
      console.log('\n❌ Still getting error:', response.status)
      console.log('👉 The entry IDs or form URL might be incorrect.')
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// Test with /u/0/ URL
const testWithU0Path = async () => {
  console.log('\n=== Testing WITH /u/0/ Path ===\n')

  const formUrlWithU0 = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse'

  const params = new URLSearchParams()
  params.append('entry.1752711908', 'Test')
  params.append('entry.1209817407', 'User')
  params.append('entry.1121227181', 'test@example.com')

  console.log('Testing URL:', formUrlWithU0)

  try {
    const response = await fetch(formUrlWithU0, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: params.toString()
    })

    console.log('Response Status:', response.status)

    if (response.status === 200) {
      console.log('✅ This URL works!')
    } else {
      console.log('❌ This URL failed with:', response.status)
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// Run tests
(async () => {
  await testWithU0Path()
  await testMinimalSubmission()

  console.log('\n=== Recommendations ===')
  console.log('1. Try changing the form URL to remove /u/0/')
  console.log('2. Verify entry IDs by viewing the form source')
  console.log('3. Check that all option labels match exactly')
})()
