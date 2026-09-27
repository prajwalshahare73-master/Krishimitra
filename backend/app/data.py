from datetime import datetime

# Sample realistic initial state for AgriSathi

INITIAL_FARMER = {
    "id": "FARMER-MH-4291",
    "name": "Ramesh Dattatray Patil",
    "mobile": "9822014589",
    "location": "Pimpalgaon Baswant, Niphad",
    "district": "Nashik",
    "state": "Maharashtra",
    "language": "en",
    "createdAt": "2026-03-15T09:00:00",
    "updatedAt": "2026-09-27T10:00:00"
}

INITIAL_PRODUCE = [
    {
        "id": "PROD-101",
        "farmerId": "FARMER-MH-4291",
        "cropName": "Tomato",
        "variety": "Abhinav (Hybrid)",
        "quantity": 120.0,  # Quintals
        "quality": "Grade A (Export Quality)",
        "harvestDate": "2026-09-22",
        "location": "Pimpalgaon, Nashik",
        "askingPrice": 2250.0,
        "photoUrl": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=60",
        "status": "ACTIVE",
        "createdAt": "2026-09-22T08:30:00",
        "updatedAt": "2026-09-22T08:30:00"
    },
    {
        "id": "PROD-102",
        "farmerId": "FARMER-MH-4291",
        "cropName": "Onion",
        "variety": "Gavran Red (Rabi)",
        "quantity": 350.0,
        "quality": "Grade A (Good Keeps)",
        "harvestDate": "2026-09-18",
        "location": "Lasalgaon, Nashik",
        "askingPrice": 2400.0,
        "photoUrl": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=60",
        "status": "ACTIVE",
        "createdAt": "2026-09-18T11:15:00",
        "updatedAt": "2026-09-18T11:15:00"
    },
    {
        "id": "PROD-103",
        "farmerId": "FARMER-MH-4291",
        "cropName": "Soybean",
        "variety": "JS-335",
        "quantity": 80.0,
        "quality": "Grade B (Standard 10% Moisture)",
        "harvestDate": "2026-09-10",
        "location": "Niphad, Nashik",
        "askingPrice": 4600.0,
        "photoUrl": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&auto=format&fit=crop&q=60",
        "status": "SOLD",
        "createdAt": "2026-09-10T14:00:00",
        "updatedAt": "2026-09-24T16:20:00"
    }
]

