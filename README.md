# 🔍 TruthLens AI - Media Authenticity Forensics

[![Gemini](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-blue?style=for-the-badge&logo=google-gemini)](https://aistudio.google.com/)
[![React](https://img.shields.io/badge/Frontend-React%2019-teal?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Redis](https://img.shields.io/badge/Cache-Redis-red?style=for-the-badge&logo=redis)](https://redis.io/)

> **Verify the Unknown.** Detect fake news, deepfake images, and AI-generated misinformation instantly with our multi-modal forensic engine.

TruthLens AI is a high-performance verification platform designed for the modern disinformation era. Using **Google Gemini 1.5 Pro/Flash**, it analyzes linguistic patterns in text and visual artifacts in images to provide a data-backed "Trust Score."

---

## ✨ Features

- **Multi-Modal Analysis**: Analyze viral news snippets or suspect social media images in one unified interface.
- **Glassmorphism UI**: A premium, dark-mode design with smooth framer-motion animations and vibrant gradients.
- **Forensic Scoring**: Detailed breakdowns including a **Trust Meter (0-100)**, **Red Flags**, and **Actionable Recommendations**.
- **Edge Caching**: Integrated **Redis** caching with SHA-256 content hashing for sub-100ms response times on repeated queries.
- **Mobile First**: Fully responsive design with a dedicated mobile navigation system.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Routing**: React Router 7
- **Styling**: Tailwind CSS + Glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Engine**: Node.js + Express
- **AI**: Google Generative AI (Gemini 1.5 Flash)
- **Middleware**: Multer (File Handling), CORS, Rate Limiter
- **Data**: Redis (Caching Layer)

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js (v18+)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 2. Environment Setup
Create a `.env` file in the `/backend` directory:
```env
GEMINI_API_KEY=your_key_here
PORT=5050
REDIS_URL=redis://localhost:6379 
```
*Note: We use **Port 5050** to avoid native macOS AirPlay conflicts on Port 5000.*

### 3. Installation
```bash
# Install root dependencies
npm install

# Run Backend
cd backend && npm install && npm run dev

# Run Frontend
cd frontend && npm install && npm run dev
```

---

## 🔬 Forensic Intelligence

TruthLens AI doesn't just "guess." It performs:
- **Linguistic Forensics**: Checking for emotional manipulation, logical fallacies, and lack of attribution.
- **Visual Artifact Detection**: Identifying AI-generated inconsistencies in lighting, shadows, and anatomical details.
- **Fact-Check Cross-Referencing**: Leveraging Gemini's broad knowledge base to identify known viral hoaxes.

---

## 🤝 Team
Developed by **Jayant Olhyan (Hack Homies)**.

---

## 📜 License
MIT License - Case-study project for hackathons.
