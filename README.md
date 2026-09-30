# KrishiMitra – Smart Agriculture Produce Management Platform (AGRINOVA) 🌾
<br>
🌐 **Live Production Web App:** [https://frontend-theta-drab-ff38ec1d47.vercel.app](https://frontend-theta-drab-ff38ec1d47.vercel.app)
**DEMO VIDEO:**[https://youtu.be/aE4JIfgWbts?si=h4IyhyDbsOfrATiK]
> **Right Produce • Right Market • Better Value**

[![GitHub Repository](https://img.shields.io/badge/GitHub-KrishiMitra-181717?logo=github)](https://github.com/prajwalshahare73-master/Krishimitra)
[![Vercel Deployment Live](https://img.shields.io/badge/Vercel-Live%20Demo-success?logo=vercel)](https://frontend-theta-drab-ff38ec1d47.vercel.app)
[![React 19](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61DAFB?logo=react)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%2B%20Python-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![e-NAM Compatible](https://img.shields.io/badge/Agri-e--NAM%20Standard-2e7d32)](https://enam.gov.in)

🌐 **Live Production Web App:** [https://frontend-theta-drab-ff38ec1d47.vercel.app](https://frontend-theta-drab-ff38ec1d47.vercel.app)  
📁 **GitHub Repository:** [https://github.com/prajwalshahare73-master/Krishimitra](https://github.com/prajwalshahare73-master/Krishimitra)  

KrishiMitra is a production-grade, farmer-first digital agriculture platform built according to the **Krishi Mitra PRD specifications** and designed strictly following real-world Indian government agriculture portal standards (such as **e-NAM**, **Agmarknet**, **PM-KISAN**, and the **National Government Services Portal**).

The platform deliberately avoids generic AI/SaaS startup clichés (no neon glows, no excessive glassmorphism, no meaningless floating gradients) and delivers a clean, practical, accessible interface tailored for Indian farmers, FPOs, and agricultural traders.

---

## 🚜 Core Farmer Journey & Implementation

```text
Farmer
   ↓
Register / Login (Mobile + OTP / Quick Demo)
   ↓
Add Harvested Produce (Crop, Quantity, Grade, Harvest Date, Asking Rate)
   ↓
Check Market Prices (Agmarknet Live Sync, APMC Mandi Modal Prices, Trends)
   ↓
Smart Action Advisory (Sell Now vs. Store in Warehouse vs. Value Addition Processing)
   ↓
Discover Nearby Facilities (Cold Storages, WDRA Silos, Food Processors, Collection Hubs on Map)
   ↓
Connect with Verified Buyers (Bulk Buyers, FPOs, Wholesale Exporters)
   ↓
In-App Negotiation Deal Room (Direct Counter-Offer System & Audit Trail)
   ↓
Lock Price & In-App Payment (Encrypted Escrow / UPI / Direct Bank DBT Settlement)
   ↓
Generate Official Digital Sale Receipt (Verifiable Tax Invoice with QR Code & APMC Stamp)
   ↓
Arrange Farmgate Transport (Mini Trucks, Reefer Vans, Tractor Trolleys)
   ↓
Digital Passbook Ledger & Farmer Community Feedback
```

---

## 🏛️ Architecture & Technology Stack

### Frontend (`/frontend`)
- **Framework:** React 19 + Vite (Fast build & HMR)
- **Styling:** Custom Government-Standard CSS Design System (`index.css`)
  - White & light neutral base (`#f8faf9`)
  - Deep agricultural green primary (`#1b5e20`, `#2e7d32`)
  - Warm earth/amber secondary (`#b45309`, `#d97706`)
  - High-contrast typography (`Inter` + `Noto Sans Devanagari` font scale)
- **Maps:** Leaflet & OpenStreetMap interactive GIS layer with geo-tagged cold storages and processing units
- **Multilingual Support:** Instant reactive switching between **English**, **हिन्दी (Hindi)**, and **मराठी (Marathi)**
- **Icons:** Consistent, clean SVG line iconography (`lucide-react`)
- **Responsive:** Mobile-first layout with native-style mobile bottom navigation bar and accessible touch targets

### Backend (`/backend`)
- **Framework:** Python 3.14 + FastAPI + Uvicorn
- **Data Validation:** Pydantic v2
- **CORS:** Configured for seamless API connectivity with Vite dev server
- **Documentation:** Interactive OpenAPI Swagger UI (`http://127.0.0.1:8000/docs`)
- **Resilience:** Seeded realistic APMC mandi records, WDRA cold storages, FPO buyers, and logistics providers with full in-memory and fallback support

---

## 📂 Project Structure

```text
agrinova/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py          # FastAPI application & all REST API routes
│   │   ├── models.py        # Pydantic data schemas
│   │   └── data.py          # Seeded Indian agriculture records (Nashik/Pimpalgaon APMC)
│   ├── requirements.txt     # Python backend dependencies
│   └── run.py               # Uvicorn entrypoint
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx       # Govt. utility bar, helpline, language toggle, font zoom
│   │   │   ├── Footer.jsx       # Official portal footer, national links, helpline info
│   │   │   ├── BottomNav.jsx    # Mobile bottom navigation with floating + Add action
│   │   │   └── MapComponent.jsx # Leaflet GIS map with color-coded facility pins
│   │   ├── pages/
│   │   │   ├── Welcome.jsx      # Portal landing, 7-step flowchart, live statistics
│   │   │   ├── Login.jsx        # Farmer registration, mobile login, quick demo buttons
│   │   │   ├── Dashboard.jsx    # Summary cards, recommendation alert, active produce
│   │   │   ├── AddProduce.jsx   # Harvest entry form with popular crop quick pills
│   │   │   ├── MarketPrice.jsx  # Agmarknet style APMC price board with min/modal/max
│   │   │   ├── Facilities.jsx   # Storage & processing discovery with map & cards
│   │   │   ├── Recommendation.jsx # Sell Now / Store / Process decision advisor
│   │   │   ├── Buyers.jsx       # Verified bulk buyers and FPO marketplace
│   │   │   ├── NegotiationDealRoom.jsx # In-app offer/counter-offer negotiation room
│   │   │   ├── Payment.jsx      # In-app digital payment escrow & printable tax receipt
│   │   │   ├── Transport.jsx    # Farmgate logistics providers and pickup booking
│   │   │   ├── Records.jsx      # Kisan digital passbook & completed transaction ledger
│   │   │   ├── Feedback.jsx     # Farmer community rating & grievance module
│   │   │   └── Profile.jsx      # KYC profile, land holding, DBT bank account info
│   │   ├── i18n/
│   │   │   └── translations.js  # English, Hindi & Marathi translation dictionary
│   │   ├── services/
│   │   │   └── api.js           # API client with automatic fallback resilience
│   │   ├── index.css            # Tokenized CSS design system
│   │   └── App.jsx              # Main application shell
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── Krishi_Mitra_APP_UPDATED.md
├── Krishi_Mitra_Backend_PRD_UPDATED.md
├── Krishi_Mitra_Frontend_PRD_UPDATED.md
└── README.md
```

---

## 🚀 How to Run the Project Locally

### 1. Start the FastAPI Backend

```bash
cd backend
python -m pip install -r requirements.txt
python run.py
```
* Backend runs at: `http://127.0.0.1:8000`
* API Documentation (Swagger): `http://127.0.0.1:8000/docs`

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```
* Frontend runs at: `http://localhost:5173`

---

## 🌟 Key Functional Highlights

1. **Agmarknet & e-NAM Mandi Price Explorer:**
   - Real-world price presentation (Commodity, Mandi Yard, Arrival Date, Min Price, Modal Price, Max Price, Price Trend indicator).
   - Prominent **Last Updated** timestamp to ensure data reliability.
   - Price arbitrage insights (e.g., comparing local Pimpalgaon APMC vs. Vashi APMC).

2. **Smart Produce Action Advisory (Sell Now / Store / Process):**
   - Rules-based logic evaluating produce perishability, current mandi modal price vs. historical average, storage rental costs (MIDH subsidy), and contract processing buyback rates.
   - Three actionable pathways presented with transparent rationale.

3. **In-App Buyer Deal Room & Direct Settlement:**
   - Direct negotiation between farmer and buyer with price & quantity counter-offers and an immutable audit trail.
   - Once confirmed, final deal terms are locked.
   - Escrow settlement simulates secure payment with an official, printable **Digital Sale Receipt** featuring transaction IDs and QR code.

4. **Interactive GIS Facilities Map:**
   - Real Leaflet OpenStreetMap visualization of cold storages, dehydration/pulping units, and collection centres with distance calculations and direct dial actions.

5. **Accessibility & Farmer-Friendly UI:**
   - Font size adjuster (`A-`, `A`, `A+`) for older farmers.
   - 24x7 Kisan Call Centre helpline banner (`1800-180-1551`).
   - Instant language switching across **English**, **हिन्दी**, and **मराठी**.
