from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import uuid
from typing import List, Optional

from app.models import (
    FarmerRegister, FarmerLogin, Farmer,
    ProduceCreate, Produce,
    MarketPrice, Facility, Buyer, Transport,
    RecommendationRequest, RecommendationResponse,
    NegotiationCreate, Negotiation, OfferRequest, NegotiationMessage,
    PaymentCreate, Payment,
    SaleRecord, FeedbackCreate, Feedback
)
from app.data import (
    INITIAL_FARMER, INITIAL_PRODUCE, MARKET_PRICES,
    FACILITIES, BUYERS, TRANSPORTS,
    INITIAL_NEGOTIATIONS, INITIAL_SALES, INITIAL_FEEDBACK
)

app = FastAPI(
    title="KrishiMitra Backend API",
    description="Backend services for KrishiMitra – Smart Agriculture Produce Management Platform",
    version="1.0.0"
)

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage seeded with realistic agriculture records
db = {
    "farmers": {INITIAL_FARMER["mobile"]: INITIAL_FARMER.copy()},
    "produce": {p["id"]: p.copy() for p in INITIAL_PRODUCE},
    "market_prices": {m["id"]: m.copy() for m in MARKET_PRICES},
    "facilities": {f["id"]: f.copy() for f in FACILITIES},
    "buyers": {b["id"]: b.copy() for b in BUYERS},
    "transports": {t["id"]: t.copy() for t in TRANSPORTS},
    "negotiations": {n["id"]: n.copy() for n in INITIAL_NEGOTIATIONS},
    "sales": {s["id"]: s.copy() for s in INITIAL_SALES},
    "payments": {},
    "feedback": {f["id"]: f.copy() for f in INITIAL_FEEDBACK}
}

current_farmer_mobile = INITIAL_FARMER["mobile"]


# ---------------- HEALTH & WELCOME ----------------
@app.get("/")
def read_root():
    return {
        "success": True,
        "app": "KrishiMitra – Smart Agriculture Produce Management Platform",
        "status": "online",
        "version": "1.0.0",
        "documentation": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}


# ---------------- AUTHENTICATION ----------------
@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
def register_farmer(data: FarmerRegister):
    global current_farmer_mobile
    mobile = data.mobile.strip()
    if mobile in db["farmers"]:
        raise HTTPException(status_code=400, detail="Farmer with this mobile number already registered")
    
    farmer_id = f"FARMER-{uuid.uuid4().hex[:6].upper()}"
    new_farmer = {
        "id": farmer_id,
        "name": data.name,
        "mobile": mobile,
        "location": data.location,
        "state": data.state or "Maharashtra",
        "district": data.district or "Nashik",
        "language": data.language or "en",
        "createdAt": datetime.now().isoformat(),
        "updatedAt": datetime.now().isoformat()
    }
    db["farmers"][mobile] = new_farmer
    current_farmer_mobile = mobile
    return {"success": True, "message": "Farmer registered successfully", "data": new_farmer}

@app.post("/api/auth/login")
def login_farmer(data: FarmerLogin):
    global current_farmer_mobile
    mobile = data.mobile.strip()
    if mobile not in db["farmers"]:
        # If mobile not found in mock/testing mode, create a guest farmer profile
        new_farmer = {
            "id": f"FARMER-{uuid.uuid4().hex[:6].upper()}",
            "name": "Kisan Bandhu",
            "mobile": mobile,
            "location": "Nashik District",
            "state": "Maharashtra",
            "district": "Nashik",
            "language": "en",
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        }
        db["farmers"][mobile] = new_farmer
    
    current_farmer_mobile = mobile
    return {"success": True, "message": "Login successful", "data": db["farmers"][mobile]}

@app.get("/api/auth/me")
def get_current_user():
    farmer = db["farmers"].get(current_farmer_mobile, INITIAL_FARMER)
    return {"success": True, "data": farmer}


