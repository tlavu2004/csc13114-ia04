# Backend — NestJS (IA03)

_This folder contains the backend API for IA03. It implements the `/user/register` endpoint with validation and password hashing._

---

## Quick start (development)

```bash
cd backend
npm install
# Set environment variables (example .env):
# MONGODB_URI=mongodb://localhost:27017/ia03
# ALLOWED_ORIGINS=http://localhost:5173
npm run start:dev
```

---

## API
- **POST** `/user/register`
  - Request body: `{ "email": string, "password": string }`
  - Responses:
    - 201: `{ message: 'User registered successfully', user: { id, email, createdAt } }`
    - 400: validation or duplicate email (body contains message)

---

## Validation & security
- Input validation implemented with `class-validator` in `src/user/dto/register.dto.ts` (email format, password policy).
- Passwords are hashed with bcrypt before saving (`src/user/services/user.service.ts`).
- CORS and ValidationPipe are configured in `src/main.ts`. Use `ALLOWED_ORIGINS` env var to allow frontend origin(s).

---

## Environment variables
- `MONGODB_URI` (required) — MongoDB connection string
- `PORT` (optional) — server port (default 3000)
- `ALLOWED_ORIGINS` (optional) — CSV of origins allowed by CORS
