# PRD - Sistem Manajemen Toko HP & Toko Online

## Problem Statement Asli (Ringkasan)
Website full-stack toko smartphone Indonesia. Dua bagian: (A) Panel Admin internal — kelola stok smartphone (per unit dengan IMEI), harga modal, biaya servis, penjualan, pembayaran, pengiriman, pelanggan, keuntungan, laporan. (B) Website Toko Online publik — pelanggan lihat produk, cari, daftar, checkout, bayar, lacak pesanan. Dua bagian wajib terintegrasi via database. Bahasa Indonesia. Format tanggal DD/BULAN/YYYY. Mobile-first.

## User Personas
- **Owner / Super Admin**: Pemilik toko, akses penuh termasuk modal/profit.
- **Admin**: Kelola produk/pesanan sesuai izin, akses keuangan.
- **Staf**: Input barang, bantu pesanan, tanpa akses keuangan sensitif.
- **Pelanggan**: Browsing produk, checkout, tracking (Fase 2+).

## Arsitektur Teknis
- **Frontend**: React 19 + React Router + Shadcn UI + Tailwind + Sonner (toast)
- **Backend**: FastAPI + Motor (MongoDB async) + Pydantic v2 + PyJWT + bcrypt
- **Database**: MongoDB (lapisan akses data terpisah, migrasi ke PostgreSQL mudah di VPS)
- **Storage**: Local filesystem (`/app/backend/uploads`) via `StorageBackend` adapter — siap migrasi ke R2/S3/Google Drive
- **Auth**: JWT (access 12 jam, refresh 7 hari) via httpOnly cookies + Bearer fallback

## Core Requirements (Statis)
1. Fase 1: Fondasi admin + inventaris
2. Fase 2: Katalog publik + registrasi pelanggan + keranjang
3. Fase 3: Checkout + pembayaran (Kasera Pay, QRIS, Transfer manual) + pengiriman
4. Fase 4: Analitik + pengeluaran + garansi + servis + laporan
5. Fase 5: Testing menyeluruh + persiapan produksi

## Yang Sudah Diimplementasikan

### Fase 1 (08/OKTOBER/2026) ✅
- Login JWT (owner@tokohp.id / Admin@12345), seed otomatis saat startup
- Role: owner, admin, staf, pelanggan (gating di backend `require_roles`)
- Panel admin: sidebar + header responsif
- Dashboard statistik (total unit, tersedia, hold, terjual, servis, arsip, nilai modal/jual stok, estimasi laba, performa merek)
- CRUD inventaris HP per unit (30+ field)
- Validasi IMEI (14-17 digit, Luhn 15 digit, cek duplikat di DB)
- Scan IMEI: manual + kamera (BarcodeDetector API) + scanner eksternal
- Upload foto/video dengan validasi tipe & ukuran
- Perhitungan keuangan backend (total_modal, estimasi_laba_kotor)
- Status stok + publikasi dengan audit log
- Role staf tidak dapat melihat harga_beli, biaya, supplier
- Format tanggal DD/BULAN/YYYY + Rupiah "Rp 1.500.000"

### Fase 2 (08/OKTOBER/2026) ✅
- Katalog publik `/api/catalog` (list/featured/brands/detail) tanpa auth, sembunyikan IMEI/modal/supplier
- Storefront publik: Beranda, Katalog dengan filter+sort, Detail Produk dengan galeri
- Registrasi pelanggan `/api/auth/register` + role=pelanggan, promo_consent opt-in (default UNCHECKED), saluran WhatsApp/Email/SMS, versi persetujuan tercatat
- Login terpadu (`/masuk`) routing by role (pelanggan→/akun, staf→/admin)
- Alamat pelanggan multiple (CRUD `/api/customer/addresses`), alamat pertama auto default
- Preferensi promosi (switch toggle, cabut consent kapan saja dengan revoked_at tercatat)
- Keranjang pelanggan server-side (`/api/customer` GET/POST/DELETE), snapshot info, idempotent add, prevent add DRAFT/non-TERSEDIA
- Badge jumlah item di header toko
- Checkout button disabled dengan label "Checkout (Fase 3)"
- **Riwayat Harga/Status UI** di admin detail unit (dari field history_harga, history_status)

Hasil testing: iteration_1 → 17/17 + fix static mount. iteration_2 → 20/20 backend + 100% frontend e2e.

## Backlog & Prioritas
### P0 (Fase 2 - setelah user approve Fase 1)
- Katalog publik otomatis dari unit berpublikasi TAYANG
- Halaman detail produk (tanpa IMEI/modal)
- Registrasi pelanggan + alamat (dengan persetujuan promosi)
- Keranjang belanja

### P1 (Fase 3)
- Checkout + reservasi stok (prevent double-sell)
- Pengaturan metode pembayaran (toggle on/off): Transfer Manual, QRIS Merchant, Kasera Pay fondasi
- Pengiriman manual (tabel ongkir, input resi, status)
- Fondasi adapter Biteship (verifikasi akun masih proses)

### P2 (Fase 4-5)
- Laporan keuangan lengkap, pengeluaran operasional
- Garansi toko + riwayat reparasi
- Export CSV/Excel, impor stok massal
- Notifikasi (email/Telegram/WhatsApp)
- Pengujian menyeluruh + panduan deploy VPS + export source code

## Catatan Teknis Penting
- `StaticFiles` di-mount di `/api/uploads/files` (bukan `/api/uploads`) agar tidak bentrok dengan POST endpoint upload.
- Semua perhitungan uang menggunakan `int`/`Decimal` di backend (hindari floating-point).
- Snapshot transaksi akan diimplementasi di Fase 3 (saat ini belum ada tabel pesanan).
- Model `UnitHP` adalah entity utama; nanti akan dipisah dari `CatalogListing` di Fase 2 jika beberapa unit perlu digrupkan.