# ---------------- PRODUCE MANAGEMENT ----------------
@app.get("/api/produce")
def get_all_produce(status_filter: Optional[str] = None):
    produce_list = list(db["produce"].values())
    if status_filter:
        produce_list = [p for p in produce_list if p.get("status") == status_filter.upper()]
    return {"success": True, "count": len(produce_list), "data": produce_list}

@app.get("/api/produce/{produce_id}")
def get_produce_by_id(produce_id: str):
    if produce_id not in db["produce"]:
        raise HTTPException(status_code=404, detail="Produce record not found")
    return {"success": True, "data": db["produce"][produce_id]}

@app.post("/api/produce", status_code=status.HTTP_201_CREATED)
def create_produce(data: ProduceCreate):
    produce_id = f"PROD-{uuid.uuid4().hex[:5].upper()}"
    farmer = db["farmers"].get(current_farmer_mobile, INITIAL_FARMER)
    
    # Default image based on crop name if not provided
    photo = data.photoUrl
    if not photo:
        c_lower = data.cropName.lower()
        if "tomato" in c_lower:
            photo = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=60"
        elif "onion" in c_lower:
            photo = "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=60"
        elif "soybean" in c_lower or "pulse" in c_lower:
            photo = "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&auto=format&fit=crop&q=60"
        elif "potato" in c_lower:
            photo = "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60"
        elif "wheat" in c_lower or "grain" in c_lower:
            photo = "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=60"
        else:
            photo = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&auto=format&fit=crop&q=60"

    new_item = {
        "id": produce_id,
        "farmerId": farmer.get("id", "FARMER-MH-4291"),
        "cropName": data.cropName,
        "variety": data.variety or "Standard",
        "quantity": data.quantity,
        "quality": data.quality,
        "harvestDate": data.harvestDate,
        "location": data.location,
        "askingPrice": data.askingPrice or 0.0,
        "photoUrl": photo,
        "status": "ACTIVE",
        "createdAt": datetime.now().isoformat(),
        "updatedAt": datetime.now().isoformat()
    }
    db["produce"][produce_id] = new_item
    return {"success": True, "message": "Agricultural produce saved successfully", "data": new_item}

@app.put("/api/produce/{produce_id}")
def update_produce(produce_id: str, data: ProduceCreate):
    if produce_id not in db["produce"]:
        raise HTTPException(status_code=404, detail="Produce record not found")
    item = db["produce"][produce_id]
    item.update(data.dict())
    item["updatedAt"] = datetime.now().isoformat()
    return {"success": True, "message": "Produce updated successfully", "data": item}

@app.delete("/api/produce/{produce_id}")
def delete_produce(produce_id: str):
    if produce_id not in db["produce"]:
        raise HTTPException(status_code=404, detail="Produce not found")
    del db["produce"][produce_id]
    return {"success": True, "message": "Produce record removed"}


# ---------------- MARKET PRICES ----------------
@app.get("/api/market-prices")
def get_market_prices(crop: Optional[str] = None, district: Optional[str] = None):
    prices = list(db["market_prices"].values())
    if crop:
        prices = [p for p in prices if crop.lower() in p["cropName"].lower()]
    if district:
        prices = [p for p in prices if district.lower() in p["district"].lower()]
    return {"success": True, "count": len(prices), "data": prices}

@app.get("/api/market-prices/{cropName}")
def get_market_price_by_crop(cropName: str):
    matched = [p for p in db["market_prices"].values() if cropName.lower() in p["cropName"].lower()]
    if not matched:
        return {"success": True, "data": []}
    return {"success": True, "data": matched}


# ---------------- FACILITIES ----------------
@app.get("/api/facilities")
def get_facilities(type: Optional[str] = None):
    facs = list(db["facilities"].values())
    if type:
        facs = [f for f in facs if f["type"].lower() == type.lower()]
    return {"success": True, "count": len(facs), "data": facs}

