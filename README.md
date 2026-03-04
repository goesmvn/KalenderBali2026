# 🕉️ KalenderBali.id

**Kalender Bali Digital** — Aplikasi web kalender Bali lengkap yang menampilkan sistem penanggalan Bali (Pawukon, Wewaran, Sasih) secara digital, interaktif, dan mudah diakses oleh siapa saja.

🌐 **Live:** [https://kalenderbali.id](https://kalenderbali.id)

---

## Mengapa Kalender Bali Digital?

Kalender Bali (Kalender Saka Bali) merupakan warisan budaya yang sangat penting bagi masyarakat Hindu Bali. Sistem penanggalan ini memadukan siklus **Pawukon** (210 hari) dengan penanggalan **Sasih** (lunar) dan mengandung ratusan elemen yang saling terkait — mulai dari Wewaran (Pancawara, Saptawara, dll), Wuku, Ingkel, hingga Dewasa Ayu.

Sayangnya, informasi ini seringkali:
- 📖 Hanya tersedia dalam bentuk **kalender cetak** yang terbatas distribusinya
- 🔍 Sulit dicari kapan hari baik untuk kegiatan tertentu tanpa bertanya ke pemangku
- 📱 Belum ada platform digital yang **lengkap, akurat, dan gratis** untuk masyarakat umum

**KalenderBali.id** hadir untuk menjawab kebutuhan ini — membawa kearifan lokal kalender Bali ke era digital agar dapat diakses kapan saja, di mana saja, oleh siapa saja.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 📅 **Kalender Interaktif** | Tampilan kalender bulanan dengan informasi lengkap setiap hari |
| 🕉️ **10 Wewaran Lengkap** | Ekawara hingga Dasawara untuk setiap tanggal |
| 🌕 **Sasih & Lunar** | Penanggalan Sasih, Purnama/Tilem, Penanggal/Pangelong |
| 🎯 **Hari Baik (Dewasa Ayu)** | Rekomendasi hari baik berdasarkan 9 kategori Yadnya |
| 💒 **Dewasa Pawiwahan** | Penghitungan hari baik pernikahan berdasarkan Lontar Wariga |
| 👶 **Kalkulator Kelahiran Sesar** | Rekomendasi hari lahir terbaik berdasarkan weton orang tua |
| 🔍 **Pencarian Fitur** | Cari Otonan, Kajeng Kliwon, Tumpek, Purnama/Tilem, dll |
| 📄 **Export PDF** | Download hasil pencarian hari baik, pawiwahan, dan kelahiran |
| 🏠 **Rahinan & Upacara** | Piodalan, Galungan, Kuningan, Nyepi, dan hari raya lainnya |
| 🇮🇩 **Hari Libur Nasional** | Integrasi dengan API hari libur nasional Indonesia |
| 📊 **Heatmap Kalender** | Visualisasi skor kecocokan hari untuk kategori tertentu |
| 🧩 **Widget Embeddable** | Widget kalender Bali yang bisa di-embed di website lain |

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Animasi** | Framer Motion, React Spring |
| **PDF Export** | jsPDF, jsPDF-AutoTable |
| **Web Server** | Nginx (static files) |
| **Reverse Proxy** | Caddy (auto HTTPS, compression) |
| **Container** | Docker, Docker Compose |

---

## 📂 Struktur Repo

```
KalenderBali/
├── docker-compose.yml      # Orchestrator (App + Caddy)
├── Caddyfile               # Reverse proxy & auto HTTPS
├── .gitignore
└── app/                    # Source code aplikasi
    ├── Dockerfile          # Multi-stage build (Node → Nginx)
    ├── nginx.conf          # SPA routing & caching
    ├── package.json
    ├── vite.config.ts
    ├── index.html
    └── src/
        ├── App.tsx                  # Root component
        ├── components/              # UI components
        │   ├── Calendar.tsx         # Kalender utama
        │   ├── SearchPanel.tsx      # Panel pencarian
        │   ├── DateDetail.tsx       # Detail tanggal
        │   └── ...
        ├── utils/                   # Logic kalender Bali
        │   ├── bali-calendar.ts     # Perhitungan Pawukon & Wewaran
        │   ├── dewasa-ayu.ts        # Engine Dewasa Ayu
        │   ├── yadnya-score.ts      # Skor hari baik per kategori
        │   ├── pawiwahan-score.ts   # Skor dewasa pawiwahan
        │   ├── kelahiran-score.ts   # Skor kelahiran sesar
        │   ├── holidays.ts          # API hari libur nasional
        │   └── search-utils.ts      # Pencarian kalender
        └── types/
            └── bali-calendar.ts     # TypeScript interfaces
```

---

## 🚀 Development

```bash
cd app
npm install
npm run dev
# → http://localhost:5173
```

## 🐳 Production (Docker)

```bash
docker compose up -d --build
# Caddy otomatis handle HTTPS untuk kalenderbali.id
```

---

## 📚 Referensi & Sumber

Perhitungan kalender Bali dalam aplikasi ini disusun berdasarkan sumber-sumber berikut:

- **Lontar Wariga** — Lontar utama rujukan untuk Dewasa Ayu, ala ayuning dewasa, dan perhitungan hari baik/buruk dalam tradisi Bali
- **Lontar Sundarigama** — Rujukan untuk tata upacara dan piodalan
- **Sistem Pawukon** — Siklus 210 hari dengan 30 Wuku yang menjadi dasar penanggalan Bali
- **Sistem Wewaran** — 10 jenis wewaran (Ekawara s/d Dasawara) berdasarkan kaidah tradisional
- **Kalender Bali Cetak** — Cross-reference dengan kalender Bali cetak resmi untuk validasi akurasi
- **Pengamatan Lapangan (sejak 1972)** — Khusus untuk rumusan Dewasa Pawiwahan, menggabungkan kaidah lontar dengan observasi empiris di masyarakat

---

## 👤 Pembuat

**Indra Iswara**

Dikembangkan dengan tujuan melestarikan warisan budaya Bali melalui teknologi, agar generasi muda dan masyarakat luas dapat mengakses informasi kalender Bali dengan mudah dan akurat.

---

## 📄 Lisensi

Hak cipta © 2024-2026 KalenderBali.id. All rights reserved.