MARKET_PRICES = [
    {
        "id": "MKT-01",
        "cropName": "Tomato",
        "marketName": "Pimpalgaon APMC",
        "district": "Nashik",
        "state": "Maharashtra",
        "minPrice": 1800.0,
        "modalPrice": 2350.0,
        "maxPrice": 2600.0,
        "unit": "₹/Quintal",
        "trend": "UP",
        "updatedAt": "Today, 11:30 AM (Agmarknet Live)"
    },
    {
        "id": "MKT-02",
        "cropName": "Tomato",
        "marketName": "Nashik Main Mandi",
        "district": "Nashik",
        "state": "Maharashtra",
        "minPrice": 1750.0,
        "modalPrice": 2200.0,
        "maxPrice": 2450.0,
        "unit": "₹/Quintal",
        "trend": "STABLE",
        "updatedAt": "Today, 10:45 AM (Agmarknet Live)"
    },
    {
        "id": "MKT-03",
        "cropName": "Tomato",
        "marketName": "Vashi APMC (Navi Mumbai)",
        "district": "Thane",
        "state": "Maharashtra",
        "minPrice": 2200.0,
        "modalPrice": 2750.0,
        "maxPrice": 3100.0,
        "unit": "₹/Quintal",
        "trend": "UP",
        "updatedAt": "Today, 09:15 AM (e-NAM Daily)"
    },
    {
        "id": "MKT-04",
        "cropName": "Onion",
        "marketName": "Lasalgaon APMC (Asia's Largest)",
        "district": "Nashik",
        "state": "Maharashtra",
        "minPrice": 1900.0,
        "modalPrice": 2380.0,
        "maxPrice": 2750.0,
        "unit": "₹/Quintal",
        "trend": "UP",
        "updatedAt": "Today, 12:00 PM (e-NAM Daily)"
    },
    {
        "id": "MKT-05",
        "cropName": "Onion",
        "marketName": "Pimpalgaon APMC",
        "district": "Nashik",
        "state": "Maharashtra",
        "minPrice": 1850.0,
        "modalPrice": 2310.0,
        "maxPrice": 2680.0,
        "unit": "₹/Quintal",
        "trend": "STABLE",
        "updatedAt": "Today, 11:00 AM (Agmarknet Live)"
    },
    {
        "id": "MKT-06",
        "cropName": "Soybean",
        "marketName": "Latur APMC",
        "district": "Latur",
        "state": "Maharashtra",
        "minPrice": 4200.0,
        "modalPrice": 4680.0,
        "maxPrice": 4920.0,
        "unit": "₹/Quintal",
        "trend": "UP",
        "updatedAt": "Today, 10:30 AM (Agmarknet Live)"
    },
    {
        "id": "MKT-07",
        "cropName": "Wheat",
        "marketName": "Indore Mandi",
        "district": "Indore",
        "state": "Madhya Pradesh",
        "minPrice": 2350.0,
        "modalPrice": 2550.0,
        "maxPrice": 2800.0,
        "unit": "₹/Quintal",
        "trend": "STABLE",
        "updatedAt": "Today, 11:15 AM (Agmarknet Live)"
    },
    {
        "id": "MKT-08",
        "cropName": "Potato",
        "marketName": "Agra APMC",
        "district": "Agra",
        "state": "Uttar Pradesh",
        "minPrice": 1250.0,
        "modalPrice": 1450.0,
        "maxPrice": 1600.0,
        "unit": "₹/Quintal",
        "trend": "DOWN",
        "updatedAt": "Today, 09:45 AM (Agmarknet Live)"
    },
    {
        "id": "MKT-09",
        "cropName": "Cotton",
        "marketName": "Rajkot Mandi",
        "district": "Rajkot",
        "state": "Gujarat",
        "minPrice": 6900.0,
        "modalPrice": 7350.0,
        "maxPrice": 7650.0,
        "unit": "₹/Quintal",
        "trend": "UP",
        "updatedAt": "Today, 11:00 AM (e-NAM Daily)"
    }
]

FACILITIES = [
    {
        "id": "FAC-01",
        "name": "Sahyadri Agro Cold Storage & Packhouse",
        "type": "storage",
        "location": "Mohadi, Dindori Road, Nashik",
        "distance": 4.5,
        "latitude": 20.0821,
        "longitude": 73.8421,
        "address": "Gat No. 314, Mohadi Taluka Dindori, Nashik - 422207",
        "contact": "+91 98500 12345",
        "capacity": "5,000 MT",
        "availableCapacity": "1,200 MT available",
        "supportedCrops": ["Tomato", "Grapes", "Pomegranate", "Capsicum"],
        "rate": "₹85 / Quintal / Month (Subsidy under MIDH applicable)"
    },
    {
        "id": "FAC-02",
        "name": "Kisan Warehouse & Silo Depot (WDRA Reg.)",
        "type": "storage",
        "location": "Lasalgaon Road, Niphad",
        "distance": 8.2,
        "latitude": 20.0632,
        "longitude": 73.9854,
        "address": "Plot 12, MIDC Niphad, Dist. Nashik - 422303",
        "contact": "+91 94222 67890",
        "capacity": "12,000 MT",
        "availableCapacity": "3,800 MT available",
        "supportedCrops": ["Onion", "Soybean", "Wheat", "Maize"],
        "rate": "₹60 / Quintal / Month (e-NWR pledge finance eligible)"
    },
    {
        "id": "FAC-03",
        "name": "Godavari Food Processing & Pulping Cluster",
        "type": "processing",
        "location": "Pimpalgaon Baswant",
        "distance": 5.8,
        "latitude": 20.1742,
        "longitude": 73.9821,
        "address": "Agro Processing Zone, NH-3, Pimpalgaon - 422209",
        "contact": "+91 98230 44556",
        "capacity": "40 MT / Day processing",
        "availableCapacity": "Accepting fresh contract lots",
        "supportedCrops": ["Tomato", "Chilli", "Guava", "Mango"],
        "rate": "Buyback / Contract rate: ₹2,450 / Quintal net processed"
    },
    {
        "id": "FAC-04",
        "name": "Nashik Agro Bio-Extracts & Dehydration Unit",
        "type": "processing",
        "location": "Ambad MIDC, Nashik",
        "distance": 14.0,
        "latitude": 19.9542,
        "longitude": 73.7421,
        "address": "Sector W-8, Ambad Industrial Area, Nashik - 422010",
        "contact": "+91 97654 33221",
        "capacity": "25 MT / Day",
        "availableCapacity": "Onion flake & powder contract open",
        "supportedCrops": ["Onion", "Garlic", "Ginger"],
        "rate": "Contract procurement at ₹2,500 / Quintal for Grade A"
    },
    {
        "id": "FAC-05",
        "name": "NABARD Integrated Farmers Collection Hub",
        "type": "collection",
        "location": "Niphad Mandi Gate 2",
        "distance": 3.1,
        "latitude": 20.0712,
        "longitude": 73.9214,
        "address": "Near Niphad Railway Goods Shed, Niphad",
        "contact": "+91 94050 88990",
        "capacity": "Aggregating 50 MT Daily",
        "availableCapacity": "Daily weighbridge & grading open",
        "supportedCrops": ["All fresh vegetables & grains"],
        "rate": "Assay & Weighment: Free for e-NAM registered farmers"
    }
]

