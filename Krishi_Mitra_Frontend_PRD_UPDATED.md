# Krishi Mitra — Frontend PRD

## 1. App Overview
**App Name:** Krishi Mitra  
**Theme:** Simple Agriculture / Farmer Support  
**Target Users:** Farmers and agricultural produce sellers

Krishi Mitra is a simple farmer-friendly web/mobile interface that helps farmers manage harvested produce, check market prices, find storage and processing facilities, connect with buyers, and arrange transport.

The interface should be easy to understand for users with limited technical knowledge.

## 2. Main Goals
- Make agricultural produce management simple.
- Help farmers check market prices.
- Help farmers find nearby storage, processing units, buyers, and transport.
- Give a simple recommendation: **Sell Now / Store / Process**.
- Keep records of crops, quantities, quality, harvest dates, and sales.
- Support local-language friendly UI.

## 3. Frontend Technology
- HTML, CSS, JavaScript or React.js
- Responsive design for mobile and desktop
- Maps: Google Maps or OpenStreetMap
- Backend-ready API integration with Python/FastAPI
- Authentication and data can later connect with Firebase/MongoDB

## 4. Design Theme
### Visual Style
- Agriculture-focused and clean
- Light background
- Green as the main theme color
- Earth/brown accent for agricultural sections
- Large buttons and readable text
- Simple icons for Crop, Market, Storage, Processing, Buyer, and Transport

### UI Principles
- Minimum steps to complete an action
- Clear labels
- Large touch-friendly buttons
- Simple cards instead of complicated tables
- Use familiar agricultural icons
- Show important information first

## 5. Main Screens

### 5.1 Welcome / Landing Page
Show:
- Krishi Mitra logo
- Tagline: **“Your Smart Partner for Better Produce Management”**
- Short introduction
- **Get Started** button
- Language selection: English / Hindi / Marathi

### 5.2 Farmer Login / Registration
Fields:
- Name
- Mobile Number
- Location
- Password/OTP

Buttons:
- Register
- Login

## 6. Farmer Dashboard
The dashboard should contain:

**Header**
- Krishi Mitra logo
- Farmer name
- Language button
- Profile icon

**Quick Actions**
- Add Produce
- Market Price
- Find Storage
- Find Buyers
- Find Processing
- Transport

**Recommendation Card**
Example:
> Your tomato produce is ready.  
> Current market information is available.  
> Suggested options: Sell Now / Store / Process.

**Recent Produce**
Show crop name, quantity, quality, and status.

## 7. Add Produce Screen
Fields:
- Crop name
- Quantity
- Quality
- Harvest date
- Location
- Optional crop photo

Button:
**Save Produce**

After saving, show the produce in the farmer's dashboard.

## 8. Market Price Screen
Show:
- Crop name
- Market/location
- Minimum price
- Modal/average price
- Maximum price
- Last updated time

Features:
- Search crop
- Compare markets
- Select location

Important UI note:
Show a clear **Last Updated** label because market information can change.

## 9. Nearby Facilities Screen
Use map + list view.

Categories:
- Storage
- Processing Units
- Buyers
- Collection Centres
- Transport

Each facility card should show:
- Name
- Distance
- Type
- Basic contact/action
- **View on Map** button

## 10. Smart Recommendation Screen
Show three simple options:

### Sell Now
For produce that may be suitable for immediate selling.

### Store
For produce that may be better kept in suitable storage.

### Process
For produce that may gain additional value through processing.

The recommendation should be presented as a suggestion, with the supporting market/produce information visible to the user.

## 11. Buyer / Selling Screen
Show:
- Buyer name
- Crop required
- Quantity
- Location
- Contact/action button

Farmer can select a buyer and proceed with selling/collection arrangements.

## 12. Negotiation / In-App Chat Screen

The farmer and buyer should be able to negotiate the produce deal without leaving Krishi Mitra.

Show:
- Buyer name
- Produce/crop
- Available quantity
- Farmer's asking price
- Buyer's offer price
- Current/final agreed price
- Quantity being negotiated
- Offer history
- Chat/messages
- Deal status

Actions:
- **Send Offer**
- **Counter Offer**
- **Accept Offer**
- **Reject Offer**
- **Confirm Deal**

Negotiation status:
- Negotiating
- Offer Sent
- Counter Offer
- Deal Confirmed
- Deal Rejected

After both parties accept the same price and quantity, lock the final deal and show **Proceed to Payment**.

## 13. In-App Payment Screen

Payment should happen inside the Krishi Mitra app after the farmer and buyer confirm the deal.

Show:
- Buyer/Farmer details
- Crop/produce
- Quantity
- Final agreed price per unit
- Total amount
- Payment method
- Transaction/Order ID
- Payment status

Actions:
- **Pay Now**
- **Confirm Payment**
- **View Receipt**

Payment statuses:
- Payment Pending
- Processing
- Paid
- Failed
- Refunded

After successful payment:
- Show payment-success confirmation.
- Display transaction ID.
- Update the sale status.
- Make the transaction visible in **My Records**.
- Allow transport/collection arrangements.

## 14. Transport Screen
Show:
- Available transport options
- Vehicle type
- Approximate distance
- Contact/action
- Pickup location

## 15. My Records Screen
Show:
- Crop records
- Quantity
- Harvest date
- Buyer
- Sale date
- Sale amount
- Status

Use simple cards and filters.

## 16. Navigation
Mobile bottom navigation:
1. Home
2. Produce
3. Market
4. Facilities
5. Profile

Use a floating/primary **+ Add Produce** button where suitable.

## 17. Accessibility & Farmer-Friendly Features
- Large text
- Large buttons
- High readability
- Simple language
- Marathi/Hindi support
- Avoid complicated technical terms
- Basic offline-friendly states
- Clear error messages
- Loading indicators
- Confirmation after important actions
- Clear negotiation and payment status
- Payment success/failure feedback
- Do not expose sensitive payment details in the UI

## 18. Important Empty/Error States
Examples:
- “No market data available right now.”
- “No nearby storage centre found.”
- “Internet connection is weak. Please try again.”
- “Your produce has been saved successfully.”

## 19. Suggested Folder Structure

```text
krishi-mitra/
├── public/
├── src/
│   ├── components/
│   │   ├── Header
│   │   ├── BottomNav
│   │   ├── ProduceCard
│   │   ├── MarketCard
│   │   └── FacilityCard
│   ├── pages/
│   │   ├── Welcome
│   │   ├── Login
│   │   ├── Dashboard
│   │   ├── AddProduce
│   │   ├── MarketPrice
│   │   ├── Facilities
│   │   ├── Recommendation
│   │   ├── Buyers
│   │   ├── Negotiation
│   │   ├── Payment
│   │   ├── Transport
│   │   └── Records
│   ├── services/
│   ├── assets/
│   └── App.jsx
└── README.md
```

## 20. MVP Priority
### Phase 1
- Login/Register
- Dashboard
- Add Produce
- Market Price
- Nearby Facilities

### Phase 2
- Buyer connection
- In-app negotiation/chat
- Final deal confirmation
- In-app payment
- Payment confirmation/receipt
- Transport
- Smart Sell/Store/Process recommendation
- Digital sales/transaction records

### Phase 3
- Multilingual support
- Offline support
- AI/ML improvements
- Notifications and alerts
