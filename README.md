# 🚀 Abdul Sami — Master Full-Stack Web & AI Practitioner Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PHP](https://img.shields.io/badge/Core%20PHP-8.2-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Performance](https://img.shields.io/badge/Lighthouse-96%2B-00C642?style=for-the-badge&logo=lighthouse&logoColor=white)

**Bridging Full-Stack Software Engineering with Data-Driven Intelligence & Deep Learning.**

[Live Demo](https://abdulsami.tech) • [Report Issue](https://github.com/AbdulSamiwork/Portfolio-/issues) • [Contact](mailto:sb850839@gmail.com)

</div>

---

## 🌟 Key Highlights & Features

- **⚡ High-Performance Architecture (96–100 PageSpeed):**
  - **Modern WebP Images:** 84.2% bandwidth reduction with zero visible quality loss.
  - **Rendering Acceleration:** `content-visibility: auto` skips layout computations for off-screen sections until scrolled into view.
  - **Code Splitting & Preconnect:** High-priority LCP preloading, instant DNS/TLS handshakes, and lazy-hydrated modals.
  - **Caching Engine:** 1-year immutable caching and `mod_deflate` Gzip compression configured in `.htaccess`.

- **🎨 Multi-Theme Color Matrix:**
  - Dynamic live theme switcher supporting **Emerald Matrix** (default), **Neon Violet**, **Cyber Cyan**, and **Amber Gold**.
  - Custom Aurora mesh gradient backdrops and responsive grid overlays.

- **📄 Universal PDF Resume & Print Engine:**
  - Cross-device persistence: Admin uploads sync directly to backend storage and reflect in real-time for all global visitors.
  - Custom print stylesheet that isolates the CV on crisp, borderless white A4 paper without printing navigation or page clutter.
  - Single-row action bar: Quick Print, Download Original PDF, and Close Modal.

- **💻 Interactive Developer Terminal Drawer:**
  - Press `~` or click the CLI badge to launch an interactive bash-like terminal emulator with custom commands (`help`, `skills`, `projects`, `contact`, `theme`, `clear`).

- **🛡️ Secure Admin Control Center (`/sami`):**
  - Dynamic CRUD management for projects, skills, hero metrics, and resume documents.
  - Fallback hybrid sync ensuring zero downtime if offline.

---

## 📂 Project Structure

```bash
Portfolio-/
├── api/                       # Core PHP RESTful API Backend
│   ├── auth/                  # Admin authentication & token verification
│   ├── config/                # Database PDO configuration & schemas
│   ├── core/                  # Response & CORS middlewares
│   ├── endpoints/             # REST routing endpoints (portfolio, resume, etc.)
│   ├── modules/               # Domain controllers (hero, skills, projects, contact)
│   └── uploads/               # Persistent file storage (resumes, media)
├── database/
│   └── abdul_sami_portfolio.sql  # Complete MySQL database dump & seed data
├── public/                    # Static assets & production configurations
│   ├── images/                # High-efficiency WebP imagery & fallback PNGs
│   ├── favicon.svg            # Custom SVG branding
│   ├── resume_abdul_sami.pdf  # Default resume document
│   └── .htaccess              # Production rewrite rules, mod_deflate & caching
├── src/                       # React 18 Application Source
│   ├── components/            # Reusable UI primitives, Navbar, Footer, CLI Drawer
│   ├── context/               # PortfolioContext & global state management
│   ├── data/                  # Default portfolio fallback datasets
│   ├── features/              # Feature modules (Hero, About, Skills, Projects, etc.)
│   ├── hooks/                 # Custom React hooks (scroll reveal, theme management)
│   ├── App.jsx                # Core application wrapper with code-splitting
│   ├── index.css              # Custom styling, matrix themes, and print rules
│   └── main.jsx               # React DOM entry point
├── index.html                 # HTML5 template with font preconnect & LCP preloads
├── package.json               # NPM dependencies and build scripts
├── vite.config.js             # Vite configuration with chunk splitting
└── .gitignore                 # Excluded build artifacts & sensitive environments
```

---

## 🛠️ Local Development Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **PHP** (v8.0+ with PDO & GD extensions enabled)
- **MySQL / MariaDB** (via XAMPP or standalone)

### 1. Clone the Repository
```bash
git clone https://github.com/AbdulSamiwork/Portfolio-.git
cd Portfolio-
```

### 2. Frontend Installation & Startup
```bash
# Install frontend dependencies
npm install

# Start Vite dev server on local network
npm run dev --host
```
The application will launch at `http://localhost:5173`.

### 3. Backend & Database Setup
1. Import `database/abdul_sami_portfolio.sql` into your local MySQL server (via phpMyAdmin or MySQL CLI):
   ```bash
   mysql -u root -p abdul_sami_portfolio < database/abdul_sami_portfolio.sql
   ```
2. Serve the `api/` directory via Apache or PHP Built-in Server:
   ```bash
   # From root or inside api directory
   php -S localhost:8000 -t api
   ```
3. Update `api/config/Database.php` with your local database credentials if they differ from default (`root` / empty password).

---

## 🚀 Building for Production

To create a minified, production-ready bundle:
```bash
npm run build
```
The output will be generated inside the `dist/` directory, ready to be deployed to any static host (Vercel, Netlify, Cloudflare Pages) or coupled with Apache on InfinityFree / Hostinger.

---

## 👨‍💻 Author

**Abdul Sami**  
Full-Stack Web Developer & AI / Machine Learning Practitioner  
- **Email:** [sb850839@gmail.com](mailto:sb850839@gmail.com)  
- **GitHub:** [@Abdul-Sami1122](https://github.com/Abdul-Sami1122) / [@AbdulSamiwork](https://github.com/AbdulSamiwork)  
- **LinkedIn:** [Abdul Sami](https://linkedin.com/in/abdul-sami)  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
