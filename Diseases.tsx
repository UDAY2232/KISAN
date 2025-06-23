import React, { useState, useMemo } from 'react';
import DiseaseCard from '../components/DiseaseCard';
import { mockDiseases } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Search, BookOpen } from 'lucide-react';

export default function Diseases() {
  const { state } = useApp();
  const [selectedCrop, setSelectedCrop] = useState('all');
  
  const affectedCrops = ['all', ...new Set(mockDiseases.flatMap(d => d.affectedCrops))];

  const filteredDiseases = useMemo(() => {
    return mockDiseases.filter(disease => {
      const matchesCrop = selectedCrop === 'all' || disease.affectedCrops.includes(selectedCrop);
      const matchesSearch = disease.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                           disease.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                           disease.symptoms.some(symptom => 
                             symptom.toLowerCase().includes(state.searchQuery.toLowerCase())
                           );
      return matchesCrop && matchesSearch;
    });
  }, [selectedCrop, state.searchQuery]);

  const handleLearnMore = (diseaseId: string) => {
    // In a real app, this would navigate to a detailed disease page
    alert(`Disease details page for disease ${diseaseId} would open here`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Disease Management Center</h1>
          <p className="text-gray-600">
            Expert guidance and solutions for identifying, treating, and preventing crop diseases.
          </p>
        </div>

        {/* Quick Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <BookOpen className="h-6 w-6 text-blue-600 mt-1 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Prevention Tips</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Maintain proper plant spacing for good air circulation</li>
                <li>• Practice crop rotation to break disease cycles</li>
                <li>• Remove and destroy infected plant debris</li>
                <li>• Use disease-resistant varieties when available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Search className="h-5 w-5 text-gray-500" />
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Filter by crop:</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {affectedCrops.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop === 'all' ? 'All Crops' : crop}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredDiseases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No diseases found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredDiseases.length} disease{filteredDiseases.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDiseases.map((disease) => (
                <DiseaseCard 
                  key={disease.id} 
                  disease={disease} 
                  onLearnMore={() => handleLearnMore(disease.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* Emergency Contact */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Need Immediate Help?</h3>
          <p className="text-red-800 mb-4">
            If you're dealing with a severe crop disease outbreak, contact our expert agricultural consultants immediately.
          </p>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
            Contact Expert Now
          </button>
        </div>
      </div>
    </div>
  );
}