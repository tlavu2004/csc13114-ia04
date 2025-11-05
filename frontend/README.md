# Frontend (React + Vite) — IA03

_React SPA implementing JWT authentication with Axios, React Query, and React Hook Form._

---

## Tech highlights

- Vite + React
- Tailwind CSS
- React Hook Form for login form
- React Query for login/logout and fetching protected data
- Axios with interceptors (access token + auto refresh)
- Protected routes with React Router v6

---

## Quick start (development)

```bash
cd frontend
npm install
# Ensure VITE_API_URL in .env.development.local points to your backend (default: http://localhost:3000)
npm run dev
```

---

## Key files

- `context/auth/AuthProvider.jsx` — Auth context, login/ - logout, access/refresh token management
- `hooks/useLogin.js` — useMutation for login
- `hooks/useLogout.js` — useMutation for logout
- `hooks/useAxiosPrivate.js` — Axios instance with interceptors
- `components/ProtectedRoute.jsx` — Guard dashboard route
- `pages/Login.jsx` — Login page using React Hook Form
- `pages/Dashboard.jsx` — Protected dashboard
- `services/api.js` — Axios instance
- `services/authService.js` — login / refresh / logout calls

---

## How it works

- **Login**: User enters email/password → `useLogin` mutation → sets `auth` context + stores refresh token.
- **ProtectedRoute**: Checks `auth.user` → redirects to `/login` if not logged in.
- **Axios**: All requests attach access token; 401 triggers refresh → if refresh fails, logout + redirect.
- **Logout**: Clears auth, removes refresh token, clears React Query cache, redirects to login.

---

## Useful scripts (in `frontend/package.json`)

- `dev` — start Vite dev server
- `build` — build production bundle
- `preview` — preview production build

---

## Environment

- `.env.development.local` — contains `VITE_API_URL` for development. See `.env.example`.

---

## Notes

- Error messages shown when login fails or refresh token expired.
- Access token stored in memory, refresh token in localStorage as per assignment.
- Protected data fetched using useQuery with useAxiosPrivate.
