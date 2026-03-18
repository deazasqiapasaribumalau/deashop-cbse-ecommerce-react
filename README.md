# 🛍️ DeaShop — CBSE E-Commerce React App

<div align="center">

<img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-6.x-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />

<br/><br/>

> Tugas Praktikum **Component-Based Software Engineering (CBSE)**
> Pertemuan 5 — Software Component, Library, dan Framework

<br/>

[![GitHub repo](https://img.shields.io/badge/GitHub-deashop--cbse--ecommerce--react-181717?style=flat-square&logo=github)](https://github.com/deazasqiapasaribumalau/deashop-cbse-ecommerce-react)

</div>

---

## 👩‍💻 Identitas Mahasiswa

| | |
|---|---|
| **Nama** | Dea Zasqia Pasaribu Malau |
| **NPM** | 2308107010004 |
| **Mata Kuliah** | Praktikum Component-Based Software Engineering (CBSE)/PLBK |
| **Pertemuan** | 5 — Software Component, Library, dan Framework |
| **Institusi** | Universitas Syiah Kuala |
| **Tahun Akademik** | 2026 |

---

## 📖 Deskripsi Proyek

**DeaShop** adalah aplikasi e-commerce berbasis web yang dibangun menggunakan **React + Vite**. Proyek ini mengimplementasikan konsep *Component-Based Software Engineering* dengan memanfaatkan:

- **Axios** sebagai library HTTP client untuk berkomunikasi dengan REST API eksternal
- **React Router DOM** untuk navigasi Single Page Application (SPA)
- **React Context API + useReducer** untuk state management keranjang belanja
- **[Fake Store API](https://fakestoreapi.com)** sebagai sumber data produk

---

## ✅ Checklist Tugas Praktikum

- [x] **Tugas 1** — Melengkapi halaman `ProductDetail.jsx` yang menampilkan detail produk berdasarkan ID menggunakan `useParams` dari React Router DOM
- [x] **Tugas 2** — Menambahkan komponen `SearchBar.jsx` di halaman Home yang dapat memfilter produk berdasarkan nama secara real-time
- [x] **Tugas 3** — Menambahkan fitur update quantity di halaman Cart dengan tombol `+` dan `-`
- [x] **Tugas 4** — Screenshot tampilan Home, ProductDetail, dan Cart yang sudah berfungsi
- [x] **Tugas 5** — Push kode ke repository GitHub

---

## 🚀 Teknologi yang Digunakan

| Teknologi | Kategori | Fungsi |
|---|---|---|
| [React 18](https://react.dev) | Framework | UI rendering & component-based architecture |
| [Vite](https://vitejs.dev) | Build Tool | Development server & bundler modern |
| [Axios](https://axios-http.com) | Library | HTTP request ke REST API eksternal |
| [React Router DOM v6](https://reactrouter.com) | Library | Navigasi antar halaman (SPA routing) |
| Context API + useReducer | Built-in React | Global state management keranjang belanja |

---

## 📁 Struktur Folder

```
deashop-cbse-ecommerce-react/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │
│   ├── components/                  # Komponen reusable
│   │   ├── Header.jsx               # Navbar — brand, navigasi, info mahasiswa, cart counter
│   │   ├── ProductCard.jsx          # Card produk — tombol Detail & tambah keranjang
│   │   ├── SearchBar.jsx            # ✅ Tugas 2 — Input filter produk by nama
│   │   └── Loading.jsx              # Spinner loading
│   │
│   ├── pages/                       # Halaman utama
│   │   ├── Home.jsx                 # Katalog produk + search + filter kategori
│   │   ├── ProductDetail.jsx        # ✅ Tugas 1 — Detail produk dengan useParams
│   │   └── Cart.jsx                 # ✅ Tugas 3 — Keranjang + update quantity
│   │
│   ├── services/
│   │   └── api.js                   # Axios instance & semua API functions
│   │
│   ├── context/
│   │   └── CartContext.jsx          # Global cart state dengan useReducer
│   │
│   ├── App.jsx                      # Root component & konfigurasi routing
│   ├── index.css                    # Global styles & font imports
│   └── main.jsx                     # Entry point aplikasi
│
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Cara Menjalankan Proyek

### Prerequisites
- Node.js versi 18 atau lebih baru
- npm atau yarn

### 1. Clone Repository

```bash
git clone https://github.com/deazasqiapasaribumalau/deashop-cbse-ecommerce-react.git
cd deashop-cbse-ecommerce-react
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Library Tambahan (jika belum)

```bash
npm install axios react-router-dom
```

### 4. Jalankan Development Server

```bash
npm run dev
```

### 5. Buka di Browser

```
http://localhost:5173
```

---

## 🌐 API Reference

Proyek ini menggunakan **[Fake Store API](https://fakestoreapi.com)** — REST API gratis untuk simulasi data e-commerce.

| Endpoint | Method | Deskripsi |
|---|---|---|
| `/products` | `GET` | Mengambil semua produk |
| `/products/:id` | `GET` | Mengambil produk berdasarkan ID |
| `/products/categories` | `GET` | Mengambil semua kategori produk |
| `/products/category/:name` | `GET` | Mengambil produk berdasarkan kategori |

### Konfigurasi Axios — `src/services/api.js`

```javascript
const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});
```

---

## 🧩 Penjelasan Tugas

### ✅ Tugas 1 — ProductDetail dengan useParams

File: `src/pages/ProductDetail.jsx`

Hook `useParams()` digunakan untuk mengambil parameter `:id` dari URL `/product/:id`, kemudian ID tersebut dikirim ke fungsi `getProductById(id)` melalui Axios.

```jsx
// Ambil ID dari URL menggunakan useParams
const { id } = useParams();

useEffect(() => {
  async function fetchProduct() {
    const data = await getProductById(id); // panggil API dengan ID
    setProduct(data);
  }
  fetchProduct();
}, [id]);
```

---

### ✅ Tugas 2 — SearchBar filter produk by nama

File: `src/components/SearchBar.jsx`

Komponen controlled input yang memanggil callback `onSearch` setiap kali nilai input berubah. Di `Home.jsx`, produk difilter menggunakan `.filter()` berdasarkan query yang masuk.

```jsx
// SearchBar.jsx — komponen input pencarian
const handleChange = (e) => {
  setQuery(e.target.value);
  onSearch(e.target.value); // kirim query ke parent
};

// Home.jsx — filter produk berdasarkan query
const filtered = products.filter(p =>
  p.title.toLowerCase().includes(searchQuery.toLowerCase())
);
```

---

### ✅ Tugas 3 — Update Quantity di Cart

File: `src/pages/Cart.jsx` & `src/context/CartContext.jsx`

Ditambahkan dua action baru di reducer: `INCREASE_QTY` dan `DECREASE_QTY`. Jika quantity turun ke 0, item otomatis dihapus dari keranjang.

```javascript
// CartContext.jsx — tambahan case di cartReducer
case 'INCREASE_QTY': {
  const newItems = state.items.map(i =>
    i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
  );
  return recalculate(newItems);
}

case 'DECREASE_QTY': {
  const newItems = state.items
    .map(i => i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i)
    .filter(i => i.quantity > 0); // hapus otomatis jika qty = 0
  return recalculate(newItems);
}
```

```jsx
// Cart.jsx — tombol + dan -
<button onClick={() => decreaseQty(item.id)}>−</button>
<span>{item.quantity}</span>
<button onClick={() => increaseQty(item.id)}>+</button>
```

---

## 📸 Screenshot

### 🏠 Halaman Home
Menampilkan hero section, search bar, filter kategori, dan grid produk.

![Home](https://i.imgur.com/T7XV36h.png)

### 📦 Halaman Product Detail
Menampilkan gambar produk, rating, deskripsi, quantity selector, dan tombol tambah keranjang.

![Detail](https://i.imgur.com/CnMTMfM.png)

### 🛒 Halaman Cart
Menampilkan item keranjang, tombol `+`/`−` update quantity, dan ringkasan pesanan dengan kalkulasi ongkir otomatis.

![Cart](https://i.imgur.com/1yjnXfa.png)

---

## 📚 Konsep CBSE yang Diimplementasikan

### Perbedaan Library vs Framework

| | Library | Framework |
|---|---|---|
| **Contoh** | Axios, lodash, moment.js | React, Angular, Express.js |
| **Kontrol alur** | Developer memanggil library | Framework memanggil kode developer |
| **Prinsip** | Developer yang mengontrol | **Inversion of Control (IoC)** |
| **Fleksibilitas** | Tinggi — pakai kapan saja | Terbatas pada pola arsitektur framework |

### Inversion of Control (IoC)

**Library (Axios)** — kita yang menentukan kapan dipanggil:

```javascript
// Kita yang memanggil Axios
const response = await axios.get('/products');
```

**Framework (React)** — React yang menentukan kapan kode kita dijalankan:

```jsx
// React yang memanggil useEffect setelah render selesai
useEffect(() => {
  fetchData(); // React yang mengontrol kapan ini jalan
}, []);
```

### Component Reusability

Semua UI dipecah menjadi komponen kecil yang reusable dan dapat dikomposisi:

```
App
├── Header          → dipakai di semua halaman
├── Home
│   ├── SearchBar   → komponen filter reusable
│   └── ProductCard → dirender untuk setiap produk di grid
├── ProductDetail
└── Cart
```

---

## 🔗 Links

- 📁 **Repository** → [github.com/deazasqiapasaribumalau/deashop-cbse-ecommerce-react](https://github.com/deazasqiapasaribumalau/deashop-cbse-ecommerce-react)
- 🌐 **Fake Store API** → [fakestoreapi.com](https://fakestoreapi.com)
- 📖 **React Docs** → [react.dev](https://react.dev)
- ⚡ **Vite Docs** → [vitejs.dev](https://vitejs.dev)

---

## 📝 Catatan

- Pastikan koneksi internet aktif saat menjalankan — data produk diambil dari API eksternal
- State keranjang akan hilang saat halaman di-refresh (belum menggunakan `localStorage`)
- Untuk persistensi data, bisa ditambahkan `localStorage` di dalam `CartContext.jsx`

---

<div align="center">

Dibuat dengan ❤️ oleh **Dea Zasqia Pasaribu Malau**

`NPM 2308107010004` · CBSE Praktikum 2025 · Universitas Syiah Kuala

</div>