BUYERS = [
    {
        "id": "BUY-01",
        "name": "MahaAgro Kisan Producer Company (FPO)",
        "companyType": "FPO Consortium",
        "crop": "Tomato",
        "requiredQuantity": 200.0,
        "offeredPrice": 2350.0,
        "location": "Pimpalgaon / Mumbai Hub",
        "distance": 6.0,
        "contact": "+91 98221 55678",
        "verified": True,
        "rating": 4.9,
        "status": "ACTIVE"
    },
    {
        "id": "BUY-02",
        "name": "Keventer Fresh Retail Supply Chain",
        "companyType": "Organized Retailer",
        "crop": "Tomato",
        "requiredQuantity": 150.0,
        "offeredPrice": 2400.0,
        "location": "Vashi APMC Central Depot",
        "distance": 12.5,
        "contact": "+91 93240 11223",
        "verified": True,
        "rating": 4.8,
        "status": "ACTIVE"
    },
    {
        "id": "BUY-03",
        "name": "Deccan Agro Exports & Processing Ltd.",
        "companyType": "Exporter / Processor",
        "crop": "Onion",
        "requiredQuantity": 500.0,
        "offeredPrice": 2450.0,
        "location": "Lasalgaon Export Terminal",
        "distance": 9.0,
        "contact": "+91 98810 99887",
        "verified": True,
        "rating": 4.9,
        "status": "ACTIVE"
    },
    {
        "id": "BUY-04",
        "name": "Siddheshwar Grain & Oilseed Traders",
        "companyType": "Wholesaler",
        "crop": "Soybean",
        "requiredQuantity": 120.0,
        "offeredPrice": 4700.0,
        "location": "Niphad Yard",
        "distance": 4.0,
        "contact": "+91 94231 44332",
        "verified": True,
        "rating": 4.7,
        "status": "ACTIVE"
    },
    {
        "id": "BUY-05",
        "name": "Kisan Rath Direct Supply Group",
        "companyType": "Direct Consumer Co-op",
        "crop": "Tomato",
        "requiredQuantity": 80.0,
        "offeredPrice": 2300.0,
        "location": "Nashik City Centre",
        "distance": 15.0,
        "contact": "+91 98900 77665",
        "verified": True,
        "rating": 4.6,
        "status": "ACTIVE"
    }
]

