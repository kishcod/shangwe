 Nyota Shangwe - Frontend (Vite + React + Tailwind) with Mock Backend

This repository is a ready-to-deploy project for the **Nyota Shangwe** M-Pesa frontend demo.

## What is included
- `frontend/` — Vite + React + Tailwind site (static, ready for GitHub Pages).
- `backend/` — minimal Express server that mocks `/api/stk-push` for local testing (useful with ngrok).
- `assets/` — placeholder Safaricom SVG logo.

## Quick start (local testing)
1. Install root dependencies:
   ```bash
   npm install
   ```
2. Install frontend + backend deps:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   cd ..
   ```
3. Run both frontend and backend concurrently:
   ```bash
   npm run dev
   ```
   - Frontend dev server (Vite) will run on `http://localhost:5173`
   - Backend mock server will run on `http://localhost:4000` and expose `/api/stk-push`.

## Deploy to GitHub Pages
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Push the `frontend/dist` contents to the `gh-pages` branch or use GitHub Actions / Pages configuration to serve `frontend/dist`.

## Notes
- The backend is a mock used only for testing STK push UI. Replace with real Safaricom integration in production.
- Manual Lipa na M-Pesa Till (as used in the UI): **8160572**.

