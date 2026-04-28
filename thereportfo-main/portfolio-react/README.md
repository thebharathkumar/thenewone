# Neo-Brutalism Portfolio - Bharath Kumar Rajesh

A stunning, modern portfolio website built with React, featuring 3D animations, neo-brutalism design, and interactive elements.

## 🎨 Design Features

- **Neo-Brutalism Aesthetic**: Bold colors, thick borders, dramatic shadows
- **3D Animations**: React Three Fiber for WebGL 3D graphics
- **Smooth Animations**: Framer Motion for fluid transitions
- **Interactive Elements**: Hover effects, scroll animations, floating shapes
- **Fully Responsive**: Works perfectly on all devices
- **Modern Stack**: React 18 + Vite for blazing fast performance

## 🚀 Technologies

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Three Fiber** - 3D graphics with Three.js
- **@react-three/drei** - Helpers for React Three Fiber
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Space Grotesk & JetBrains Mono** - Typography

## 🎯 Key Features

### 3D Elements
- Animated 3D shapes in hero section (cubes, spheres, torus)
- Auto-rotating 3D background
- Interactive OrbitControls
- Wireframe aesthetic

### Animations
- Scroll-triggered animations
- Hover effects on all interactive elements
- Page load animations
- Smooth transitions between sections
- Floating geometric shapes
- Glitch effects (optional)

### Neo-Brutalism Design
- Bold color palette (Yellow, Pink, Blue, Green)
- Thick black borders (4-6px)
- Dramatic shadows (8-16px offset)
- Geometric shapes as decorative elements
- High contrast design
- Monospace fonts for tags

### Sections
1. **Hero** - Animated title, 3D background, CTA buttons
2. **About** - Introduction with animated stats
3. **Experience** - Timeline layout with current role badges
4. **Projects** - 3D card grid with hover effects
5. **Skills** - Categorized tech stack with tags
6. **Education** - University cards with icons
7. **Certifications** - Achievement showcase
8. **Publications** - Research highlights
9. **Contact** - Connect section (NO phone number included as requested)
10. **Back to Top** - Animated button

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Development

```bash
# Start dev server (usually http://localhost:5173)
npm run dev
```

The app will hot-reload as you make changes.

## 🏗️ Build

```bash
# Create production build
npm run build
```

Builds the app to the `dist` folder, optimized and minified.

## 🚀 Deployment

### Netlify
1. Connect your GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Vercel
```bash
vercel --prod
```

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 📁 Project Structure

```
portfolio-react/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx & .css
│   │   ├── Hero.jsx & .css (with 3D elements)
│   │   ├── About.jsx & .css
│   │   ├── Experience.jsx & .css
│   │   ├── Projects.jsx & .css
│   │   ├── Skills.jsx & .css
│   │   ├── Education.jsx & .css
│   │   ├── Certifications.jsx & .css
│   │   ├── Publications.jsx & .css
│   │   ├── Contact.jsx & .css
│   │   ├── Footer.jsx & .css
│   │   └── BackToTop.jsx & .css
│   ├── App.jsx - Main component
│   ├── App.css - Global styles & neo-brutalism design system
│   ├── index.css - Minimal base styles
│   └── main.jsx - Entry point
├── public/ - Static assets
├── dist/ - Production build
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Color Palette

```css
--bg-primary: #FEFAE0      /* Cream background */
--bg-secondary: #FAEDCD    /* Light tan */
--accent-yellow: #FFC700   /* Bold yellow */
--accent-pink: #FF006E     /* Hot pink */
--accent-blue: #00F5FF     /* Cyan */
--accent-green: #00FF88    /* Bright green */
--accent-purple: #B300FF   /* Electric purple */
--accent-orange: #FF6B35   /* Orange */
--black: #000000           /* Pure black */
--white: #FFFFFF           /* Pure white */
```

## ✨ Customization

### Update Personal Info
All content is in the component files. Update:
- `Contact.jsx` - Email, LinkedIn, GitHub (NO phone number)
- `Hero.jsx` - Name and tagline
- `About.jsx` - Personal introduction
- `Experience.jsx` - Work history
- `Projects.jsx` - Portfolio projects

### Change Colors
Modify CSS variables in `App.css`:
```css
:root {
  --accent-yellow: #YOUR_COLOR;
  --accent-pink: #YOUR_COLOR;
  /* etc. */
}
```

### Adjust Animations
Modify Framer Motion props in components:
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
```

### 3D Elements
Customize in `Hero.jsx`:
```jsx
<Box position={[x, y, z]} args={[w, h, d]}>
  <meshStandardMaterial color="#COLOR" wireframe />
</Box>
```

## 🐛 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note**: 3D features require WebGL support.

## 📱 Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

## ⚡ Performance

- Vite for lightning-fast builds
- Code splitting for optimal loading
- Lazy loading for images
- Optimized 3D rendering
- Minimal dependencies

## 🔒 Privacy

**NO PHONE NUMBER** is included in the contact section as requested by the user. Only email and social links are provided.

## 📄 License

Open source for personal use.

## 👤 Author

**Bharath Kumar Rajesh**
- Email: bharath.kr702@gmail.com
- LinkedIn: [thebharathkumar](https://linkedin.com/in/thebharathkumar)
- GitHub: [thebharathkumar](https://github.com/thebharathkumar)

## 🙏 Acknowledgments

- Design inspired by neo-brutalism movement
- 3D graphics powered by Three.js & React Three Fiber
- Animations by Framer Motion
- Icons by Lucide React
- Fonts from Google Fonts

---

Built with ⚡ React, 🎨 Creativity, and ❤️ by Bharath Kumar Rajesh