@app.get("/api/facilities/nearby")
def get_nearby_facilities(lat: Optional[float] = None, lng: Optional[float] = None, type: Optional[str] = None):
    facs = list(db["facilities"].values())
    if type:
        facs = [f for f in facs if f["type"].lower() == type.lower()]
    # Sort by distance
    facs = sorted(facs, key=lambda x: x["distance"])
    return {"success": True, "data": facs}

@app.get("/api/facilities/{facility_id}")
def get_facility_by_id(facility_id: str):
    if facility_id not in db["facilities"]:
        raise HTTPException(status_code=404, detail="Facility not found")
    return {"success": True, "data": db["facilities"][facility_id]}


# ---------------- BUYERS ----------------
@app.get("/api/buyers")
def get_buyers(crop: Optional[str] = None):
    buyers_list = list(db["buyers"].values())
    if crop:
        buyers_list = [b for b in buyers_list if crop.lower() in b["crop"].lower()]
    return {"success": True, "count": len(buyers_list), "data": buyers_list}

@app.get("/api/buyers/search")
def search_buyers(query: str):
    results = [
        b for b in db["buyers"].values()
        if query.lower() in b["name"].lower() or query.lower() in b["crop"].lower() or query.lower() in b["location"].lower()
    ]
    return {"success": True, "data": results}

@app.get("/api/buyers/{buyer_id}")
def get_buyer_by_id(buyer_id: str):
    if buyer_id not in db["buyers"]:
        raise HTTPException(status_code=404, detail="Buyer not found")
    return {"success": True, "data": db["buyers"][buyer_id]}


# ---------------- TRANSPORT ----------------
@app.get("/api/transport")
def get_transport(type: Optional[str] = None):
    trans = list(db["transports"].values())
    if type:
        trans = [t for t in trans if type.lower() in t["vehicleType"].lower()]
    return {"success": True, "count": len(trans), "data": trans}

@app.get("/api/transport/nearby")
def get_nearby_transport():
    trans = sorted(list(db["transports"].values()), key=lambda x: x["distance"])
    return {"success": True, "data": trans}


# ---------------- SMART RECOMMENDATION (PRD Section 11) ----------------
@app.post("/api/recommendation")
def get_recommendation(req: RecommendationRequest):
    produce = db["produce"].get(req.produceId)
    if not produce:
        # Default mock if produce ID doesn't exist
        crop_name = "Tomato"
        asking_price = 2250.0
        qty = 100.0
    else:
        crop_name = produce["cropName"]
        asking_price = produce.get("askingPrice", 2200.0)
        qty = produce.get("quantity", 100.0)

    # Check mandi modal price for crop
    matched_mandis = [m for m in db["market_prices"].values() if crop_name.lower() in m["cropName"].lower()]
    modal_price = matched_mandis[0]["modalPrice"] if matched_mandis else 2300.0
    max_price = matched_mandis[0]["maxPrice"] if matched_mandis else 2600.0

    # Decision Engine:
    # 1. Perishable crops (Tomato) with firm mandi price -> SELL_NOW or PROCESS
    # 2. Durable crops (Onion, Soybean, Wheat) where market is trending UP -> STORE
    c_lower = crop_name.lower()
    
    if "tomato" in c_lower:
        rec = "SELL_NOW"
        title = "Sell Now via Direct Buyer / APMC"
        confidence = 0.92
        reason = f"Current modal mandi price for Tomato at Pimpalgaon APMC is ₹{modal_price:,.0f}/Qtl (Above your asking rate). Demand is strong, and crop is perishable with limited shelf life without cold storage."
    elif "onion" in c_lower:
        rec = "STORE"
        title = "Store in Ventilated Chawl / Cold Silo"
        confidence = 0.88
        reason = f"Onion prices are trending UP by +8% this week. Storing for 30-45 days at Kisan Warehouse (₹60/Qtl/mo) can yield ₹2,800/Qtl (Estimated net gain: ₹360/Qtl after storage costs)."
    elif "soybean" in c_lower or "pulse" in c_lower:
        rec = "STORE"
        title = "Store under e-NWR Warehouse Pledge"
        confidence = 0.90
        reason = "Soybean arrivals are peaking this fortnight. Historical trends show +14% price recovery post-harvest season. WDRA depot provides 70% pledge loan."
    else:
        rec = "SELL_NOW"
        title = "Sell at Nearest Mandi / Active Buyer"
        confidence = 0.85
        reason = f"Active buyers available offering ₹{modal_price:,.0f}/Qtl for immediate pickup."

    return {
        "success": True,
        "produceId": req.produceId,
        "cropName": crop_name,
        "recommendation": rec,
        "recommendationTitle": title,
        "confidence": confidence,
        "reason": reason,
        "marketComparison": {
            "yourAskingPrice": asking_price,
            "currentMandiModalPrice": modal_price,
            "maxMandiPrice": max_price,
            "unit": "₹/Quintal"
        },
        "storageOption": {
            "facility": "Sahyadri Agro Cold Storage (4.5 km)",
            "rate": "₹85/Qtl/month",
            "estimatedValuePreservation": "98%"
        },
        "processingOption": {
            "facility": "Godavari Food Processing & Pulping (5.8 km)",
            "rate": "Contract Buyback: ₹2,450/Qtl processed",
            "valueAddition": "+15% vs unassorted mandi lot"
        },
        "options": ["Sell Now", "Store", "Process"]
    }


