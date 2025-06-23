import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Palette, Shield, Globe } from 'lucide-react';
import NotificationSettings from '../components/settings/NotificationSettings';
import ThemeCustomizer from '../components/settings/ThemeCustomizer';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('notifications');

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'theme', label: 'Theme & Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'language', label: 'Language & Region', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <SettingsIcon className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your FarmHub experience with these settings and preferences.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:w-64"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'theme' && <ThemeCustomizer />}
            {activeTab === 'security' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Security Settings
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Security settings will be implemented here.
                </p>
              </div>
            )}
            {activeTab === 'language' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Language & Region
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Language and region settings will be implemented here.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}