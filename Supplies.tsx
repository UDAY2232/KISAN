import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import { mockProducts } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function Supplies() {
  const { state } = useApp();
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fertilizer', label: 'Fertilizers' },
    { value: 'pesticide', label: 'Pesticides' },
    { value: 'seeds', label: 'Seeds' },
    { value: 'tools', label: 'Tools' },
    { value: 'equipment', label: 'Equipment' },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [selectedCategory, state.searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agricultural Supplies</h1>
          <p className="text-gray-600">
            Premium quality farming supplies from trusted suppliers. Find everything you need for a successful harvest.
          </p>
        </div>

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}