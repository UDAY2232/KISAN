import React, { useState, useMemo } from 'react';
import CropCard from '../components/CropCard';
import FilterBar from '../components/FilterBar';
import { mockCrops } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Plus } from 'lucide-react';

export default function Crops() {
  const { state } = useApp();
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { value: 'all', label: 'All Crops' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'grains', label: 'Grains' },
    { value: 'organic', label: 'Organic Only' },
  ];

  const filteredCrops = useMemo(() => {
    let filtered = mockCrops.filter(crop => {
      const matchesCategory = selectedCategory === 'all' || 
                             (selectedCategory === 'organic' && crop.organic) ||
                             crop.name.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch = crop.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                           crop.variety.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                           crop.location.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort crops
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
        break;
      case 'quantity':
        filtered.sort((a, b) => b.quantity - a.quantity);
        break;
      case 'harvest-date':
        filtered.sort((a, b) => new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime());
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [selectedCategory, state.searchQuery, sortBy]);

  const handleContact = (cropId: string) => {
    // In a real app, this would open a contact modal or redirect to messaging
    alert('Contact functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fresh Crops Marketplace</h1>
            <p className="text-gray-600">
              Connect directly with farmers and get the freshest produce at competitive prices.
            </p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            List Your Crop
          </button>
        </div>

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {filteredCrops.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No crops found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredCrops.length} crop{filteredCrops.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCrops.map((crop) => (
                <CropCard 
                  key={crop.id} 
                  crop={crop} 
                  onContact={() => handleContact(crop.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}