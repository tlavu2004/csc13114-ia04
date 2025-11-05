# IA04 — React Authentication with JWT (Access + Refresh)

_Project này là bài tập IA04: thực hiện 1 ứng dụng React SPA với xac thực antoanf dùng JWT (access + refresh tokens), Axios, React Query, và React Hook Form._

---

## Thông tin sinh viên
- Họ và tên: Trương Lê Anh Vũ
- MSSV: 22120443
- Repository bài làm (GitHub): https://github.com/tlavu2004/csc13114-ia04

---

## Lưu ý quan trọng

Bài tập **IA04** sử dụng **chung database** với bài tập **IA03**.

---

## Bảng điểm tự đánh giá

| Tiêu chí                             | Mô tả                                                                   | Tỉ trọng | Mức độ hoàn thành |
|--------------------------------------|-------------------------------------------------------------------------|----------|-------------------|
| Authentication logic and correctness | Access and refresh token handling is implemented correctly.             | 30%      | 100%              |
| Axios interceptor setup              | Proper request and response interception with automatic token refresh.  | 20%      | 100%              |
| React Query integration              | Authentication and data fetching use React Query appropriately.         | 15%      | 100%              |
| React Hook Form integration          | Login form is implemented using React Hook Form with proper validation. | 10%      | 100%              |
| Public hosting and deployment        | Application is deployed and accessible on a public hosting platform.    | 10%      | 100%              |
| UI and UX                            | Functional and clear user interface for login, logout, and dashboard.   | 10%      | 100%              |
| Error handling and code organization | Robust error management and clean, modular code structure.              | 5%       | 100%              |

---

## Địa chỉ host:
- Backend - Render: https://csc13114-ia04-backend.onrender.com
- Frontend - Vercel: https://csc13114-ia04-22120443.vercel.app

---

## Mục tiêu

- Cung cấp login và logout.
- Lưu access token trong memory, refresh token trong localStorage.
- Axios tự động attach access token và refresh khi 401 xảy ra.
- React Query quản lý mutation/login/logout và truy xuất dữ liệu protected.
- React Hook Form quản lý form và validate input.
- Protected Route: chỉ cho phép truy cập dashboard nếu có access token.
- Thông báo lỗi rõ ràng khi login thất bại hoặc token expired.

---

## Thư mục chính

- `backend/` — NestJS server (port mặc định 3000)
- `frontend/` — React + Vite app (dev server mặc định 5173)

---

## Chạy dự án (local)

### Cách 1: Clone repository từ GitHub

#### Bước 1. Clone repository về máy

```bash
git clone https://github.com/tlavu2004/csc13114-ia04.git
cd csc13114-ia04
```

#### Bước 2. Cài đặt các file môi trường
- Đặt file `.env` trong thư mục `22120443_10/Environments/Backend` vào thư mục `csc13114-ia04/backend`
- Đặt file `.env.development.local` trong thư mục `22120443_10/Environments/Frontend` vào thư mục `csc13114-ia04/frontend`

#### Bước 3. Backend

- Vào thư mục `csc13114-ia04/backend/`
  ```bash
  cd backend
  npm install

  # Thiết lập biến môi trường: MONGODB_URI
  npm run start:dev
  ```

#### Bước 4. Frontend

- Vào thư mục `csc13114-ia04/frontend/`
  ```bash
  cd frontend
  npm install

  # Chỉnh .env.development.local VITE_API_URL nếu backend chạy ở port khác (tuỳ chọn).
  npm run dev
  ```

---

### Cách 2: Lấy trực tiếp trong thư mục nộp bài

- Thực hiện từ **bước 3** của **cách 1**.

---

## Chạy dự án trên nền tảng host
[Nhấn vào đây để truy cập](https://csc13114-ia04-22120443.vercel.app)

---

## Endpoint

- **POST** `/user/register` — đăng ký người dùng
  - Body JSON: `{ "email": "...", "password": "..." }`
  - Trả về: `{ message: 'User registered successfully', user: { id, email, createdAt } }`
- **POST** `/auth/login` — đăng nhập
  - Body: `{ email, password }`
  - Returns: `{ user, accessToken, refreshToken }`
- **POST** `/auth/refresh` — refresh token
  - Body: `{ refreshToken }`
  - Returns: `{ accessToken, user }`
- **POST** `/auth/logout` — đăng xuất
  - Body: `{ refreshToken }`
- **GET** `/user/profile` - lấy thông tin người dùng
  - Body: `{ accessToken }`
  - Returns: `{ id, email, createAt }`

---

## Biến môi trường quan trọng
- Backend: 
    - `MONGODB_URI` (MongoDB connection string)
    - `PORT` (tuỳ chọn)
    - `ALLOWED_ORIGINS` (CSV các origin được phép CORS)
    - `JWT_ACCESS_SECRET` (secret tạo access token)
    - `JWT_ACCESS_EXPIRES_IN` (thời gian sử dụng access token)
    - `JWT_ACCESS_SECRET` (secret tạo refresh token)
    - `JWT_ACCESS_EXPIRES_IN` (thời gian sử dụng refresh token)

- Frontend: `VITE_API_URL` (ví dụ `http://localhost:3000`)

---

## Ghi chú

- Access token chỉ lưu trong memory → giảm rủi ro XSS.
- Refresh token lưu trong localStorage (bài assignment yêu cầu).
- Protected route redirect về login nếu không có access token.
- Axios interceptor tự động refresh token hoặc logout + redirect khi refresh token expired.
