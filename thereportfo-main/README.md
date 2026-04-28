# Portfolio Website - Bharath Kumar Rajesh

A modern, responsive portfolio website featuring an AI Text Cleaner-inspired theme with clean design and smooth animations.

## 🎨 Design Theme

This portfolio is inspired by modern AI tool interfaces, featuring:
- Clean, professional layout with bordered sections
- Warm beige/cream background (#F5E6D3)
- Yellow highlighted sections for important content
- Blue action buttons and interactive elements
- Professional typography with Sora and Work Sans fonts
- Smooth animations and transitions

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Smooth Animations**: Scroll-triggered animations and smooth transitions
- **Interactive Resume Modal**: Choose from 3 different resume types
- **Contact Form**: Direct email integration using mailto
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Scroll Animations**: Elements fade in as you scroll
- **Stats Counter**: Animated statistics in the About section
- **Back to Top Button**: Quick navigation back to top
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📁 Project Structure

```
thereportfo/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── resumes/           # Resume PDF files
│   ├── software-engineer-resume.pdf
│   ├── data-engineer-resume.pdf
│   └── ml-engineer-resume.pdf
└── README.md          # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for interactivity
- **Google Fonts**: Sora and Work Sans

## 📋 Sections

1. **Hero/Landing**: Name, tagline, and call-to-action buttons
2. **About Me**: Personal introduction and key statistics
3. **Experience**: Timeline of work experience with technologies used
4. **Projects**: Featured projects with highlights and tech stacks
5. **Skills**: Categorized technical skills
6. **Education**: Academic background and coursework
7. **Certifications**: Industry certifications and professional simulations
8. **Publications**: Published research and papers
9. **Contact**: Contact form and social links

## 🎯 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/thebharathkumar/thereportfo.git
   cd thereportfo
   ```

2. **Add Resume PDFs**
   - Place your resume PDF files in the `resumes/` folder
   - Name them as specified in resumes/README.md

3. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Or
     npx serve
     ```

4. **Customize Content**
   - Update contact information in `index.html`
   - Modify colors in `styles.css` CSS variables section
   - Add your project links and GitHub URLs

## 🎨 Color Palette

```css
--bg-primary: #F5E6D3          /* Warm beige background */
--bg-secondary: #FFFFFF        /* White sections */
--highlight-yellow: #F4D35E    /* Yellow highlights */
--highlight-blue: #2E5BFF      /* Blue buttons */
--text-primary: #1a1a1a        /* Main text */
--text-secondary: #4a4a4a      /* Secondary text */
--border-color: #2a2a2a        /* Section borders */
```

## 📱 Responsive Breakpoints

- **Desktop**: 969px and above
- **Tablet**: 768px - 968px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## ✨ Key Features Explained

### Resume Modal
Click "Download Resume" to see a modal with 3 resume options:
- Software Engineer Resume
- Data Engineer Resume
- ML/AI Engineer Resume

### Contact Form
The contact form uses `mailto:` to open the user's default email client with pre-filled information.

### Smooth Scrolling
Navigation links smoothly scroll to their respective sections with offset for the fixed navbar.

### Scroll Animations
Elements fade in and slide up as they enter the viewport using Intersection Observer API.

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub
2. Go to repository Settings > Pages
3. Select main branch as source
4. Your site will be live at `https://yourusername.github.io/thereportfo`

### Netlify
1. Connect your GitHub repository
2. Deploy settings:
   - Build command: (none)
   - Publish directory: `/`
3. Deploy!

### Vercel
```bash
vercel --prod
```

## 📝 Customization Guide

### Update Personal Information
1. Open `index.html`
2. Search for contact details and update:
   - Email addresses
   - Phone number
   - LinkedIn URL
   - GitHub URL
   - Location

### Change Colors
1. Open `styles.css`
2. Modify CSS variables in the `:root` section
3. All colors will update automatically

### Add Projects
1. Locate the projects section in `index.html`
2. Copy an existing project card
3. Update the content with your project details

## 🐛 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available for personal use.

## 👤 Author

**Bharath Kumar Rajesh**
- Email: bharath.kr702@gmail.com
- LinkedIn: [thebharathkumar](https://linkedin.com/in/thebharathkumar)
- GitHub: [thebharathkumar](https://github.com/thebharathkumar)
- Portfolio: thebharathkumar.netlify.app

## 🙏 Acknowledgments

- Design inspired by modern AI tool interfaces
- Fonts from Google Fonts
- Icons using Unicode emojis for lightweight performance

---

Built with ❤️ by Bharath Kumar Rajesh