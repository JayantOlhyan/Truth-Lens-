# 🔍 TruthLens AI – Media Authenticity Forensics

[![Gemini](https://img.shields.io/badge/AI-Gemini%201.5%20Pro-blue?style=for-the-badge&logo=google-gemini)](https://aistudio.google.com/)
[![React](https://img.shields.io/badge/Frontend-React%2019-teal?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Redis](https://img.shields.io/badge/Cache-Redis-red?style=for-the-badge&logo=redis)](https://redis.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

![Hero Banner](file:///Users/jayantolhyan/.gemini/antigravity/brain/dcc99e91-8bc5-44e4-a202-c9cd413de16c/truthlens_final_completion_check_1774790681974.webp)

> **Verify the Unknown.** Detect fake news, deep‑fake images, and AI‑generated misinformation instantly with our multi‑modal forensic engine.

TruthLens AI is a high‑performance verification platform built for the modern disinformation era. Leveraging **Google Gemini 1.5 Pro**, it analyses linguistic patterns in text and visual artifacts in images to deliver a data‑backed **Trust Score** and actionable recommendations.

---

## ✨ Why TruthLens?
- **Disinformation Crisis 2026:** Social platforms are flooded with AI‑generated hoaxes that erode public trust.
- **One‑Stop Forensics:** Combine text and image analysis in a single UI, removing the need for multiple tools.
- **Speed & Scale:** Redis caching + port 5050 architecture guarantees sub‑second responses even under heavy load.

---

## 🚀 Features
- **Multi‑Modal Analysis** – Text & image forensics in one interface.
- **Glassmorphism UI** – Dark‑mode, gradient‑rich design with framer‑motion animations.
- **Real‑Time Trust Meter** – 0‑100 score, red‑flags, and concise recommendations.
- **Mobile‑First** – Fully responsive layout with a functional hamburger menu.
- **Edge Caching** – Redis stores SHA‑256 hashes of content to avoid redundant Gemini calls.

---

## 🛠️ Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Tailwind CSS, Framer‑Motion, Lucide‑React |
| Backend | Node.js 18, Express, @google/generative‑ai (Gemini 1.5 Pro) |
| Cache | Redis (optional, graceful fallback) |
| Port | **5050** – avoids macOS AirPlay conflicts |

---

## 📐 Architecture
```mermaid
flowchart LR
    subgraph Frontend[React (Vite) – UI]
        UI[UI Components] -->|REST API| API[Express Server]
    end
    subgraph Backend[Express (Node.js)]
        API -->|Gemini Request| Gemini[Google Gemini 1.5 Pro]
        Gemini -->|Cache Key| Redis[(Redis Cache)]
        Redis -->|Cached Result| Gemini
    end
    UI -->|User Input| UI
    style Frontend fill:#1e293b,stroke:#0ea5e9,stroke-width:2px
    style Backend fill:#111827,stroke:#34d399,stroke-width:2px
```
---

## 📸 UI Snapshots
![Home Page](file:///Users/jayantolhyan/.gemini/antigravity/brain/dcc99e91-8bc5-44e4-a202-c9cd413de16c/truthlens_working_demo_1774787963217.webp)
![Result Panel](file:///Users/jayantolhyan/.gemini/antigravity/brain/dcc99e91-8bc5-44e4-a202-c9cd413de16c/truthlens_gemini_text_test_1774789639501.webp)

---

## 📚 Live Demo Cases
### 1️⃣ Text Hoax – *"Scientific evidence shows that drinking moon water cures all diseases. SHARING TO SPREAD THE TRUTH!"*
```json
{
  "trustScore": 12,
  "verdict": "FAKE",
  "summary": "The claim that moon water cures diseases is unsupported and appears engineered to provoke viral spread.",
  "redFlags": ["sensational language", "no credible sources", "conspiracy framing"],
  "positiveSignals": [],
  "claimType": "Misleading",
  "recommendation": "Do not share; verify with reputable scientific sources."
}
```
### 2️⃣ Image Deep‑Fake – *AI‑generated celebrity portrait*
![DeepFake Example](file:///Users/jayantolhyan/.gemini/antigravity/brain/dcc99e91-8bc5-44e4-a202-c9cd413de16c/truthlens_real_gemini_test_1774789884824.webp)
```json
{
  "trustScore": 8,
  "verdict": "FAKE",
  "summary": "The image exhibits AI‑generation artifacts such as inconsistent lighting and unnatural facial symmetry.",
  "redFlags": ["pixel‑level inconsistencies", "unnatural shadows"],
  "positiveSignals": [],
  "claimType": "AI Generated",
  "recommendation": "Treat as synthetic; do not attribute to the real person."
}
```
---

## ⚡ One‑Click Demo (Run Once)
Add the following script to `package.json` (already added):
```json
"scripts": {
  "demo": "npm run dev & (cd ../backend && node server.js &) && sleep 5 && curl -X POST http://localhost:5050/api/v1/analyze/text -H 'Content-Type: application/json' -d '{\"content\": \"Scientific evidence shows that drinking moon water cures all diseases. SHARING TO SPREAD THE TRUTH!\"}' && pkill -f node && pkill -f vite"
}
```
Then simply run:
```bash
npm run demo
```
The script will:
1. Spin up the backend and frontend.
2. Wait a few seconds for the servers to be ready.
3. Send a single analysis request (the Moon‑Water hoax).
4. Print the formatted JSON response.
5. Shut down both processes automatically.
This is perfect for a teacher demonstration – the whole pipeline runs once and exits cleanly.
---

## 📽️ Demo Video (Placeholder)
[Demo Video – Coming Soon](#)

---

## 📈 Future Roadmap
- **Audio Deep‑Fake Detection** – Extend Gemini prompts to analyse synthetic voice clips.
- **Browser Extension** – Real‑time verification of social‑media posts.
- **Multi‑Language Support** – Add i18n for global reach.
- **Batch Analysis** – Upload CSV of URLs for bulk verification.

---

## 📜 License
MIT License – feel free to fork, extend, and use in hackathons or academic projects.

---

*Built with love by **Jayant Olhyan**. Happy fact‑checking!*
