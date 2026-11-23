# Bharath Kumar Rajesh — Portfolio

Personal portfolio site. Live: [thebharathkumar.netlify.app](https://thebharathkumar.netlify.app/).

## Stack

- **React 19** + **Vite 7** for the app
- **Three.js** (`@react-three/fiber`, `@react-three/drei`) for the hero scene, lazy-loaded and gated behind `prefers-reduced-motion` + an `IntersectionObserver`
- **Framer Motion** for entrance and scroll animations
- **lucide-react** for icons
- Light + dark theme via `ThemeContext` with `localStorage` persistence
- Floating BK·AI **FAQ assistant** — fully client-side, pattern-matched knowledge base. No external API, nothing for visitors to abuse.

## Project layout

```
.
├── index.html                    # SEO meta + Open Graph + JSON-LD person schema
├── public/                       # Static assets (favicon, robots.txt, sitemap.xml, 404.html)
├── src/
│   ├── App.jsx                   # Single source of truth for scroll state
│   ├── components/               # One section per file (Hero, About, ...)
│   │   ├── HeroCanvas.jsx        # Lazy-loaded Three.js scene
│   │   └── ...
│   ├── context/ThemeContext.jsx  # Light/dark theme
│   └── hooks/                    # usePrefersReducedMotion, useScrollY
├── vite.config.js                # manualChunks for three / framer / icons / react
├── vercel.json                   # SPA fallback + asset cache headers
├── netlify.toml                  # SPA fallback for Netlify
└── .github/workflows/ci.yml      # lint + build on push / PR
```

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview  # serves the production build
npm run lint
```

## Chatbot

The floating BK·AI assistant is a static FAQ matcher (`src/components/Chatbot.jsx`). It runs entirely in the browser against a hand-curated knowledge base of patterns and responses. There is no LLM call, no API key, nothing to abuse — visitors can't run up a bill and can't prompt-inject into anything that calls outward.

To extend it, edit the `KB` object in `Chatbot.jsx`: each entry is a list of trigger phrases plus a markdown-flavoured response.

## Deploy

Static-only — works on any host. For Vercel, `vercel.json` is included; for Netlify, `netlify.toml` is included. Both add SPA fallback and asset cache headers.

## Performance notes

- Hero Three.js scene is `React.lazy`-imported and unmounted when the hero scrolls out of view.
- `prefers-reduced-motion` disables the WebGL canvas entirely and stops the scroll-parallax blobs.
- A single `requestAnimationFrame`-throttled scroll subscription drives both the back-to-top button and the parallax effect.
- `vite.config.js` splits `three`, `framer-motion`, `lucide-react`, and `react` into separate chunks.

## SEO

`index.html` includes `description`, Open Graph, Twitter cards, canonical URL, and a `Person` JSON-LD block. To finish the deploy:

- Generate a 1200×630 social image and place it at `public/og-image.png`.
- Update the `og:url` / canonical URL in `index.html` if you change domains.

## Resumes

Resumes are no longer hosted in this repo. The hero "View Resume" button links to [thebharath.co](https://thebharath.co).

## Author

**Bharath Kumar Rajesh** — bharath.kr702@gmail.com · [github.com/thebharathkumar](https://github.com/thebharathkumar) · [linkedin.com/in/thebharathkumar](https://linkedin.com/in/thebharathkumar)
