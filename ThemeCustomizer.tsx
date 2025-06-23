import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Type,
  Image,
  Sliders,
  Upload,
  Eye,
  Clock,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const presetColors = [
  '#16a34a', // Green
  '#2563eb', // Blue
  '#dc2626', // Red
  '#ea580c', // Orange
  '#7c3aed', // Purple
  '#0891b2', // Cyan
  '#be123c', // Rose
  '#059669', // Emerald
];

const backgroundImages = [
  'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg',
  'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg',
  'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg',
  'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg',
  'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg',
  'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg',
];

export default function ThemeCustomizer() {
  const {
    theme,
    actualTheme,
    accentColor,
    fontSize,
    backgroundImage,
    backgroundOpacity,
    backgroundBlur,
    setTheme,
    setAccentColor,
    setFontSize,
    setBackgroundImage,
    setBackgroundOpacity,
    setBackgroundBlur,
  } = useTheme();

  const [activeTab, setActiveTab] = useState('theme');
  const [customColor, setCustomColor] = useState(accentColor);

  const tabs = [
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'background', label: 'Background', icon: Image },
    { id: 'advanced', label: 'Advanced', icon: Sliders },
  ];

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    setAccentColor(color);
  };

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'theme' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Theme Mode
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark', icon: Moon },
                  { value: 'system', label: 'System', icon: Monitor },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value as any)}
                    className={`p-4 rounded-lg border-2 transition-colors flex flex-col items-center ${
                      theme === option.value
                        ? 'border-green-500 bg-green-50 dark:bg-green-900'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <option.icon className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Accent Color
              </h3>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    className={`w-12 h-12 rounded-lg border-2 transition-transform hover:scale-110 ${
                      accentColor === color
                        ? 'border-gray-400 dark:border-gray-300'
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Custom color
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Font Size
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'small', label: 'Small', size: 'text-sm' },
                  { value: 'medium', label: 'Medium', size: 'text-base' },
                  { value: 'large', label: 'Large', size: 'text-lg' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFontSize(option.value as any)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      fontSize === option.value
                        ? 'border-green-500 bg-green-50 dark:bg-green-900'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className={`${option.size} font-medium mb-1`}>Aa</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Preview
              </h4>
              <div className="space-y-2">
                <h5 className="text-xl font-bold">Heading Example</h5>
                <p className="text-gray-600 dark:text-gray-400">
                  This is how your text will appear with the selected font size.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'background' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Background Images
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <button
                  onClick={() => setBackgroundImage(undefined)}
                  className={`aspect-video rounded-lg border-2 transition-colors flex items-center justify-center ${
                    !backgroundImage
                      ? 'border-green-500 bg-green-50 dark:bg-green-900'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm text-gray-500">None</span>
                </button>
                {backgroundImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setBackgroundImage(image)}
                    className={`aspect-video rounded-lg border-2 transition-colors overflow-hidden ${
                      backgroundImage === image
                        ? 'border-green-500'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Background ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <label className="cursor-pointer">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Upload custom background
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {backgroundImage && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Opacity: {Math.round(backgroundOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={backgroundOpacity}
                    onChange={(e) => setBackgroundOpacity(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Blur: {backgroundBlur}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={backgroundBlur}
                    onChange={(e) => setBackgroundBlur(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Eye className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Preview</span>
              </div>
              <div
                className="h-24 rounded-lg relative overflow-hidden"
                style={{
                  backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {backgroundImage && (
                  <div
                    className="absolute inset-0 bg-white dark:bg-gray-900"
                    style={{
                      opacity: 1 - backgroundOpacity,
                      backdropFilter: `blur(${backgroundBlur}px)`,
                    }}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium">Content Area</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Background Scheduler
                </h4>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                Automatically change backgrounds at set intervals
              </p>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-blue-800 dark:text-blue-200">
                    Enable background rotation
                  </span>
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-blue-700 dark:text-blue-300">
                    Change every
                  </span>
                  <select className="border border-blue-300 dark:border-blue-600 rounded px-2 py-1 text-sm bg-white dark:bg-blue-800">
                    <option value="5">5 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Performance Settings
              </h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-yellow-800 dark:text-yellow-200">
                    Enable smooth transitions
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-yellow-800 dark:text-yellow-200">
                    Reduce motion for accessibility
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                Reset Settings
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                Reset all customization settings to default values
              </p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                Reset to Defaults
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}