import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";

// Pages
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddProduce from "./pages/AddProduce";
import MarketPrice from "./pages/MarketPrice";
import Facilities from "./pages/Facilities";
import Buyers from "./pages/Buyers";
import Recommendation from "./pages/Recommendation";
import NegotiationDealRoom from "./pages/NegotiationDealRoom";
import Payment from "./pages/Payment";
import Transport from "./pages/Transport";
import Records from "./pages/Records";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";

import { translations } from "./i18n/translations";
import { api } from "./services/api";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentLang, setCurrentLang] = useState("en");
  const [fontSize, setFontSize] = useState("md");

  // State entities
  const [farmer, setFarmer] = useState(null);
  const [produceList, setProduceList] = useState([]);
  const [marketPrices, setMarketPrices] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [transportList, setTransportList] = useState([]);
  const [negotiations, setNegotiations] = useState([]);
  const [activeNegotiation, setActiveNegotiation] = useState(null);
  const [salesList, setSalesList] = useState([]);
  const [selectedProduceId, setSelectedProduceId] = useState("PROD-101");

  const t = translations[currentLang] || translations.en;

  // Font scaling handler
  const handleFontSizeChange = (size) => {
    setFontSize(size);
    document.documentElement.classList.remove("font-scale-sm", "font-scale-md", "font-scale-lg");
    document.documentElement.classList.add(`font-scale-${size}`);
  };

  // Initial load
  useEffect(() => {
    handleFontSizeChange("md");

    // Fetch initial data
    api.getCurrentUser().then(data => setFarmer(data));
    api.getProduce().then(data => setProduceList(data));
    api.getMarketPrices().then(data => setMarketPrices(data));
    api.getFacilities().then(data => setFacilities(data));
    api.getBuyers().then(data => setBuyers(data));
    api.getTransport().then(data => setTransportList(data));
    api.getNegotiations().then(data => {
      setNegotiations(data);
      if (data && data.length > 0) {
        setActiveNegotiation(data[0]);
      }
    });
    api.getFarmerRecords().then(res => {
      if (res.salesRecords) setSalesList(res.salesRecords);
    });
  }, []);

  // Handlers
  const handleLoginSuccess = (farmerObj) => {
    setFarmer(farmerObj);
    setActiveTab("dashboard");
  };

  const handleLogout = () => {
    setFarmer(null);
    setActiveTab("login");
  };

  const handleAddProduceSuccess = (newProduce) => {
    api.addProduce(newProduce).then((saved) => {
      setProduceList(prev => [saved, ...prev]);
      setSelectedProduceId(saved.id);
    });
  };

  const handleStartDeal = (buyer, produce) => {
    const qty = produce?.quantity || 100;
    const price = produce?.askingPrice || buyer.offeredPrice;
    
    api.startNegotiation(buyer.id, produce?.id || "PROD-101", qty, price).then((newNeg) => {
      setNegotiations(prev => [newNeg, ...prev]);
      setActiveNegotiation(newNeg);
      setActiveTab("deal-room");
    });
  };

  const handleSendCounter = (negId, price, quantity, message) => {
    api.sendCounterOffer(negId, price, quantity, message).then((updated) => {
      if (updated) {
        setActiveNegotiation(updated);
        setNegotiations(prev => prev.map(n => n.id === updated.id ? updated : n));
      } else {
        // Fallback local update
        setActiveNegotiation(prev => {
          if (!prev) return prev;
          const updatedNeg = {
            ...prev,
            farmerPrice: price,
            offeredQuantity: quantity,
            status: "COUNTER_OFFER",
            messages: [
              ...prev.messages,
              {
                id: `MSG-${Date.now()}`,
                senderRole: "farmer",
                senderName: "Farmer (You)",
                message: message || `Counter-offer: ₹${price}/Qtl for ${quantity} Qtl`,
                offerPrice: price,
                offerQuantity: quantity,
                createdAt: new Date().toISOString()
              }
            ]
          };
          return updatedNeg;
        });
      }
    });
  };

  const handleAcceptDeal = (negId) => {
    api.acceptDeal(negId).then((updated) => {
      if (updated) {
        setActiveNegotiation(updated);
        setNegotiations(prev => prev.map(n => n.id === updated.id ? updated : n));
      } else {
        setActiveNegotiation(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            finalPrice: prev.buyerPrice,
            status: "DEAL_CONFIRMED"
          };
        });
      }
    });
  };

  const handleRejectDeal = (negId) => {
    api.rejectDeal(negId).then((updated) => {
      if (updated) {
        setActiveNegotiation(updated);
        setNegotiations(prev => prev.map(n => n.id === updated.id ? updated : n));
      } else {
        setActiveNegotiation(prev => prev ? { ...prev, status: "DEAL_REJECTED" } : prev);
      }
    });
  };

  const handleProceedToPayment = (neg) => {
    setActiveNegotiation(neg);
    setActiveTab("payment");
  };

  const handlePaymentSuccess = (paymentData) => {
    const newSale = {
      id: paymentData.saleId,
      farmerId: farmer?.id || "FARMER-MH-4291",
      produceId: activeNegotiation?.produceId || "PROD-101",
      buyerId: activeNegotiation?.buyerId || "BUY-01",
      buyerName: activeNegotiation?.buyerName || "MahaAgro Kisan Producer Company",
      crop: paymentData.cropName,
      quantity: paymentData.quantity,
      agreedPrice: paymentData.agreedPrice,
      saleAmount: paymentData.amount,
      saleDate: new Date().toISOString().split("T")[0],
      paymentStatus: "PAID",
      paymentMethod: paymentData.paymentMethod,
      transactionId: paymentData.transactionId,
      status: "COMPLETED",
      receiptUrl: `#`
    };

    setSalesList(prev => [newSale, ...prev]);

    // Update produce status to SOLD
    if (activeNegotiation?.produceId) {
      setProduceList(prev => prev.map(p => {
        if (p.id === activeNegotiation.produceId) {
          return { ...p, status: "SOLD" };
        }
        return p;
      }));
    }
  };

  const handleSelectProduceForAdvisory = (produceId) => {
    setSelectedProduceId(produceId);
    setActiveTab("recommendation");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 1. Header with Government Utility Bar & Navigation */}
      <Header 
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        farmer={farmer}
        t={t}
      />

      {/* 2. Main Page Container */}
      <main className="gov-main-content">
        <div className="gov-container">
          {activeTab === "welcome" && (
            <Welcome 
              t={t} 
              onTabChange={setActiveTab}
              onLangChange={setCurrentLang}
              currentLang={currentLang}
            />
          )}

          {activeTab === "login" && (
            <Login 
              onLoginSuccess={handleLoginSuccess}
              t={t}
            />
          )}

          {activeTab === "dashboard" && (
            <Dashboard 
              farmer={farmer}
              produceList={produceList}
              onTabChange={setActiveTab}
              onSelectProduceForAdvisory={handleSelectProduceForAdvisory}
              t={t}
            />
          )}

          {activeTab === "add-produce" && (
            <AddProduce 
              onAddProduceSuccess={handleAddProduceSuccess}
              onTabChange={setActiveTab}
              farmer={farmer}
              t={t}
            />
          )}

          {activeTab === "prices" && (
            <MarketPrice 
              marketPrices={marketPrices}
              t={t}
            />
          )}

          {activeTab === "facilities" && (
            <Facilities 
              facilities={facilities}
              t={t}
            />
          )}

          {activeTab === "buyers" && (
            <Buyers 
              buyers={buyers}
              produceList={produceList}
              onStartDeal={handleStartDeal}
              onTabChange={setActiveTab}
              t={t}
            />
          )}

          {activeTab === "recommendation" && (
            <Recommendation 
              produceList={produceList}
              selectedProduceId={selectedProduceId}
              onSelectProduce={setSelectedProduceId}
              onTabChange={setActiveTab}
              t={t}
            />
          )}

          {activeTab === "deal-room" && (
            <NegotiationDealRoom 
              negotiation={activeNegotiation}
              onSendCounter={handleSendCounter}
              onAcceptDeal={handleAcceptDeal}
              onRejectDeal={handleRejectDeal}
              onProceedToPayment={handleProceedToPayment}
              t={t}
            />
          )}

          {activeTab === "payment" && (
            <Payment 
              negotiation={activeNegotiation}
              onPaymentSuccess={handlePaymentSuccess}
              onTabChange={setActiveTab}
              farmer={farmer}
              t={t}
            />
          )}

          {activeTab === "transport" && (
            <Transport 
              transportList={transportList}
              onTabChange={setActiveTab}
              t={t}
            />
          )}

          {activeTab === "records" && (
            <Records 
              produceList={produceList}
              salesList={salesList}
              farmer={farmer}
              t={t}
            />
          )}

          {activeTab === "feedback" && (
            <Feedback 
              facilities={facilities}
              buyers={buyers}
              t={t}
            />
          )}

          {activeTab === "profile" && (
            <Profile 
              farmer={farmer}
              onLogout={handleLogout}
              t={t}
            />
          )}
        </div>
      </main>

      {/* 3. Mobile Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        t={t}
      />

      {/* 4. Official Portal Footer */}
      <Footer 
        t={t}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
