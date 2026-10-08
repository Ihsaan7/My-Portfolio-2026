# Portfolio-2026

# Ihsaan Ullah — Software Engineer Portfolio

> Minimalist, typography-driven portfolio inspired by the clean editorial design of `racheljohnson.net`, engineered with an **Interactive Multi-Persona Switcher** that dynamically morphs between 4 technical disciplines.

[![Live Demo](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://netflixuiclone-eight.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Ihsaan7-181717?logo=github)](https://github.com/Ihsaan7)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ihsaan%20Ullah-0A66C2?logo=linkedin)](https://linkedin.com/in/ihsaan7)

---

## 🧭 Multi-Persona Architectural Switcher

The portfolio dynamically morphs its theme, typography highlights, skills matrix, interactive sandboxes, and project showcases across four distinct engineering disciplines:

### 1. ⚙️ Backend Engineer (Default & Primary Focus)
- **Core Stack**: NestJS, Node.js, Express.js, PostgreSQL (Relational Schemas & ACID Transactions), MongoDB, Mongoose, Docker, JWT & RBAC.
- **Background**: Scrimba Backend Developer Path Certified.
- **Featured Project**: [BookVault — NestJS Enterprise Backend](https://nest-js-book-vault.vercel.app/) ([GitHub](https://github.com/Ihsaan7/Book_Vault-NEST.JS-Backend)).

### 2. 🚀 DevOps & Infrastructure
- **Core Stack**: GitHub Actions (CI/CD `ci.yml`), Docker, Docker Compose, WSL2 (Ubuntu Linux), Cisco CCNAv7 Networking, Google IT Support.
- **Background**: Cisco Certified CCNAv7 (Introduction to Networks) & Google IT Support Professional program.
- **Featured Project**: [BookVault-CI — Automated GitHub Actions CI/CD Pipeline](https://github.com/Ihsaan7/Bookvault-CI).

### 3. 🎨 Frontend Developer
- **Core Stack**: React.js, Next.js (App Router), Tailwind CSS, TypeScript, Component Systems, Responsive UI Architecture.
- **Background**: Certified by Meta in Introduction to Front-End Development (Coursera ID: `88RNLHLMSGY2`).
- **Featured Projects**:
  - [Netflix UI Clone (Next-MovieApp)](https://netflixuiclone-eight.vercel.app/) ([GitHub](https://github.com/Ihsaan7/NExt-MovieApp))
  - [AnimeBom Discovery Platform](https://animabom.vercel.app/) ([GitHub](https://github.com/Ihsaan7/AnimeBom))
  - [Soft UI Dashboard 3](https://softui3dashbui.vercel.app/) ([GitHub](https://github.com/Ihsaan7/Soft_UI_Dashboard3))

### 4. 🛡️ Software Engineer & Security
- **Core Stack**: Python (Scikit-Learn ML), Random Forest Binary Classifiers, GNS3 & VMware Simulated Networks, Wireshark PCAP inspection, C++, Linux.
- **Background**: Certified in Cyber Security by Arfa Karim Technology Incubator (ASTP) (Cohort C5, ID: `PB-LAT-001-25-364`).
- **Centerpiece**: BS Software Engineering Final Year Project — *Machine Learning-Based Cyber Attack Detection in Simulated Networks* (Detecting volumetric SYN flood spikes in real time).

---

## 🏛️ Professional Experience & Education

- **Enterprise Data Operations**: Junior Executive (Data Operations) at **NADRA (National Database & Registration Authority)**, Mega Center, Islamabad (Jan 2026 – Present).
  - High-throughput identity verification data operations in secure national database infrastructure.
  - Strict compliance with official security standards and document verification protocols.
- **Academic Degree**: BS Software Engineering (BSSE), Virtual University of Pakistan, Islamabad (VU ID: `BC220212371`).

---

## 🔒 Built-in Security Architecture

Designed with a security-first engineering mindset:
- **HTTP Security Headers (`vercel.json`)**:
  - `Content-Security-Policy (CSP)`: Strict origin restrictions preventing script injection.
  - `X-Frame-Options: DENY`: Full protection against clickjacking.
  - `X-Content-Type-Options: nosniff`: Prevents MIME sniffing attacks.
  - `Referrer-Policy: strict-origin-when-cross-origin`: Private metadata handling.
  - `Permissions-Policy`: Restricts camera, microphone, geolocation access.
  - `Strict-Transport-Security (HSTS)`: Enforces TLS/HTTPS.
- **Form Input Sanitization & Anti-Abuse**:
  - HTML tag stripping to neutralize DOM-based XSS.
  - Anti-bot hidden honeypot traps dropping spam crawler submissions.
  - Direct inbox delivery via FormSubmit with seamless `mailto:` client fallback.
- **Safe Sandboxing**:
  - All interactive engineering simulations run in pure client-side isolated browser sandboxes with zero external packet generation.

---

## ⚡ Tech Stack & Tools

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (Import via `@import "tailwindcss";`)
- **Animations**: Motion (Framer Motion v12) for layout morphing & spring physics
- **Icons**: Lucide React
- **Type Safety**: TypeScript 5.7+
- **Hosting**: Vercel (Single-command deployment)

---

## 🚀 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ihsaan7/Portfolio-2026.git
   cd Portfolio-2026
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or `http://localhost:5173`) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Vercel

This repository includes a turnkey `vercel.json` configuration with production security headers.

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Import `Ihsaan7/Portfolio-2026` from GitHub.
3. Keep default settings (Framework preset: `Vite`, Build command: `npm run build`, Output directory: `dist`).
4. Click **Deploy**.

---

## 📬 Contact & Connect

- **Email**: [ihsaan2215@gmail.com](mailto:ihsaan2215@gmail.com)
- **Phone**: +92 3366 699866
- **LinkedIn**: [linkedin.com/in/ihsaan7](https://linkedin.com/in/ihsaan7)
- **GitHub**: [github.com/Ihsaan7](https://github.com/Ihsaan7)
- **Location**: Islamabad, Pakistan

---
© 2026 Ihsaan Ullah · BS Software Engineering · Islamabad, Pakistan
