# Vercel Deployment Guide

This project is configured and ready for **1-click deployment on [Vercel](https://vercel.com)**.

---

## 🚀 Option 1: Deploy via GitHub (Recommended)

1. **Push this repository to GitHub**:
   ```bash
   git add .
   git commit -m "Super Mario Bros. Wonder 67 stages app"
   git push origin main
   ```

2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your GitHub repository.
   - Vercel will automatically detect the settings from `vercel.json`:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click **Deploy**!

---

## 💻 Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy directly from the terminal**:
   ```bash
   vercel
   ```
   Follow the prompts to link your project.

3. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## ⚙️ Configuration Included

- **`vercel.json`**: Pre-configured with SPA client-side routing (`rewrites` to `/index.html`), caching headers for assets, and Vite preset.
- **Static Assets (`/public/assets/images`)**: Hero banners, character transformation art, and Wonder Flower illustrations are bundled into `dist/assets/images/` for instant CDN delivery.
- **Audio Synthesizer**: Runs entirely client-side via the Web Audio API with zero external media latency.
- **Progress Tracking**: Saved in browser `localStorage` for all 67 stages.
