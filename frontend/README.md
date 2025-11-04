# Frontend (React + Vite) — IA03

_This file documents how the frontend works and how to run it._

---

## Tech highlights
- Vite + React
- Tailwind CSS for styling
- React Hook Form for form validation
- React Query for API calls (registration mutation)

---

## Quick start (development)

```bash
cd frontend
npm install
# Ensure VITE_API_URL in .env.development.local points to your backend (default: http://localhost:3000)
npm run dev
```

---

## Useful scripts (in `frontend/package.json`)
- `dev` — start Vite dev server
- `build` — build production bundle
- `preview` — preview production build

---

## Environment
- `.env.development.local` — contains `VITE_API_URL` for development. See `.env.example`.

---

## How Register works
- Form: `src/pages/Register.jsx` uses `react-hook-form` and `src/components/Input.jsx` (forwards ref).
- Validation: `src/utils/validators.js` (email + password rules). Password policy is synced with backend (8-128 chars, uppercase, lowercase, digit, allowed special chars, no spaces).
- API: `src/services/userService.js` posts to `${VITE_API_URL}/user/register`.
- React Query: mutation exposed via `src/hooks/useAuth.js`.
