# E Parthasarathy - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a stunning dark theme with smooth animations, interactive components, and professional presentation of skills, projects, and certifications.

![Portfolio Preview](project\src\assets\img2.PNG)

## ✨ Features

### 🎨 Design & UI
- **Modern Dark Theme**: Sophisticated dark design with gradient backgrounds
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations**: Subtle micro-interactions and hover effects
- **Glass Morphism**: Backdrop blur effects and translucent elements
- **Custom Scrollbar**: Gradient-styled scrollbar matching the theme
- **Theme Toggle**: Switch between dark and light modes

### 🧭 Navigation
- **Smooth Scrolling**: Seamless navigation between sections
- **Active Section Highlighting**: Dynamic navigation state updates
- **Mobile-Friendly Menu**: Collapsible navigation for mobile devices
- **Fixed Header**: Always accessible navigation bar

### 📱 Sections
- **Hero Section**: Eye-catching introduction with animated elements
- **About Me**: Professional background with skills showcase
- **Certifications**: Interactive certification cards with dual verification links
- **Projects**: Portfolio showcase with detailed project information
- **Contact**: Professional contact form with social media links
- **Footer**: Additional links and contact information

### 🔗 Interactive Elements
- **Certification Verification**: Dual links for PDF download and online verification
- **Project Links**: Direct links to GitHub repositories and live demos
- **Social Media Integration**: Professional social media profiles
- **Contact Form**: Functional contact form with validation

## 🚀 Technologies Used

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons

### Build Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing with Autoprefixer

### Styling
- **Custom CSS Variables** - Consistent theming
- **CSS Grid & Flexbox** - Modern layout techniques
- **CSS Animations** - Smooth transitions and effects
- **Responsive Breakpoints** - Mobile-first design approach

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/sara020706/portfolio-by-sara
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Navigation.tsx   # Header navigation
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Certifications.tsx # Certifications showcase
│   ├── Projects.tsx     # Projects portfolio
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Footer section
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── index.css            # Global styles and Tailwind imports
└── vite-env.d.ts        # TypeScript declarations

public/                  # Static assets
├── vite.svg            # Vite logo
└── ...

config files/           # Configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Project dependencies
```

## 🎨 Customization

### Personal Information
Update the following files with your personal information:

1. **src/components/Hero.tsx** - Name, title, and introduction
2. **src/components/About.tsx** - Professional background and skills
3. **src/components/Certifications.tsx** - Your certifications and credentials
4. **src/components/Projects.tsx** - Your projects and portfolio items
5. **src/components/Contact.tsx** - Contact information and social links

### Styling
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Fonts**: Update `index.html` and CSS for different typography
- **Animations**: Customize animations in `src/index.css`

### Content
- **Images**: Replace placeholder images with your professional photos
- **Links**: Update all social media and project links
- **Certifications**: Add your actual certification PDFs and verification URLs

## 🔧 Configuration

### Environment Variables
Create a `.env` file for any environment-specific configurations:

```env
VITE_APP_TITLE=E ParthasarathyPortfolio
VITE_CONTACT_EMAIL=ps2601296@gmail.com
VITE_GITHUB_URL=https://github.com/sara020706
VITE_LINKEDIN_URL=https://www.linkedin.com/in/parthasarthy-e-48019a327
```

### Tailwind Configuration
The `tailwind.config.js` includes:
- Custom color palette
- Extended animations
- Custom font families
- Responsive breakpoints

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌟 Key Features Explained

### Certification System
Each certification card includes:
- **PDF Download**: Direct link to certificate PDF
- **Online Verification**: Link to official verification portal
- **Credential ID**: Unique identifier for verification
- **Issuer Information**: Official certification body
- **Date Issued**: Certification date
- **Description**: Brief explanation of certification value

### Project Showcase
Each project includes:
- **Live Demo**: Link to deployed application
- **Source Code**: GitHub repository link
- **Technology Stack**: Technologies used
- **Project Description**: Detailed explanation
- **Screenshots**: Visual preview of the project

### Contact Integration
- **Professional Email**: Direct mailto links
- **Social Media**: LinkedIn, GitHub, Coding profiles
- **Contact Form**: Functional form with validation
- **Location**: Professional location information

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project
2. Upload `dist` folder to Netlify
3. Configure custom domain (optional)

### Deploy to Vercel
1. Connect GitHub repository
2. Configure build settings
3. Deploy automatically on push

### Deploy to GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sara020706).

## 📞 Contact

**Alex Johnson**
- Email: alex@example.com
- LinkedIn: [linkedin.com/in/alexjohnson](https://www.linkedin.com/in/parthasarthy-e-48019a327)
- GitHub: [github.com/alexjohnson](https://github.com/sara020706)
- Portfolio: [alexjohnson.dev](https://alexjohnson.dev)

---

⭐ **If you found this portfolio template helpful, please give it a star!**

Built with ❤️ using React, TypeScript, and Tailwind CSS

