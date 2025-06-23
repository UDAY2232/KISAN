import React from 'react';
import { AlertTriangle, Leaf, Shield } from 'lucide-react';
import { Disease } from '../types';

interface DiseaseCardProps {
  disease: Disease;
  onLearnMore?: () => void;
}

export default function DiseaseCard({ disease, onLearnMore }: DiseaseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={disease.image}
          alt={disease.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Disease
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{disease.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{disease.description}</p>
        
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex items-center mb-1">
              <Leaf className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Affected Crops</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {disease.affectedCrops.slice(0, 3).map((crop, index) => (
                <span
                  key={index}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                >
                  {crop}
                </span>
              ))}
              {disease.affectedCrops.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{disease.affectedCrops.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-1">
              <AlertTriangle className="h-4 w-4 text-orange-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Key Symptoms</span>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              {disease.symptoms.slice(0, 2).map((symptom, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Shield className="h-4 w-4 mr-1" />
            {disease.treatments.length} treatment{disease.treatments.length !== 1 ? 's' : ''}
          </div>
          <button
            onClick={onLearnMore}
            className="bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}