# ---------------- NEGOTIATIONS (PRD Section 13) ----------------
@app.get("/api/negotiations")
def get_negotiations():
    return {"success": True, "count": len(db["negotiations"]), "data": list(db["negotiations"].values())}

@app.get("/api/negotiations/{negotiation_id}")
def get_negotiation_by_id(negotiation_id: str):
    if negotiation_id not in db["negotiations"]:
        raise HTTPException(status_code=404, detail="Negotiation session not found")
    return {"success": True, "data": db["negotiations"][negotiation_id]}

@app.post("/api/negotiations", status_code=status.HTTP_201_CREATED)
def start_negotiation(data: NegotiationCreate):
    buyer = db["buyers"].get(data.buyerId)
    produce = db["produce"].get(data.produceId)
    if not buyer or not produce:
        raise HTTPException(status_code=400, detail="Invalid buyer or produce ID")

    neg_id = f"NEG-{uuid.uuid4().hex[:5].upper()}"
    now = datetime.now().isoformat()
    new_neg = {
        "id": neg_id,
        "farmerId": produce.get("farmerId", "FARMER-MH-4291"),
        "buyerId": data.buyerId,
        "buyerName": buyer["name"],
        "produceId": data.produceId,
        "cropName": produce["cropName"],
        "offeredQuantity": data.offeredQuantity,
        "farmerPrice": data.farmerPrice,
        "buyerPrice": buyer.get("offeredPrice", data.farmerPrice * 0.95),
        "finalPrice": None,
        "status": "NEGOTIATING",
        "messages": [
            {
                "id": f"MSG-{uuid.uuid4().hex[:4]}",
                "senderRole": "farmer",
                "senderName": "Farmer (You)",
                "message": f"Hello {buyer['name']}, I have {data.offeredQuantity} Quintals of {produce['cropName']} available. My asking price is ₹{data.farmerPrice}/Qtl.",
                "offerPrice": data.farmerPrice,
                "offerQuantity": data.offeredQuantity,
                "createdAt": now
            },
            {
                "id": f"MSG-{uuid.uuid4().hex[:4]}",
                "senderRole": "buyer",
                "senderName": buyer["name"],
                "message": f"Greetings! We are interested in your lot. We counter-offer ₹{buyer.get('offeredPrice', data.farmerPrice * 0.95)}/Qtl for prompt delivery.",
                "offerPrice": buyer.get("offeredPrice", data.farmerPrice * 0.95),
                "offerQuantity": data.offeredQuantity,
                "createdAt": now
            }
        ],
        "createdAt": now,
        "updatedAt": now
    }
    db["negotiations"][neg_id] = new_neg
    # Update produce status
    produce["status"] = "IN_NEGOTIATION"
    return {"success": True, "message": "Negotiation deal room initiated", "data": new_neg}

