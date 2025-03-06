# Goumrah App

Goumrah App adalah sebuah platform yang dirancang untuk memberikan pengalaman terbaik dalam perjalanan umrah. Aplikasi ini mengadopsi **Hexagonal Architecture** untuk memastikan modularitas dan skalabilitas, serta menerapkan **Atomic Design** dalam pengembangan UI.

## 🚀 Teknologi yang Digunakan

- **Next.js** – Framework React untuk rendering yang cepat dan SEO-friendly.
- **TypeScript** – Superset JavaScript untuk kode yang lebih aman dan terstruktur.
- **Tailwind CSS** – Framework CSS untuk desain yang efisien dan responsif.
- **Prisma ORM** – Untuk interaksi dengan database PostgreSQL.
- **NextAuth.js** – Autentikasi dan otorisasi berbasis session.
- **Jest & Playwright** – Pengujian unit dan end-to-end.
- **Zod** – Validasi skema data.
- **Axios** – HTTP client untuk komunikasi API.
- **ESLint & Prettier** – Standarisasi kode.

## 📂 Struktur Folder

```
goumrah-app/
├── prisma/                  # Skema database & migrasi
│   ├── migrations/          # File migrasi database
│   ├── schema.prisma        # Skema database Prisma
│   └── seed.ts              # Script untuk seeding data awal
├── public/                  # Aset statis seperti ikon & gambar
├── src/
│   ├── app/                 # Entry point Next.js
│   │   ├── api/             # API routes untuk backend
│   │   ├── layout.tsx       # Layout utama aplikasi
│   │   ├── page.tsx         # Halaman utama aplikasi
│   │   └── ...              # Halaman lainnya
│   ├── modules/             # Logika bisnis (Hexagonal Architecture)
│   │   ├── users/           # Modul pengguna
│   │   ├── bookings/        # Modul pemesanan
│   │   ├── payments/        # Modul pembayaran
│   │   └── ...
│   ├── sections/            # Komponen UI (Atomic Design)
│   │   ├── atoms/           # Komponen terkecil (button, input, dll.)
│   │   ├── molecules/       # Kombinasi atoms menjadi komponen kompleks
│   │   ├── organisms/       # Bagian besar UI seperti navbar & footer
│   │   ├── templates/       # Struktur halaman aplikasi
│   │   └── pages/           # Halaman lengkap
│   ├── shared/              # Utilities, middleware, dan UI shared
│   ├── styles/              # File CSS global
│   └── tests/               # Pengujian unit dan integrasi
├── .env                     # Konfigurasi lingkungan
├── next.config.ts           # Konfigurasi Next.js
├── tailwind.config.js       # Konfigurasi Tailwind CSS
├── tsconfig.json            # Konfigurasi TypeScript
└── README.md                # Dokumentasi proyek ini
```

## 🔧 Instalasi & Menjalankan Proyek

### 1. Clone Repository

```sh
  git clone https://github.com/username/goumrah-app.git
  cd goumrah-app
```

### 2. Install Dependencies

```sh
  pnpm install
```

### 3. Setup Database

Pastikan PostgreSQL sudah terinstall dan jalankan perintah berikut:

```sh
  pnpm prisma migrate dev
```

### 4. Menjalankan Aplikasi

```sh
  pnpm dev
```

Akses aplikasi di `http://localhost:3000`

## 🧪 Pengujian

Jalankan tes unit dan integrasi dengan:

```sh
  pnpm test
```

## 🚀 Deployment Process

Berikut adalah diagram alur deployment aplikasi:


1. **Commit & Push** – Kode di-push ke repository GitHub.
2. **CI/CD Pipeline** – GitHub Actions/Vercel melakukan build dan testing otomatis.
3. **Database Migration** – Prisma menjalankan migrasi database jika diperlukan.
4. **Deployment** – Aplikasi di-deploy ke Vercel atau platform lainnya.
5. **Monitoring** – Performa aplikasi dipantau melalui logging dan analytics.

## 🏗️ Architecture Design

Berikut adalah diagram arsitektur aplikasi berdasarkan struktur folder:


1. **Frontend** – Next.js + Tailwind CSS, mengelola tampilan dan interaksi pengguna (`src/app`, `src/sections`).
2. **Modules** – Berisi logika bisnis utama dengan pendekatan Hexagonal Architecture (`src/modules`).
3. **Shared Components** – Berisi utilitas dan komponen yang dapat digunakan ulang (`src/shared`).
4. **Database Layer** – Prisma ORM untuk interaksi dengan database PostgreSQL (`prisma/`).
5. **Public Assets** – Berisi file statis seperti ikon dan gambar (`public/`).

## 📜 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

