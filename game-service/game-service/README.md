# 🎮 Game Service

WSpeedrun.com — Game & Run Category Management Service

Microservice yang mengelola data game dan kategori run untuk platform speedrunning.

---

## 📋 Daftar Isi

- [Overview](#-overview)
- [Teknologi](#-teknologi)
- [Setup & Instalasi](#-setup--instalasi)
- [Environment Variables](#-environment-variables)
- [Menjalankan Service](#-menjalankan-service)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Autentikasi & Autorisasi](#-autentikasi--autorisasi)
- [Struktur Project](#-struktur-project)

---

## 🎯 Overview

**Game Service** adalah microservice yang bertanggung jawab untuk:
- Mengelola data game (create, read, update, delete)
- Mengelola kategori run yang terkait dengan game
- Menyediakan API publik untuk browsing game dan kategori
- Melindungi endpoint admin dengan JWT authentication

**Port:** `3001`

---

## 🛠️ Teknologi

- **Framework:** NestJS 10.x
- **Database:** MySQL (via Prisma ORM)
- **Authentication:** JWT + Passport
- **Dokumentasi API:** Swagger/OpenAPI
- **Validation:** class-validator
- **Language:** TypeScript

---

## 📥 Setup & Instalasi

### Prerequisites

- Node.js 18+ (dengan npm)
- MySQL 5.7+ atau MariaDB
- XAMPP (opsional, untuk MySQL lokal)

### Langkah Instalasi

1. **Clone/masuk ke project folder:**
   ```bash
   cd game-service/game-service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup database:**
   - Pastikan MySQL berjalan (misal via XAMPP)
   - Buat database baru:
     ```sql
     CREATE DATABASE wspeedrun_db;
     ```

4. **Setup environment:**
   ```bash
   # Copy contoh ke .env
   cp .env.example .env
   # Edit .env dengan kredensial MySQL kamu
   ```

---

## ⚙️ Environment Variables

File `.env` harus berisi:

```env
# Database Connection
DATABASE_URL="mysql://root:@localhost:3306/wspeedrun_db"

# JWT Secret
JWT_SECRET="your_jwt_secret_key"
```

### Penjelasan:
- `DATABASE_URL`: Connection string ke MySQL
  - Format: `mysql://[user]:[password]@[host]:[port]/[database]`
  - Jika root tanpa password: `mysql://root:@localhost:3306/wspeedrun_db`
  
- `JWT_SECRET`: Secret key untuk signing JWT tokens
  - Gunakan string yang strong dan random untuk production

---

## 🚀 Menjalankan Service

### Development Mode (dengan auto-reload)

```bash
# Set environment variables
$env:DATABASE_URL = "mysql://root:@localhost:3306/wspeedrun_db"
$env:JWT_SECRET = "your_jwt_secret_key"

# Jalankan service
npm run start:dev
```

Output yang diharapkan:
```
[Nest] xxxxx  - 06/06/2026, HH:MM:SS     LOG [NestFactory] Starting Nest application...
...
[Nest] xxxxx  - 06/06/2026, HH:MM:SS     LOG [NestApplication] Nest application successfully started +XXms
Game Service running on http://localhost:3001
Swagger UI: http://localhost:3001/api
```

### Production Mode

```bash
npm run build
npm run start:prod
```

### Akses Service

- **API:** http://localhost:3001
- **Swagger Docs:** http://localhost:3001/api

---

## 📊 Database Schema

### Tabel `games`

```sql
CREATE TABLE games (
  game_id VARCHAR(36) PRIMARY KEY,
  game_name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL
);
```

| Kolom | Tipe | Keterangan |
|---|---|---|
| `game_id` | VARCHAR(36) | Primary Key (UUID) |
| `game_name` | VARCHAR(255) | Nama game |
| `description` | VARCHAR(255) | Deskripsi game |

### Tabel `run_categories`

```sql
CREATE TABLE run_categories (
  run_category_id VARCHAR(36) PRIMARY KEY,
  game_id VARCHAR(36) NOT NULL,
  run_category_name VARCHAR(255) NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);
```

| Kolom | Tipe | Keterangan |
|---|---|---|
| `run_category_id` | VARCHAR(36) | Primary Key (UUID) |
| `game_id` | VARCHAR(36) | Foreign Key ke `games.game_id` |
| `run_category_name` | VARCHAR(255) | Nama kategori run (misal: Any%, 100%) |

---

## 🌐 API Endpoints

### 🔓 Public Endpoints (Tidak perlu autentikasi)

#### **GET /games**
Ambil daftar semua game.

**Response (200):**
```json
[
  {
    "game_id": "uuid-1",
    "game_name": "Minecraft",
    "description": "A sandbox game by Mojang"
  },
  {
    "game_id": "uuid-2",
    "game_name": "The Legend of Zelda",
    "description": "Action-adventure game"
  }
]
```

---

#### **GET /games/:id**
Ambil detail satu game + semua run categories-nya.

**Response (200):**
```json
{
  "game_id": "uuid-1",
  "game_name": "Minecraft",
  "description": "A sandbox game by Mojang",
  "run_categories": [
    {
      "run_category_id": "cat-uuid-1",
      "game_id": "uuid-1",
      "run_category_name": "Any%"
    },
    {
      "run_category_id": "cat-uuid-2",
      "game_id": "uuid-1",
      "run_category_name": "100%"
    }
  ]
}
```

**Response (404):**
```json
{
  "statusCode": 404,
  "message": "Game with id <id> not found"
}
```

---

#### **GET /categories/:id**
Ambil detail satu run category.

**Response (200):**
```json
{
  "run_category_id": "cat-uuid-1",
  "game_id": "uuid-1",
  "run_category_name": "Any%"
}
```

**Response (404):**
```json
{
  "statusCode": 404,
  "message": "Category with id <id> not found"
}
```

---

### 🔒 Admin Endpoints (Memerlukan JWT + Role ADMIN)

Semua endpoint di bawah memerlukan header:
```
Authorization: Bearer <JWT_TOKEN>
```

Token harus berisi `role: "ADMIN"` dalam payload.

#### **POST /admin/games**
Buat game baru.

**Request Body:**
```json
{
  "game_name": "Minecraft",
  "description": "A sandbox game by Mojang"
}
```

**Validasi:**
- `game_name`: Required, string, not empty
- `description`: Required, string, not empty

**Response (201):**
```json
{
  "game_id": "uuid-generated",
  "game_name": "Minecraft",
  "description": "A sandbox game by Mojang"
}
```

**Response (401):**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**Response (403):**
```json
{
  "statusCode": 403,
  "message": "Access denied: Admins only"
}
```

---

#### **PATCH /admin/games/:id/update**
Update data game.

**Request Body:**
```json
{
  "game_name": "Minecraft (Updated)",
  "description": "Updated description"
}
```

**Note:** Field bersifat optional (bisa update salah satu atau keduanya)

**Response (200):**
```json
{
  "game_id": "uuid-1",
  "game_name": "Minecraft (Updated)",
  "description": "Updated description"
}
```

**Response (404):**
```json
{
  "statusCode": 404,
  "message": "Game with id <id> not found"
}
```

---

#### **DELETE /admin/games/:id/delete**
Hapus game.

**Response (200):**
```json
{
  "game_id": "uuid-1",
  "game_name": "Minecraft",
  "description": "A sandbox game by Mojang"
}
```

**Response (404):**
```json
{
  "statusCode": 404,
  "message": "Game with id <id> not found"
}
```

---

#### **POST /admin/categories**
Buat kategori run baru.

**Request Body:**
```json
{
  "game_id": "uuid-1",
  "run_category_name": "Any%"
}
```

**Validasi:**
- `game_id`: Required, string, harus ada di database
- `run_category_name`: Required, string, not empty

**Response (201):**
```json
{
  "run_category_id": "uuid-generated",
  "game_id": "uuid-1",
  "run_category_name": "Any%"
}
```

**Response (400):**
```json
{
  "statusCode": 400,
  "message": "Game with id <id> does not exist"
}
```

---

#### **PATCH /admin/categories/:id/update**
Update kategori run.

**Request Body:**
```json
{
  "run_category_name": "Any% (Speedrun)"
}
```

**Response (200):**
```json
{
  "run_category_id": "uuid-1",
  "game_id": "uuid-1",
  "run_category_name": "Any% (Speedrun)"
}
```

**Response (404):**
```json
{
  "statusCode": 404,
  "message": "Category with id <id> not found"
}
```

---

#### **DELETE /admin/categories/:id/delete**
Hapus kategori run.

**Response (200):**
```json
{
  "run_category_id": "uuid-1",
  "game_id": "uuid-1",
  "run_category_name": "Any%"
}
```

**Response (404):**
```json
{
  "statusCode": 404,
  "message": "Category with id <id> not found"
}
```

---

## 🔐 Autentikasi & Autorisasi

### JWT Token Format

Token harus mengandung payload:
```json
{
  "id": "user-uuid",
  "role": "ADMIN" // atau "USER", "GUEST", etc
}
```

### Guards

- **`JwtAuthGuard`**: Memverifikasi JWT token valid
  - Membutuhkan header `Authorization: Bearer <TOKEN>`
  - Throw `401 Unauthorized` jika token tidak ada/invalid

- **`AdminGuard`**: Memverifikasi user punya role `ADMIN`
  - Hanya bisa diakses jika `user.role === "ADMIN"`
  - Throw `403 Forbidden` jika role bukan ADMIN

### Cara Mendapat Token

Token dihasilkan oleh service lain (misal: Auth Service). Game Service hanya memverifikasi token menggunakan JWT Secret yang sama.

Contoh menggunakan token di request:

```bash
curl -X POST http://localhost:3001/admin/games \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"game_name":"Minecraft","description":"..."}'
```

---

## 📁 Struktur Project

```
game-service/
├── src/
│   ├── main.ts                 # Entry point aplikasi
│   ├── app.module.ts           # Root module
│   │
│   ├── auth/                   # Authentication & Guards
│   │   ├── jwt.strategy.ts     # JWT Passport strategy
│   │   ├── jwt.guard.ts        # JWT verification guard
│   │   └── admin.guard.ts      # Admin role check guard
│   │
│   ├── games/                  # Games module
│   │   ├── games.controller.ts # API endpoints
│   │   ├── games.service.ts    # Business logic
│   │   ├── games.module.ts     # Module definition
│   │   └── dto/
│   │       ├── create-game.dto.ts
│   │       └── update-game.dto.ts
│   │
│   ├── categories/             # Categories module
│   │   ├── categories.controller.ts
│   │   ├── categories.service.ts
│   │   ├── categories.module.ts
│   │   └── dto/
│   │       ├── create-category.dto.ts
│   │       └── update-category.dto.ts
│   │
│   └── prisma/                 # Database layer
│       ├── prisma.service.ts   # Prisma client wrapper
│       └── prisma.module.ts    # Module definition
│
├── prisma/
│   └── schema.prisma           # Database schema definition
│
├── .env.example                # Environment variables template
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Dokumentasi ini
```

---

## 🧪 Testing dengan Swagger

1. Buka browser: http://localhost:3001/api
2. Semua endpoint akan terlihat dengan dokumentasi lengkap
3. Klik "Try it out" untuk test endpoint
4. Untuk endpoint admin, masukkan JWT token di input `Authorization`

---

## 🔍 Troubleshooting

### Error: "Database does not exist"
- Pastikan database `wspeedrun_db` sudah dibuat
- Check MySQL sudah running

### Error: "Cannot connect to database"
- Verifikasi `DATABASE_URL` di `.env` atau terminal
- Pastikan port MySQL (`3306`) tidak ter-blokir

### Error: "JwtStrategy requires a secret or key"
- Set `JWT_SECRET` environment variable
- Pastikan variabel ini ada sebelum `npm run start:dev`

### Error: "Port 3001 already in use"
```bash
# Cari proses yang pakai port 3001
netstat -ano | findstr 3001

# Kill proses tersebut
taskkill /PID <PID> /F
```

---

## 📝 Notes

- Semua validation dilakukan di backend menggunakan `class-validator` (tidak menggunakan RegEx)
- Cascade delete untuk game akan menghapus semua related categories
- Swagger documentation tersedia di `/api` endpoint

---

## 📄 Lisensi

MIT
