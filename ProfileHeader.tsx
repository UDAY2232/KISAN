import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Globe, Calendar, Shield, Edit3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ImageCropper from './ImageCropper';

export default function ProfileHeader() {
  const { state } = useAuth();
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!state.user) return null;

  const { user } = state;

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setShowImageCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCrop = (croppedImage: string) => {
    // In a real app, upload the cropped image to server
    console.log('Cropped image:', croppedImage);
    setShowImageCropper(false);
    setSelectedImage(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <button className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-opacity-30 transition-colors">
            <Camera className="h-5 w-5" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold">
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                )}
              </div>
              <label className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition-colors">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1 mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    {user.firstName} {user.lastName}
                    {user.isVerified && (
                      <Shield className="h-5 w-5 text-blue-500 ml-2" />
                    )}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="capitalize bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                      {user.role}
                    </span>
                  </div>
                </div>
                <button className="mt-4 sm:mt-0 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>

              {/* Bio */}
              {user.bio && (
                <p className="mt-4 text-gray-700 dark:text-gray-300">{user.bio}</p>
              )}

              {/* Details */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                {user.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {user.location}
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700"
                    >
                      {user.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Image Cropper Modal */}
      {showImageCropper && selectedImage && (
        <ImageCropper
          image={selectedImage}
          onCrop={handleImageCrop}
          onCancel={() => {
            setShowImageCropper(false);
            setSelectedImage(null);
          }}
        />
      )}
    </>
  );
}