from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# --- Farmer & Auth ---
class FarmerRegister(BaseModel):
    name: str
    mobile: str
    location: str
    language: Optional[str] = "en"
    state: Optional[str] = "Maharashtra"
    district: Optional[str] = "Nashik"
    password: Optional[str] = "123456"

class FarmerLogin(BaseModel):
    mobile: str
    password: Optional[str] = "123456"

class Farmer(BaseModel):
    id: str
    name: str
    mobile: str
    location: str
    language: str = "en"
    state: str = "Maharashtra"
    district: str = "Nashik"
    createdAt: str
    updatedAt: str

# --- Produce ---
class ProduceCreate(BaseModel):
    cropName: str
    quantity: float
    quality: str = "Grade A"
    harvestDate: str
    location: str
    askingPrice: Optional[float] = 0.0
    photoUrl: Optional[str] = ""
    variety: Optional[str] = ""

class Produce(BaseModel):
    id: str
    farmerId: str
    cropName: str
    quantity: float
    quality: str
    harvestDate: str
    location: str
    askingPrice: float
    photoUrl: str
    variety: str = ""
    status: str = "ACTIVE"  # ACTIVE, IN_NEGOTIATION, SOLD, STORED
    createdAt: str
    updatedAt: str

# --- Market Price ---
class MarketPrice(BaseModel):
    id: str
    cropName: str
    marketName: str
    district: str
    state: str
    minPrice: float
    modalPrice: float
    maxPrice: float
    unit: str = "₹/Quintal"
    trend: str = "UP"  # UP, DOWN, STABLE
    updatedAt: str

# --- Facility ---
class Facility(BaseModel):
    id: str
    name: str
    type: str  # storage, processing, collection
    location: str
    distance: float
    latitude: float
    longitude: float
    address: str
    contact: str
    capacity: str
    availableCapacity: str
    supportedCrops: List[str]
    rate: str

# --- Buyer ---
class Buyer(BaseModel):
    id: str
    name: str
    companyType: str  # FPO, Wholesaler, Processor, Retailer
    crop: str
    requiredQuantity: float
    offeredPrice: float
    location: str
    distance: float
    contact: str
    verified: bool = True
    rating: float = 4.8
    status: str = "ACTIVE"

# --- Transport ---
class Transport(BaseModel):
    id: str
    providerName: str
    vehicleType: str  # Mini Truck (Bolero/Ace), Medium Lorry (6-Wheeler), Reefer Cold Van, Tractor Trolley
    capacity: str
    pricePerKm: float
    contact: str
    location: str
    distance: float
    availability: str = "AVAILABLE"  # AVAILABLE, BUSY

# --- Recommendation ---
class RecommendationRequest(BaseModel):
    produceId: str

class RecommendationResponse(BaseModel):
    produceId: str
    cropName: str
    recommendation: str  # SELL_NOW, STORE, PROCESS
    recommendationTitle: str
    confidence: float
    reason: str
    marketComparison: dict
    storageOption: Optional[dict] = None
    processingOption: Optional[dict] = None
    options: List[str]

# --- Negotiation ---
class NegotiationMessage(BaseModel):
    id: str
    senderRole: str  # farmer, buyer
    senderName: str
    message: str
    offerPrice: Optional[float] = None
    offerQuantity: Optional[float] = None
    createdAt: str

class NegotiationCreate(BaseModel):
    buyerId: str
    produceId: str
    offeredQuantity: float
    farmerPrice: float

class OfferRequest(BaseModel):
    price: float
    quantity: float
    message: Optional[str] = ""

class Negotiation(BaseModel):
    id: str
    farmerId: str
    buyerId: str
    buyerName: str
    produceId: str
    cropName: str
    offeredQuantity: float
    farmerPrice: float
    buyerPrice: float
    finalPrice: Optional[float] = None
    status: str  # NEGOTIATING, OFFER_SENT, COUNTER_OFFER, DEAL_CONFIRMED, DEAL_REJECTED
    messages: List[NegotiationMessage] = []
    createdAt: str
    updatedAt: str

# --- Payment ---
class PaymentCreate(BaseModel):
    negotiationId: str
    paymentMethod: str = "UPI"  # UPI, NET_BANKING, ESCROW, DIRECT_TRANSFER

class Payment(BaseModel):
    id: str
    saleId: str
    negotiationId: str
    farmerId: str
    buyerId: str
    cropName: str
    quantity: float
    agreedPrice: float
    amount: float
    currency: str = "INR"
    paymentMethod: str
    paymentStatus: str  # PENDING, PROCESSING, SUCCESS, FAILED
    transactionId: str
    receiptNumber: str
    paidAt: str
    createdAt: str

# --- Sale Record ---
class SaleRecord(BaseModel):
    id: str
    farmerId: str
    produceId: str
    buyerId: str
    buyerName: str
    crop: str
    quantity: float
    agreedPrice: float
    saleAmount: float
    saleDate: str
    paymentStatus: str
    paymentMethod: str
    transactionId: str
    status: str = "COMPLETED"  # DEAL_CONFIRMED, PAID, COMPLETED
    receiptUrl: Optional[str] = None

# --- Feedback ---
class FeedbackCreate(BaseModel):
    targetId: str
    targetType: str  # buyer, facility, transport
    rating: int = Field(ge=1, le=5)
    comment: str

class Feedback(BaseModel):
    id: str
    farmerId: str
    targetId: str
    targetType: str
    rating: int
    comment: str
    createdAt: str
