# Backend — NestJS (IA04)

_Thư mục chứa backend API cho bài tập IA04._

---

## Quick start (development)

```bash
cd backend
npm install
# Set environment variables (example .env):
# MONGODB_URI=mongodb://localhost:27017/ia04
# ALLOWED_ORIGINS=http://localhost:5173
npm run start:dev
```

---

## API Endpoints

- **POST** `/user/register`
- **POST** `/auth/login`
- **POST** `/auth/refresh`
- **POST** `/auth/logout`
- **GET** `/user/profile`

---

## Security notes

- JWT signed with secret key (`JWT_SECRET` and `JWT_REFRESH_SECRET`).
- Refresh tokens invalidated on logout.

---

## Environment variables

- `MONGODB_URI`
- `PORT`
- `ALLOWED_ORIGINS`
- `JWT_ACCESS_SECRET`
- `JWT_ACCESS_EXPIRES_IN`
- `JWT_ACCESS_SECRET`
- `JWT_ACCESS_EXPIRES_IN`
