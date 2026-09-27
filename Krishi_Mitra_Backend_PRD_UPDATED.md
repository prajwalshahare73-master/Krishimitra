# Krishi Mitra — Backend PRD

## 1. Project Overview

**App Name:** Krishi Mitra  
**Theme:** Agriculture / Farmer Support  
**Backend:** Python + FastAPI  
**Database:** Firebase or MongoDB

Krishi Mitra backend will provide APIs for farmer registration, produce management, market-price information, nearby facilities, buyers, transport, recommendations, and sales records.

The backend should be simple, secure, scalable, and easy to connect with the frontend.

The project source describes a platform where farmers can add crop, quantity and quality details, view storage/processing/buyer/transport options, check market prices, and receive a **Sell Now / Store / Process** suggestion. fileciteturn0file0L15-L22

---

# 2. Backend Objectives

- Manage farmer accounts.
- Store agricultural produce details.
- Provide market-price data.
- Find nearby storage, processing units, buyers, and transport.
- Generate simple produce recommendations.
- Manage buyer and selling information.
- Save sale records.
- Support Marathi, Hindi, and English-ready data.
- Provide secure APIs for the frontend.
- Keep the architecture ready for future AI/ML features.

---

# 3. Suggested Technology Stack

### Backend
- Python 3.x
- FastAPI
- Pydantic
- Uvicorn

### Database
Choose one for the MVP:
- Firebase Firestore, or
- MongoDB

### Authentication
- Mobile number + OTP, or
- Mobile number + password

### Maps / Location
- Google Maps API or OpenStreetMap

### AI/ML
- Python
- Basic Machine Learning for future smart recommendations

### Hosting
- Render / Firebase / similar backend hosting

The project source specifically proposes Python + FastAPI, Firebase/MongoDB, maps, and basic machine learning. fileciteturn0file0L47-L55

---

# 4. Backend Architecture

```text
Frontend
   ↓
FastAPI REST API
   ↓
Authentication
   ↓
Business Logic
   ↓
Database
   ↓
External Services
   ├── Market Data
   ├── Maps / Location
   └── Future AI/ML Service
```

---

# 5. Main Backend Modules

## 5.1 Authentication Module

Functions:
- Register farmer
- Login farmer
- Verify OTP/password
- Get current user
- Update profile

### Farmer Data

```text
id
name
mobile
location
language
createdAt
updatedAt
```

---

# 6. Produce Management Module

Farmers should be able to add and manage harvested produce.

### Produce Data

```text
id
farmerId
cropName
quantity
quality
harvestDate
location
photoUrl
status
createdAt
updatedAt
```

### API Endpoints

```text
POST   /api/produce
GET    /api/produce
GET    /api/produce/{id}
PUT    /api/produce/{id}
DELETE /api/produce/{id}
```

### Example

```json
{
  "cropName": "Tomato",
  "quantity": 500,
  "quality": "Good",
  "harvestDate": "2026-09-20",
  "location": "Nagpur"
}
```

---

# 7. Market Price Module

The backend should provide market-price information for crops.

### Market Price Data

```text
id
cropName
marketName
location
minPrice
modalPrice
maxPrice
unit
updatedAt
```

### API Endpoints

```text
GET /api/market-prices
GET /api/market-prices/{cropName}
```

### Query Example

```text
/api/market-prices?crop=Tomato&location=Nagpur
```

The frontend should display a clear **Last Updated** value because market information can change.

---

# 8. Facilities Module

Facilities include:

- Storage centres
- Processing units
- Collection centres
- Buyers
- Transport providers

### Facility Data

```text
id
name
type
location
latitude
longitude
address
contact
description
```

### API

```text
GET /api/facilities
GET /api/facilities/nearby
GET /api/facilities/{id}
```

### Example

```text
/api/facilities/nearby?lat=21.14&lng=79.08&type=storage
```

---

# 9. Buyer Module

Buyers can be listed according to crop requirements and location.

### Buyer Data

```text
id
name
crop
requiredQuantity
location
contact
status
```

### API

```text
GET /api/buyers
GET /api/buyers/{id}
GET /api/buyers/search
```

---

# 10. Transport Module

The backend can provide available transport/collection options.

### Transport Data

```text
id
providerName
vehicleType
contact
location
capacity
price
availability
```

### API

```text
GET /api/transport
GET /api/transport/nearby
```

---

# 11. Smart Recommendation Module

The first MVP can use simple rules instead of complex AI.

The backend should provide three possible suggestions:

### Sell Now
Based on available market information and produce details.