TRANSPORTS = [
    {
        "id": "TRP-01",
        "providerName": "Krishi Rath Logistics (Balaji Transport)",
        "vehicleType": "Mini Truck (Bolero Pickup / Tata Ace)",
        "capacity": "2.5 Metric Tonnes",
        "pricePerKm": 18.0,
        "contact": "+91 98600 44112",
        "location": "Pimpalgaon Stand",
        "distance": 2.5,
        "availability": "AVAILABLE"
    },
    {
        "id": "TRP-02",
        "providerName": "Sheetal Cold Chain Express (Reefer)",
        "vehicleType": "Temperature Controlled Reefer Van",
        "capacity": "6.0 Metric Tonnes",
        "pricePerKm": 32.0,
        "contact": "+91 98212 99881",
        "location": "Dindori Road, Nashik",
        "distance": 6.8,
        "availability": "AVAILABLE"
    },
    {
        "id": "TRP-03",
        "providerName": "Jai Malhar Kisan Transport",
        "vehicleType": "Medium Lorry (6-Wheeler Eicher)",
        "capacity": "9.0 Metric Tonnes",
        "pricePerKm": 24.0,
        "contact": "+91 94220 77334",
        "location": "Lasalgaon Road, Niphad",
        "distance": 4.2,
        "availability": "AVAILABLE"
    },
    {
        "id": "TRP-04",
        "providerName": "Gramin Tractor Trolley Service",
        "vehicleType": "Tractor Trolley with Tarpaulin Cover",
        "capacity": "4.0 Metric Tonnes",
        "pricePerKm": 14.0,
        "contact": "+91 98902 33445",
        "location": "Niphad Village Gate",
        "distance": 1.2,
        "availability": "AVAILABLE"
    }
]

INITIAL_NEGOTIATIONS = [
    {
        "id": "NEG-901",
        "farmerId": "FARMER-MH-4291",
        "buyerId": "BUY-01",
        "buyerName": "MahaAgro Kisan Producer Company (FPO)",
        "produceId": "PROD-101",
        "cropName": "Tomato (Grade A)",
        "offeredQuantity": 100.0,
        "farmerPrice": 2350.0,
        "buyerPrice": 2280.0,
        "finalPrice": 2300.0,
        "status": "DEAL_CONFIRMED",
        "messages": [
            {
                "id": "MSG-01",
                "senderRole": "farmer",
                "senderName": "Ramesh Patil (Farmer)",
                "message": "Namaste, I have 100 Quintals of Grade A Abhinav hybrid tomatoes ready for harvest. Asking ₹2,350/Qtl.",
                "offerPrice": 2350.0,
                "offerQuantity": 100.0,
                "createdAt": "2026-09-26T10:15:00"
            },
            {
                "id": "MSG-02",
                "senderRole": "buyer",
                "senderName": "MahaAgro Procurement Team",
                "message": "We inspected the crop quality batch. We can procure the entire 100 Quintals at ₹2,280/Qtl with instant weighing.",
                "offerPrice": 2280.0,
                "offerQuantity": 100.0,
                "createdAt": "2026-09-26T11:00:00"
            },
            {
                "id": "MSG-03",
                "senderRole": "farmer",
                "senderName": "Ramesh Patil (Farmer)",
                "message": "Modal mandi price is ₹2,350. Let us settle fairly at ₹2,300/Qtl, farmgate pickup.",
                "offerPrice": 2300.0,
                "offerQuantity": 100.0,
                "createdAt": "2026-09-26T11:45:00"
            },
            {
                "id": "MSG-04",
                "senderRole": "buyer",
                "senderName": "MahaAgro Procurement Team",
                "message": "Agreed at ₹2,300/Qtl for 100 Quintals! Deal confirmed. Proceeding to digital payment escrow.",
                "offerPrice": 2300.0,
                "offerQuantity": 100.0,
                "createdAt": "2026-09-26T12:05:00"
            }
        ],
        "createdAt": "2026-09-26T10:15:00",
        "updatedAt": "2026-09-26T12:05:00"
    }
]

INITIAL_SALES = [
    {
        "id": "SALE-7701",
        "farmerId": "FARMER-MH-4291",
        "produceId": "PROD-103",
        "buyerId": "BUY-04",
        "buyerName": "Siddheshwar Grain & Oilseed Traders",
        "crop": "Soybean (JS-335)",
        "quantity": 80.0,
        "agreedPrice": 4650.0,
        "saleAmount": 372000.0,
        "saleDate": "2026-09-24",
        "paymentStatus": "PAID",
        "paymentMethod": "Direct Bank Settlement (DBT / RTGS)",
        "transactionId": "AGRI-DBT-9842189023",
        "status": "COMPLETED",
        "receiptUrl": "#"
    }
]

INITIAL_FEEDBACK = [
    {
        "id": "FB-01",
        "farmerId": "FARMER-MH-4291",
        "targetId": "FAC-01",
        "targetType": "facility",
        "rating": 5,
        "comment": "Very good cold storage pre-cooling setup. Minimal weight loss for my tomato consignment.",
        "createdAt": "2026-09-20T17:30:00"
    }
]
