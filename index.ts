export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'fertilizer' | 'pesticide' | 'seeds' | 'tools' | 'equipment';
  image: string;
  supplier: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  bulkDiscount?: {
    minQuantity: number;
    discountPercent: number;
  };
}

export interface Crop {
  id: string;
  name: string;
  variety: string;
  quantity: number;
  unit: 'kg' | 'tons' | 'bags';
  pricePerUnit: number;
  description: string;
  harvestDate: string;
  location: string;
  image: string;
  farmer: string;
  organic: boolean;
  available: boolean;
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  affectedCrops: string[];
  treatments: Treatment[];
  prevention: string[];
  image: string;
}

export interface Treatment {
  id: string;
  name: string;
  type: 'chemical' | 'organic' | 'biological';
  description: string;
  applicationMethod: string;
  dosage: string;
  products: Product[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  type: 'supply' | 'crop';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'buyer' | 'supplier';
  location: string;
  phone: string;
}