### Store
Suggest storage when the farmer may not want to sell immediately and suitable storage is available.

### Process
Suggest processing when a relevant processing option is available.

### API

```text
POST /api/recommendation
```

### Request

```json
{
  "produceId": "PROD123"
}
```

### Response

```json
{
  "recommendation": "SELL_NOW",
  "reason": "Market information is available for this crop.",
  "options": [
    "Sell Now",
    "Store",
    "Process"
  ]
}
```

The project methodology describes the system checking produce information and available options before suggesting **Sell Now / Store / Process**. fileciteturn0file0L64-L75

---

# 12. Sales / Transaction Module

Store planned and completed sale information, including the final negotiated deal and payment state.

### Sale Data

```text
id
farmerId
produceId
buyerId
quantity
price
totalAmount
saleDate
agreedPrice
paymentStatus
paymentMethod
transactionId
status
createdAt
updatedAt
```

### API

```text
POST /api/sales
GET  /api/sales
GET  /api/sales/{id}
PUT  /api/sales/{id}
```

### Sale Status Flow

```text
NEGOTIATING
    ↓
DEAL_CONFIRMED
    ↓
PAYMENT_PENDING
    ↓
PAID
    ↓
COMPLETED
```

---

# 13. In-App Negotiation Module

The negotiation process must happen inside Krishi Mitra so the farmer and buyer do not need an external chat platform.

### Negotiation Data

```text
id
farmerId
buyerId
produceId
offeredQuantity
farmerPrice
buyerPrice
finalPrice
status
createdAt
updatedAt
```

### Negotiation Message Data

```text
id
negotiationId
senderId
message
offerPrice
offerQuantity
createdAt
```

### Negotiation Status

```text
NEGOTIATING
OFFER_SENT
COUNTER_OFFER
DEAL_CONFIRMED
DEAL_REJECTED
EXPIRED
```

### API

```text
POST /api/negotiations
GET  /api/negotiations
GET  /api/negotiations/{id}
POST /api/negotiations/{id}/offer
POST /api/negotiations/{id}/counter-offer
POST /api/negotiations/{id}/accept
POST /api/negotiations/{id}/reject
POST /api/negotiations/{id}/messages
```

### Business Rules
- Only the farmer and selected buyer can access their negotiation.
- Every offer/counter-offer stores price and quantity.
- A deal becomes confirmed only after the final offer is accepted.
- Once confirmed, final price and quantity are locked for payment.
- Payment cannot be created for an unconfirmed deal.

# 14. In-App Payment Module

Payment should be initiated and tracked from inside Krishi Mitra after a negotiation is confirmed.

The PRD uses a provider-independent payment layer so a supported payment gateway can be connected later.

### Payment Data

```text
id
saleId
negotiationId
farmerId
buyerId
amount
currency
paymentMethod
paymentStatus
transactionId
gatewayReference
paidAt
createdAt
updatedAt
```

### Payment Status

```text
PENDING
PROCESSING
SUCCESS
FAILED
REFUNDED
```

### API

```text
POST /api/payments/create
GET  /api/payments/{id}
POST /api/payments/{id}/verify
GET  /api/payments/sale/{saleId}
```

### Payment Flow

```text
Deal Confirmed
      ↓
Create Payment Order
      ↓
Buyer Pays In-App
      ↓
Payment Gateway
      ↓
Backend Verifies Payment
      ↓
Payment SUCCESS
      ↓
Update Sale = PAID
      ↓
Generate Transaction/Receipt Data
      ↓
Transport / Collection
      ↓
Sale = COMPLETED
```

### Payment Security Requirements
- Never store raw card numbers, CVV, UPI PINs, passwords, or other sensitive payment credentials.
- Use the selected payment provider's secure checkout/tokenization.
- Verify payment status on the backend using server-side verification/webhooks.
- Do not mark a sale as paid only from a frontend success screen.
- Keep transaction IDs and payment status for farmer records.
- Protect payment APIs with authenticated, user-specific authorization.

# 13. Farmer Records Module

Farmers should be able to view:

- Crop records
- Quantity
- Harvest date
- Buyers
- Sale date
- Sale amount
- Sale status

### API

```text
GET /api/farmer/records
```

---

# 16. Feedback Module

Allow farmers to provide feedback after using a facility or completing a sale.

### Feedback Data

```text
id
farmerId
targetId
rating
comment
createdAt
```

### API

```text
POST /api/feedback
GET /api/feedback/{targetId}
```

The source methodology includes saving sale details and allowing farmer feedback. fileciteturn0file0L74-L77

