# Google Forms Setup Guide

## Step 1: Get Your Form URL

1. Open your Google Form in edit mode
2. Click the **Send** button (top right)
3. Click the **Link** icon (🔗)
4. You'll see a URL like: `https://docs.google.com/forms/d/e/1FAIpQLSc...../viewform`
5. Copy this URL
6. Replace `/viewform` at the end with `/formResponse`
   - **Before:** `https://docs.google.com/forms/d/e/1FAIpQLSc9xTQR0vWp5iKBqEqCPMvXyZ3qMxqBRQ0Z5rQxWJxNqHqEpA/viewform`
   - **After:** `https://docs.google.com/forms/d/e/1FAIpQLSc9xTQR0vWp5iKBqEqCPMvXyZ3qMxqBRQ0Z5rQxWJxNqHqEpA/formResponse`

## Step 2: Get Entry IDs for Each Question

### Method 1: View Page Source (Recommended)
1. Open your Google Form in **fill-out mode** (the link you share with users)
2. Right-click anywhere on the page → **View Page Source**
3. Press `Ctrl+F` (or `Cmd+F` on Mac) and search for `"entry.`
4. You'll see entries like: `entry.1234567890`
5. Match each entry to your question by looking at the question text nearby in the source code

### Method 2: Inspect Network Tab
1. Open your Google Form in fill-out mode
2. Open browser DevTools (F12)
3. Go to the **Network** tab
4. Fill out ONE question and click "Submit"
5. Look for a request to `formResponse`
6. Check the **Payload** tab to see: `entry.XXXXX=Your Answer`

## Step 3: Map Entry IDs to Questions

Your form should have these questions in order:

**Contact Info:**
- First Name → `entry.????`
- Last Name → `entry.????`
- Email → `entry.????`
- Phone → `entry.????`

**Survey Questions:**
1. What is your primary creative field? (Checkboxes) → `entry.????`
2. What level best describes your experience? (Multiple choice) → `entry.????`
3. How often do you collaborate? (Multiple choice) → `entry.????`
4. What stops you from collaborating? (Checkboxes - max 3) → `entry.????`
5. Types of collaborators you seek (Text) → `entry.????`
6. Most important factor (Multiple choice) → `entry.????`
7. Features you'd value most (Checkboxes) → `entry.????`
8. How do you discover collaborators? (Checkboxes) → `entry.????`
9. Biggest frustration (Text) → `entry.????`
10. Likelihood to use Loophole (Multiple choice) → `entry.????`
11. Open to interview? (Multiple choice) → `entry.????`

## Step 4: Update the Code

Open `src/services/googleFormsService.js` and update:

```javascript
const GOOGLE_FORM_CONFIG = {
  formUrl: 'YOUR_FORM_URL_HERE/formResponse',

  fields: {
    // Contact Information
    firstName: 'entry.YOUR_ENTRY_ID',
    lastName: 'entry.YOUR_ENTRY_ID',
    email: 'entry.YOUR_ENTRY_ID',
    phone: 'entry.YOUR_ENTRY_ID',

    // Survey Questions
    question1: 'entry.YOUR_ENTRY_ID',
    question2: 'entry.YOUR_ENTRY_ID',
    // ... and so on
  }
}
```

## Important Notes:

- ⚠️ The entry IDs must match EXACTLY
- ⚠️ Question types must match (Checkboxes vs Multiple Choice)
- ⚠️ Option labels must match exactly (case-sensitive)
- ⚠️ Make sure your form has 15 total fields (4 contact + 11 questions)

## Testing:

After updating, fill out the survey and check:
1. Browser console shows all entry IDs being sent
2. Go to your Google Form → Responses tab
3. You should see the submission appear immediately
