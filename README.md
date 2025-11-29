# Loophole Survey

A hand-drawn, artsy survey website for Loophole - a platform where artists come to connect and create.

## Features

- 🎨 Hand-drawn aesthetic with sketchy SVG filters
- ✍️ Embedded custom fonts (Sedgwick Ave, Rock Salt, Permanent Marker)
- 📱 Fully responsive design
- ⚡ Built with Vite + React
- 🔄 Multi-page survey flow with validation

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Deployment

This project can be deployed to any static hosting service:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
1. Update `vite.config.js` with your base path
2. Run `npm run build`
3. Deploy the `dist` folder

## Project Structure

```
loophole-survey/
├── src/
│   ├── components/      # React components
│   │   ├── LandingPage.jsx
│   │   ├── SurveyPage.jsx
│   │   ├── ThankYouPage.jsx
│   │   ├── Logo.jsx
│   │   └── ...
│   ├── data/
│   │   └── questions.js  # Survey questions
│   ├── styles/
│   │   ├── fonts.css     # Embedded fonts (base64)
│   │   └── global.css    # Global styles
│   ├── App.jsx           # Main app with state
│   └── main.jsx          # Entry point
├── public/
│   └── favicon.svg
├── index.html
└── package.json
```

## Customization

### Changing Survey Questions
Edit `src/data/questions.js` to modify questions, options, and question types (single/multiple).

### Changing Instagram Link
Update the link in `src/components/ThankYouPage.jsx`.

### Changing Colors
Edit CSS variables in `src/styles/global.css`:
```css
:root {
  --bg: #0a0a0a;
  --text: #f5f5f0;
  --text-dim: #a8a8a0;
}
```

## License

MIT
