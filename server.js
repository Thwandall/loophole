/**
 * Simple backend proxy to submit survey responses to Google Forms.
 *
 * This avoids browser CORS / cookie issues by:
 * - Accepting JSON from the React app
 * - Rebuilding the Google Forms payload on the server
 * - Posting it server‑side to the official formResponse URL
 *
 * NOTE:
 * - This server is meant for development and simple deployments.
 * - For production, you should secure it (rate limiting, origin checks, etc.).
 */

import http from 'http'
import { questions } from './src/data/questions.js'

// Reuse the same Google Forms config as the frontend service.
// To avoid duplicating constants, we keep a minimal copy here; if you
// change entry IDs in the frontend, update them here as well.
const GOOGLE_FORM_CONFIG = {
  formUrl: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSe_Ixp_5SAopgq2SNrjGx72v5BJ8fCwtK0D4C9VwKktvBnEDQ/formResponse',
  fields: {
    firstName: 'entry.1752711908',
    lastName: 'entry.1209817407',
    email: 'entry.1121227181',
    phone: 'entry.1327901941',
    question1: 'entry.1361817756',
    question2: 'entry.821105014',
    question3: 'entry.527061810',
    question4: 'entry.1210677777',
    question5: 'entry.1942153459',
    question6: 'entry.697938755',
    question7: 'entry.1010737986',
    question8: 'entry.1995184064',
    question9: 'entry.820450860',
    question10: 'entry.470721705',
    question11: 'entry.1132590371'
  }
}

/**
 * Basic JSON body parser for small requests.
 * @param {http.IncomingMessage} req
 * @returns {Promise<any>}
 */
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
      // Basic protection against very large bodies
      if (data.length > 1e6) {
        req.destroy()
        reject(new Error('Request body too large'))
      }
    })
    req.on('end', () => {
      try {
        const json = JSON.parse(data || '{}')
        resolve(json)
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

/**
 * Builds a URLSearchParams payload matching the minimal Google Forms requirements.
 *
 * @param {object} body - JSON body from the frontend { contactInfo, answers, timestamps }
 */
function buildGoogleFormsParams(body) {
  const { contactInfo, answers, timestamps } = body || {}
  const params = new URLSearchParams()

  if (!contactInfo || typeof contactInfo !== 'object') {
    throw new Error('Missing or invalid contactInfo')
  }
  if (!answers || typeof answers !== 'object') {
    throw new Error('Missing or invalid answers')
  }

  // Contact info
  params.append(GOOGLE_FORM_CONFIG.fields.firstName, contactInfo.firstName || '')
  params.append(GOOGLE_FORM_CONFIG.fields.lastName, contactInfo.lastName || '')
  params.append(GOOGLE_FORM_CONFIG.fields.email, contactInfo.email || '')
  if (contactInfo.phone && contactInfo.phone.trim()) {
    params.append(GOOGLE_FORM_CONFIG.fields.phone, contactInfo.phone.trim())
  }

  // Survey answers: derive human-readable labels from indices using questions.js
  for (let i = 1; i <= 11; i++) {
    const fieldKey = `question${i}`
    const entryId = GOOGLE_FORM_CONFIG.fields[fieldKey]
    const rawAnswer = answers[i]
    const question = questions.find(q => q.id === i)

    if (rawAnswer === undefined || rawAnswer === null) continue
    if (!entryId) continue
    if (!question) continue

    // Multiple choice (arrays of indices) – send each selected option label separately
    if (question.type === 'multiple' && Array.isArray(rawAnswer)) {
      rawAnswer.forEach((index) => {
        const label = question.options?.[index]
        if (typeof label === 'string' && label.trim()) {
          params.append(entryId, label.trim())
        }
      })
      continue
    }

    // Single choice (index) – map index to option label
    if (question.type === 'single') {
      const index = rawAnswer
      const label = question.options?.[index]
      if (typeof label === 'string' && label.trim()) {
        params.append(entryId, label.trim())
      }
      continue
    }

    // Text – send as-is
    if (question.type === 'text' && typeof rawAnswer === 'string' && rawAnswer.trim()) {
      params.append(entryId, rawAnswer.trim())
    }
  }

  // NO hidden fields or sentinel fields needed!
  // Google Forms accepts submissions with just the entry IDs

  return params
}

/**
 * Very small HTTP server with a single POST /api/submit-survey endpoint.
 */
const server = http.createServer(async (req, res) => {
  // Allow only POST /api/submit-survey
  if (req.method === 'POST' && req.url === '/api/submit-survey') {
    try {
      const body = await parseJsonBody(req)

      const params = buildGoogleFormsParams(body)

      // DEBUG: Log the exact payload being sent
      console.log('\n=== BACKEND DEBUG ===')
      console.log('Contact Info:', body.contactInfo)
      console.log('Answers:', body.answers)
      console.log('\nURLSearchParams being sent to Google:')
      for (let [key, value] of params.entries()) {
        console.log(`  ${key} = ${value}`)
      }
      console.log('===================\n')

      // Forward request server-side to Google Forms
      const googleResponse = await fetch(GOOGLE_FORM_CONFIG.formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: params.toString()
      })

      // Log for debugging in the backend console
      console.log('[Backend] Forwarded survey to Google Forms. Status:', googleResponse.status)

      if (googleResponse.status !== 200) {
        const responseText = await googleResponse.text()
        console.log('[Backend] Error response preview:', responseText.substring(0, 500))
      }

      // Respond to frontend with a simple JSON status
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: true }))
    } catch (error) {
      console.error('[Backend] Error in /api/submit-survey:', error)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: false, error: 'Failed to submit survey to Google Forms' }))
    }
    return
  }

  // Fallback 404 for all other routes
  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ ok: false, error: 'Not found' }))
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Survey backend running on http://localhost:${PORT}`)
})


