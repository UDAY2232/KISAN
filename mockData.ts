import { Product, Crop, Disease } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium NPK Fertilizer',
    description: 'High-quality balanced fertilizer with 15-15-15 NPK ratio. Perfect for all crop types during growth phase.',
    price: 45.99,
    category: 'fertilizer',
    image: 'https://images.pexels.com/photos/4022091/pexels-photo-4022091.jpeg',
    supplier: 'AgriCorp Solutions',
    inStock: true,
    rating: 4.8,
    reviews: 124,
    bulkDiscount: { minQuantity: 10, discountPercent: 15 }
  },
  {
    id: '2',
    name: 'Organic Pest Control Spray',
    description: 'Eco-friendly pesticide made from natural ingredients. Safe for organic farming and beneficial insects.',
    price: 28.50,
    category: 'pesticide',
    image: 'https://images.pexels.com/photos/4022120/pexels-photo-4022120.jpeg',
    supplier: 'Green Solutions Ltd',
    inStock: true,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Hybrid Corn Seeds',
    description: 'High-yield hybrid corn variety with excellent disease resistance and drought tolerance.',
    price: 85.00,
    category: 'seeds',
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg',
    supplier: 'Seeds & More',
    inStock: true,
    rating: 4.9,
    reviews: 156,
    bulkDiscount: { minQuantity: 5, discountPercent: 20 }
  },
  {
    id: '4',
    name: 'Professional Pruning Shears',
    description: 'Heavy-duty pruning shears with titanium coating for long-lasting sharpness and durability.',
    price: 34.99,
    category: 'tools',
    image: 'https://images.pexels.com/photos/1301868/pexels-photo-1301868.jpeg',
    supplier: 'Farm Tools Pro',
    inStock: true,
    rating: 4.7,
    reviews: 73,
  },
  {
    id: '5',
    name: 'Advanced Drip Irrigation Kit',
    description: 'Complete irrigation system for efficient water management. Covers up to 1000 sq ft.',
    price: 299.99,
    category: 'equipment',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    supplier: 'Irrigation Systems Inc',
    inStock: true,
    rating: 4.5,
    reviews: 45,
  },
  {
    id: '6',
    name: 'Calcium Chloride Foliar Spray',
    description: 'Essential calcium supplement for preventing blossom end rot and improving fruit quality.',
    price: 19.99,
    category: 'fertilizer',
    image: 'https://images.pexels.com/photos/4022135/pexels-photo-4022135.jpeg',
    supplier: 'NutriGrow',
    inStock: true,
    rating: 4.4,
    reviews: 67,
  }
];

export const mockCrops: Crop[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    variety: 'Roma',
    quantity: 500,
    unit: 'kg',
    pricePerUnit: 3.50,
    description: 'Fresh organic Roma tomatoes, perfect for processing and cooking. Grown without pesticides.',
    harvestDate: '2024-01-15',
    location: 'California Central Valley',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    farmer: 'Green Valley Farms',
    organic: true,
    available: true,
  },
  {
    id: '2',
    name: 'Sweet Corn',
    variety: 'Golden Bantam',
    quantity: 1000,
    unit: 'kg',
    pricePerUnit: 2.80,
    description: 'Premium sweet corn with excellent flavor. Harvested at peak sweetness for maximum quality.',
    harvestDate: '2024-01-20',
    location: 'Iowa Farmlands',
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg',
    farmer: 'Sunshine Agriculture',
    organic: false,
    available: true,
  },
  {
    id: '3',
    name: 'Organic Lettuce',
    variety: 'Butterhead',
    quantity: 200,
    unit: 'kg',
    pricePerUnit: 4.20,
    description: 'Crisp and fresh organic butterhead lettuce. Perfect for salads and sandwiches.',
    harvestDate: '2024-01-18',
    location: 'Oregon Coast',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg',
    farmer: 'Coastal Organics',
    organic: true,
    available: true,
  }
];

export const mockDiseases: Disease[] = [
  {
    id: '1',
    name: 'Tomato Blight',
    description: 'A serious fungal disease that affects tomato plants, causing leaf spots and fruit rot.',
    symptoms: ['Dark spots on leaves', 'Yellowing foliage', 'Brown patches on fruit', 'Stem lesions'],
    affectedCrops: ['Tomatoes', 'Potatoes', 'Peppers'],
    treatments: [
      {
        id: 't1',
        name: 'Copper Fungicide Treatment',
        type: 'chemical',
        description: 'Effective copper-based fungicide for controlling blight',
        applicationMethod: 'Foliar spray',
        dosage: '2-3 ml per liter of water',
        products: [mockProducts[1]]
      }
    ],
    prevention: ['Proper spacing for air circulation', 'Avoid overhead watering', 'Crop rotation', 'Remove infected debris'],
    image: 'https://images.pexels.com/photos/4022064/pexels-photo-4022064.jpeg'
  },
  {
    id: '2',
    name: 'Corn Smut',
    description: 'Fungal disease causing galls on corn ears, leaves, and stalks.',
    symptoms: ['Gray-black galls on ears', 'Distorted plant growth', 'Reduced yield'],
    affectedCrops: ['Corn', 'Sweet Corn'],
    treatments: [
      {
        id: 't2',
        name: 'Preventive Fungicide',
        type: 'chemical',
        description: 'Systemic fungicide for corn smut prevention',
        applicationMethod: 'Soil application',
        dosage: '5 kg per hectare',
        products: [mockProducts[0]]
      }
    ],
    prevention: ['Use resistant varieties', 'Avoid plant injuries', 'Control insects that spread disease'],
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg'
  }
];