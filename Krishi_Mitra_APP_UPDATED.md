# Krishi Mitra

> **Right Produce. Right Market. Better Value. 🌾**

Krishi Mitra is a simple agriculture-focused app concept for farmers to manage harvested agricultural produce and find useful selling, storage, processing, and transport options from one platform.

## 🌱 What Krishi Mitra Does

Krishi Mitra helps farmers:

- Add crop and produce details
- Record quantity and quality
- Check market prices
- Find nearby storage centres
- Find processing units
- Find potential buyers
- Find collection and transport facilities
- Get simple **Sell Now / Store / Process** suggestions
- Maintain digital crop and sales records

## 🎯 Main User Flow

```text
Farmer
   ↓
Register / Login
   ↓
Add Produce
   ↓
Check Market Price
   ↓
Find Storage / Processing / Buyer
   ↓
Get Simple Recommendation
   ↓
Arrange Transport / Collection
   ↓
Open Buyer Deal
   ↓
In-App Negotiation
   ↓
Confirm Final Price & Quantity
   ↓
In-App Payment
   ↓
Payment Confirmation
   ↓
Arrange Transport / Collection
   ↓
Complete Sale
   ↓
Save Transaction Record & Feedback
```

## 📱 Main App Pages

1. **Welcome**
2. **Login / Register**
3. **Farmer Dashboard**
4. **Add Produce**
5. **Market Price**
6. **Nearby Facilities**
7. **Smart Recommendation**
8. **Buyers**
9. **Transport**
10. **Negotiation / Chat**
11. **Payment**
12. **My Records**
13. **Profile**

## 🧑‍🌾 Farmer-Friendly Design

The app should be:

- Simple
- Fast
- Mobile-friendly
- Easy to read
- Agriculture-themed
- Suitable for users with limited technical knowledge

### Theme
- Primary: Green
- Supporting: Earth/Brown
- Background: Light
- Icons: Crop, tractor, market, storage, truck, buyer

## 🛠️ Suggested Technology

### Frontend
- HTML
- CSS
- JavaScript / React.js

### Mobile
- Flutter

### Backend
- Python
- FastAPI

### Database
- Firebase / MongoDB

### Maps
- Google Maps / OpenStreetMap

### Hosting
- Firebase / Vercel / Render

## 🔐 Basic Data

### Farmer
```text
name
mobile
location
language
```

### Produce
```text
crop
quantity
quality
harvestDate
location
photo
status
```

### Market
```text
crop
market
minPrice
modalPrice
maxPrice
updatedAt
```

### Facility
```text
name
type
location
distance
contact
```

### Sale Record
```text
crop
quantity
buyer
saleDate
saleAmount
agreedPrice
paymentStatus
paymentMethod
transactionId
status
```

### Negotiation
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
messages
createdAt
updatedAt
```

### Payment
```text
id
saleId
farmerId
buyerId
amount
paymentMethod
paymentStatus
transactionId
paidAt
```

### In-App Selling Flow
The farmer and buyer should complete the commercial transaction inside Krishi Mitra:
1. Farmer selects a buyer and produce.
2. Buyer/farmer sends an offer price and quantity.
3. Both parties negotiate through in-app chat and offers.
4. When both agree, the final price and quantity are locked.
5. Buyer proceeds to the in-app payment screen.
6. Payment status and transaction ID are stored.
7. Both users receive confirmation.
8. Transport/collection can then be arranged.
9. The completed transaction appears in **My Records**.

Statuses: **Negotiating → Deal Confirmed → Payment Pending → Paid → Completed**.

## 🚀 Future Features

- Marathi / Hindi / English support
- Offline-friendly features
- AI-based recommendations
- Market price alerts
- Weather information
- Crop disease support
- Digital notifications
- Better farmer-buyer connection
- In-app buyer-farmer negotiation
- In-app payment and transaction tracking
- Digital invoices/receipts for completed sales

## 📌 Project Background

The project source proposes a single platform connecting:

**Farmers → Storage → Processing → Buyers → Market**

It also highlights simple interfaces, local-language support, updated market/facility information, digital records, and direct farmer-buyer connection as important parts of the solution. fileciteturn0file0L33-L44

The proposed technical stack in the source includes React.js/HTML/CSS, Flutter, Python + FastAPI, Firebase/MongoDB, maps, and basic machine learning. fileciteturn0file0L47-L55

## 📄 Project Status

**Project Name:** Krishi Mitra  
**Type:** Agriculture / Farmer Support Platform  
**Target:** Farmers  
**Current Focus:** Simple frontend prototype and core farmer workflow