@app.post("/api/negotiations/{negotiation_id}/offer")
def make_offer(negotiation_id: str, offer: OfferRequest):
    if negotiation_id not in db["negotiations"]:
        raise HTTPException(status_code=404, detail="Negotiation not found")
    neg = db["negotiations"][negotiation_id]
    
    msg_id = f"MSG-{uuid.uuid4().hex[:4]}"
    now = datetime.now().isoformat()
    msg = {
        "id": msg_id,
        "senderRole": "farmer",
        "senderName": "Farmer (You)",
        "message": offer.message or f"Counter-offer: ₹{offer.price}/Qtl for {offer.quantity} Qtl",
        "offerPrice": offer.price,
        "offerQuantity": offer.quantity,
        "createdAt": now
    }
    neg["messages"].append(msg)
    neg["farmerPrice"] = offer.price
    neg["offeredQuantity"] = offer.quantity
    neg["status"] = "COUNTER_OFFER"
    neg["updatedAt"] = now
    return {"success": True, "message": "Offer sent", "data": neg}

@app.post("/api/negotiations/{negotiation_id}/accept")
def accept_deal(negotiation_id: str):
    if negotiation_id not in db["negotiations"]:
        raise HTTPException(status_code=404, detail="Negotiation not found")
    neg = db["negotiations"][negotiation_id]
    # Lock the final agreed price
    agreed_price = neg.get("buyerPrice") or neg.get("farmerPrice")
    neg["finalPrice"] = agreed_price
    neg["status"] = "DEAL_CONFIRMED"
    now = datetime.now().isoformat()
    neg["messages"].append({
        "id": f"MSG-{uuid.uuid4().hex[:4]}",
        "senderRole": "system",
        "senderName": "KrishiMitra Settlement Bot",
        "message": f"🎉 Deal confirmed! Agreed price: ₹{agreed_price:,.0f}/Quintal for {neg['offeredQuantity']} Quintals. Proceeding to in-app payment lock.",
        "offerPrice": agreed_price,
        "offerQuantity": neg["offeredQuantity"],
        "createdAt": now
    })
    neg["updatedAt"] = now
    return {"success": True, "message": "Deal confirmed! Ready for payment.", "data": neg}

@app.post("/api/negotiations/{negotiation_id}/reject")
def reject_deal(negotiation_id: str):
    if negotiation_id not in db["negotiations"]:
        raise HTTPException(status_code=404, detail="Negotiation not found")
    neg = db["negotiations"][negotiation_id]
    neg["status"] = "DEAL_REJECTED"
    now = datetime.now().isoformat()
    neg["messages"].append({
        "id": f"MSG-{uuid.uuid4().hex[:4]}",
        "senderRole": "farmer",
        "senderName": "Farmer (You)",
        "message": "Offer rejected.",
        "createdAt": now
    })
    neg["updatedAt"] = now
    return {"success": True, "message": "Deal rejected", "data": neg}