---

# 17. Database Structure

Suggested collections/tables:

```text
farmers
produce
market_prices
facilities
buyers
transport
sales
negotiations
negotiation_messages
payments
feedback
notifications
```

### Basic Relationship

```text
Farmer
  ├── Produce
  │     └── Sale
  ├── Feedback
  └── Notifications

Produce
  ├── Market Price
  ├── Buyer
  ├── Storage
  └── Processing
```

---

# 18. API Structure

All APIs should use:

```text
/api/...
```

Suggested structure:

```text
/api/auth
/api/farmers
/api/produce
/api/market-prices
/api/facilities
/api/buyers
/api/transport
/api/recommendation
/api/sales
/api/negotiations
/api/payments
/api/feedback
/api/notifications
```

---

# 19. Security

The backend should include:

- Secure authentication
- Password hashing if passwords are used
- Token-based authorization
- Input validation using Pydantic
- User-specific access to farmer records
- Protected database credentials
- Environment variables for API keys
- Basic rate limiting where required
- Validation of uploaded files/images

The source identifies farmer/transaction data security as a project challenge and recommends secure login, encryption, and protected databases. fileciteturn0file0L100-L111

---

# 20. Error Handling

Use simple JSON responses.

### Success

```json
{
  "success": true,
  "message": "Produce added successfully",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Produce not found"
}
```

Common status codes:

```text
200 — Success
201 — Created
400 — Bad Request
401 — Unauthorized
403 — Forbidden
404 — Not Found
500 — Server Error
```

---

# 21. Environment Variables

Example:

```env
DATABASE_URL=
SECRET_KEY=
GOOGLE_MAPS_API_KEY=
MARKET_API_KEY=
FIREBASE_CONFIG=
```

Do not put secret keys directly inside source code.

---

# 22. Suggested Backend Folder Structure

```text
krishi-mitra-backend/
│
├── app/
│   ├── main.py
│   ├── config.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── farmers.py
│   │   ├── produce.py
│   │   ├── market.py
│   │   ├── facilities.py
│   │   ├── buyers.py
│   │   ├── transport.py
│   │   ├── recommendation.py
│   │   ├── sales.py
│   │   ├── negotiations.py
│   │   ├── payments.py
│   │   └── feedback.py
│   │
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── database/
│   └── utils/
│
├── requirements.txt
├── .env
├── .gitignore
└── README.md
```

---

# 23. MVP Backend Priority

## Phase 1 — Basic Backend
- Farmer registration/login
- Farmer profile
- Add/update/delete produce
- View farmer produce

## Phase 2 — Agriculture Data
- Market prices
- Nearby facilities
- Buyers
- Transport

## Phase 3 — Selling, Negotiation & Payment
- Sell/Store/Process recommendation
- Buyer-farmer negotiation
- Offer/counter-offer system
- Deal confirmation
- In-app payment
- Payment verification
- Sales/transaction records
- Feedback
- Notifications

## Phase 4 — Future Improvements
- AI/ML recommendations
- Multilingual API responses
- Offline synchronization
- Weather integration
- Advanced market-price alerts

---

# 24. Non-Functional Requirements

### Performance
Normal API responses should be fast and lightweight.

### Scalability
The backend should allow more farmers, crops, buyers, and facilities to be added later.

### Reliability
Important farmer records should not be lost.

### Usability
API responses should be simple for the frontend to consume.

### Security
Farmer and transaction data should be protected.

---

# 25. Backend MVP Success Criteria

The backend MVP is complete when a farmer can:

```text
Register
   ↓
Login
   ↓
Add Produce
   ↓
View Produce
   ↓
Check Market Price
   ↓
Find Nearby Facility/Buyer
   ↓
Get Sell/Store/Process Suggestion
   ↓
Select Buyer
   ↓
Negotiate Price & Quantity In-App
   ↓
Confirm Deal
   ↓
Pay In-App
   ↓
Verify Payment
   ↓
Save Sale & Transaction Record
```

This follows the project's proposed implementation flow from farmer registration through produce entry, market-price checking, facility discovery, recommendation, selling, and feedback. fileciteturn0file0L58-L77

---

## Project Identity

**Name:** Krishi Mitra 🌾  
**Type:** Agriculture / Farmer Support App  
**Backend:** FastAPI + Python  
**Database:** Firebase / MongoDB  
**Frontend:** React.js / HTML + CSS + JavaScript  
**Core Idea:** Connect **Farmers → Storage → Processing → Buyers → Market**
