# Bharath Kumar Rajesh — Portfolio

Personal portfolio site. Live: [thebharathkumar.netlify.app](https://thebharathkumar.netlify.app/).

## Stack

- **React 19** + **Vite 7** for the app
- **Three.js** (`@react-three/fiber`, `@react-three/drei`) for the hero scene, lazy-loaded and gated behind `prefers-reduced-motion` + an `IntersectionObserver`
- **Framer Motion** for entrance and scroll animations
- **lucide-react** for icons
- Light + dark theme via `ThemeContext` with `localStorage` persistence
- Serverless `api/chat.js` (Vercel Node function) calling **Claude Opus 4.7** with prompt caching — falls back to a static knowledge base when the endpoint is unavailable

## Project layout

```
.
├── api/chat.js                   # Serverless chat backend (Anthropic SDK)
├── index.html                    # SEO meta + Open Graph + JSON-LD person schema
├── public/                       # Static assets (favicon, resumes, robots.txt, sitemap.xml, 404.html)
│   └── resumes/                  # 16 role-specific PDFs
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

## Chatbot backend

The floating BK·AI chatbot calls `POST /api/chat`. It works in two modes:

| Mode               | Trigger                                    | Behavior                                  |
| ------------------ | ------------------------------------------ | ----------------------------------------- |
| **LLM**            | `ANTHROPIC_API_KEY` is set on the host     | Real Claude responses (Opus 4.7 + prompt caching) |
| **Static fallback**| API returns 503/404 or runs static-only    | Pattern-matched answers from a built-in KB |

Because of the fallback, **the site works on any static host** (Netlify, GitHub Pages, S3) — only the LLM mode requires a host that runs serverless functions. The footer line in the chatbot reflects which mode is active.

### Vercel deploy

1. Connect the repo on Vercel.
2. Add `ANTHROPIC_API_KEY` in **Project Settings → Environment Variables**.
3. Deploy — `api/chat.js` becomes available at `/api/chat` automatically.

### Netlify deploy

The current code keeps the LLM endpoint at `api/chat.js` (Vercel format). Netlify can serve the static site as-is; for the LLM chatbot on Netlify, port `api/chat.js` into `netlify/functions/chat.js` and add a redirect:

```toml
[[redirects]]
  from = "/api/chat"
  to = "/.netlify/functions/chat"
  status = 200
```

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

`public/resumes/` holds 16 role-targeted PDFs (AI / ML / SWE / Data / Cloud / DevOps / SRE / QA / Solutions / DevRel / PM / Research / etc.). The hero "Download Resume" modal groups them into three domains so visitors don't drown.

## Author

**Bharath Kumar Rajesh** — bharath.kr702@gmail.com · [github.com/thebharathkumar](https://github.com/thebharathkumar) · [linkedin.com/in/thebharathkumar](https://linkedin.com/in/thebharathkumar)