# ---------------- IN-APP PAYMENTS (PRD Section 14) ----------------
@app.post("/api/payments/create")
def create_payment(data: PaymentCreate):
    neg = db["negotiations"].get(data.negotiationId)
    if not neg:
        raise HTTPException(status_code=404, detail="Negotiation not found")
    if neg["status"] != "DEAL_CONFIRMED":
        raise HTTPException(status_code=400, detail="Deal must be confirmed before creating payment")

    final_price = neg.get("finalPrice", neg.get("farmerPrice", 2300.0))
    qty = neg["offeredQuantity"]
    total_amount = float(final_price * qty)

    payment_id = f"PAY-{uuid.uuid4().hex[:6].upper()}"
    sale_id = f"SALE-{uuid.uuid4().hex[:5].upper()}"
    txn_id = f"AGRI-TXN-2026-{uuid.uuid4().hex[:8].upper()}"
    receipt_no = f"REC-AS-{uuid.uuid4().hex[:6].upper()}"
    now = datetime.now().isoformat()

    payment_obj = {
        "id": payment_id,
        "saleId": sale_id,
        "negotiationId": data.negotiationId,
        "farmerId": neg["farmerId"],
        "buyerId": neg["buyerId"],
        "cropName": neg["cropName"],
        "quantity": qty,
        "agreedPrice": final_price,
        "amount": total_amount,
        "currency": "INR",
        "paymentMethod": data.paymentMethod,
        "paymentStatus": "SUCCESS",  # Simulated successful escrow settlement
        "transactionId": txn_id,
        "receiptNumber": receipt_no,
        "paidAt": now,
        "createdAt": now
    }
    db["payments"][payment_id] = payment_obj

    # Create corresponding Sale Record in ledger
    sale_obj = {
        "id": sale_id,
        "farmerId": neg["farmerId"],
        "produceId": neg["produceId"],
        "buyerId": neg["buyerId"],
        "buyerName": neg["buyerName"],
        "crop": neg["cropName"],
        "quantity": qty,
        "agreedPrice": final_price,
        "saleAmount": total_amount,
        "saleDate": datetime.now().strftime("%Y-%m-%d"),
        "paymentStatus": "PAID",
        "paymentMethod": data.paymentMethod,
        "transactionId": txn_id,
        "status": "COMPLETED",
        "receiptUrl": f"/receipt/{payment_id}"
    }
    db["sales"][sale_id] = sale_obj

    # Mark produce as SOLD
    if neg["produceId"] in db["produce"]:
        db["produce"][neg["produceId"]]["status"] = "SOLD"

    return {"success": True, "message": "Payment processed successfully", "data": payment_obj}

@app.get("/api/payments/{payment_id}")
def get_payment(payment_id: str):
    if payment_id not in db["payments"]:
        raise HTTPException(status_code=404, detail="Payment record not found")
    return {"success": True, "data": db["payments"][payment_id]}


# ---------------- SALES & FARMER RECORDS (PRD Section 12 & 15) ----------------
@app.get("/api/sales")
def get_sales():
    return {"success": True, "count": len(db["sales"]), "data": list(db["sales"].values())}

@app.get("/api/farmer/records")
def get_farmer_records():
    # Return unified farmer passbook view
    produce_items = list(db["produce"].values())
    sales_items = list(db["sales"].values())
    total_sales_value = sum(s.get("saleAmount", 0) for s in sales_items if s.get("paymentStatus") == "PAID")
    total_produce_qty = sum(p.get("quantity", 0) for p in produce_items)

    return {
        "success": True,
        "farmer": db["farmers"].get(current_farmer_mobile, INITIAL_FARMER),
        "summary": {
            "totalProduceCount": len(produce_items),
            "totalQuantityQuintals": total_produce_qty,
            "completedSalesCount": len(sales_items),
            "totalRevenueEarned": total_sales_value
        },
        "produceRecords": produce_items,
        "salesRecords": sales_items
    }


# ---------------- FEEDBACK (PRD Section 16) ----------------
@app.post("/api/feedback", status_code=status.HTTP_201_CREATED)
def submit_feedback(data: FeedbackCreate):
    fb_id = f"FB-{uuid.uuid4().hex[:5].upper()}"
    farmer = db["farmers"].get(current_farmer_mobile, INITIAL_FARMER)
    new_fb = {
        "id": fb_id,
        "farmerId": farmer.get("id", "FARMER-MH-4291"),
        "targetId": data.targetId,
        "targetType": data.targetType,
        "rating": data.rating,
        "comment": data.comment,
        "createdAt": datetime.now().isoformat()
    }
    db["feedback"][fb_id] = new_fb
    return {"success": True, "message": "Feedback submitted successfully. Thank you for empowering the farming community!", "data": new_fb}

@app.get("/api/feedback/{target_id}")
def get_target_feedback(target_id: str):
    matched = [f for f in db["feedback"].values() if f["targetId"] == target_id]
    return {"success": True, "count": len(matched), "data": matched}
