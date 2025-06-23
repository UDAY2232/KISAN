import React from 'react';
import { MapPin, Calendar, Award } from 'lucide-react';
import { Crop } from '../types';

interface CropCardProps {
  crop: Crop;
  onContact?: () => void;
}

export default function CropCard({ crop, onContact }: CropCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full h-48 object-cover"
        />
        {crop.organic && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
            <Award className="h-3 w-3 mr-1" />
            Organic
          </div>
        )}
        {!crop.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Sold Out</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{crop.name}</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {crop.variety}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{crop.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {crop.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            Harvested: {new Date(crop.harvestDate).toLocaleDateString()}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-green-600">
              ${crop.pricePerUnit}
            </span>
            <span className="text-gray-500 ml-1">per {crop.unit}</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Available</p>
            <p className="font-semibold">{crop.quantity} {crop.unit}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">by {crop.farmer}</span>
          <button
            onClick={onContact}
            disabled={!crop.available}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              crop.available
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {crop.available ? 'Contact Seller' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}