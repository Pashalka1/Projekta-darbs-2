# 🐉 Bakugan Universe

React + TypeScript + Tailwind CSS frontend aplikācija, kas izmanto pašu izveidotu API (json-server).

## Komandas palaišana

### 1. Instalēt atkarības
```bash
npm install
```

### 2. Palaist projektu (frontend + backend kopā)
```bash
npm run dev
```

Tas palaidīs:
- **json-server** uz `http://localhost:3001` (API)
- **Vite** uz `http://localhost:5173` (frontend)

### 3. Atver pārlūku
Ej uz: `http://localhost:5173`

### Demo pieejas
- 🎮 Lietotājvārds: `DanKuso` | Parole: `bakugan123`
- 🌪️ Lietotājvārds: `ShunKazami` | Parole: `ventus456`

---

## Projekta struktūra

```
src/
├── App.tsx                        # Galvenais komponents, globālais stāvoklis (auth, navigācija)
├── main.tsx                       # React inicializācija
├── index.css                      # Tailwind + custom stili
│
├── components/                    # Koplietojami komponenti
│   ├── Navbar.tsx                 # Navigācija
│   ├── LoadingSpinner.tsx         # Ielādes indikators
│   ├── ErrorMessage.tsx           # Kļūdu paziņojums
│   └── HomePage.tsx               # Sākumlapa
│
└── features/                      # Feature-based arhitektūra
    ├── auth/
    │   ├── api.ts                 # Axios pieprasījumi (login)
    │   ├── types.ts               # TypeScript interfeisi
    │   └── LoginForm.tsx          # Pieteikšanās forma
    │
    ├── catalog/
    │   ├── api.ts                 # Axios pieprasījumi (GET /bakugan)
    │   ├── types.ts               # Bakugan interfeisi, atribūtu krāsas
    │   ├── BakuganCard.tsx        # Bakugana kartīte
    │   ├── BakuganDetail.tsx      # Detaļu modal logs
    │   └── BakuganCatalog.tsx     # Katalogs ar filtriem
    │
    └── battle/
        ├── api.ts                 # Cīņas simulācijas loģika
        ├── types.ts               # BattleResult, BattleRound interfeisi
        └── BattleSimulator.tsx    # Cīņas simulators
```

## Tehniskie lēmumi

### API
- **json-server** izmantots kā REST API backend
- `db.json` satur 30 Bakuganus ar pilniem datiem
- Axios instances ar `baseURL`, `timeout` un `Content-Type` header
- Atbalstīti GET pieprasījumi: `/bakugan`, `/bakugan/:id`, `/bakugan?attribute=Pyrus`

### State pārvaldība
- `App.tsx` pārvalda globālo stāvokli (autentifikācija, aktīvā lapa)
- `BakuganCatalog` pārvalda lokālo stāvokli (filtri, ielādētie dati, izvēlētais bakugans)
- `BattleSimulator` pārvalda cīņas fāzes un rezultātus

### TypeScript
- Pilna tipizācija bez `any`
- Interfeisi visiem API datiem un komponentu props
- Union types atribūtu un retuma filtriem

### UI/UX
- Responsīvs dizains (mobilais + desktop)
- Loading stāvokļi visos API pieprasījumos
- Error stāvokļi ar retry pogu
- Atribūtu krāsu sistēma (Pyrus=sarkans, Aquos=zils, utt.)
- Smooth animācijas (float, glow, hover efekti)

## API Endpointi (json-server)

| Metode | URL | Apraksts |
|--------|-----|----------|
| GET | `/bakugan` | Visi Bakugani |
| GET | `/bakugan/:id` | Viens Bakugans |
| GET | `/bakugan?attribute=Pyrus` | Filtrēt pēc atribūta |
| GET | `/bakugan?q=drago` | Meklēšana |
| GET | `/users` | Lietotāji (autentifikācijai) |
